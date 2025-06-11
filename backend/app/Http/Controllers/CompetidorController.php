<?php

namespace App\Http\Controllers;

use App\Models\Competidor;
use App\Models\User;
use App\Models\ValidarTutor;
use App\Models\BoletaPago;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Arr;
use Illuminate\Validation\Rule;

class CompetidorController extends Controller
{
    /**
     * GET /api/competidores
     */
    public function index(Request $request)
    {
        $query = Competidor::query();

        // Si me pasan ?cicompetidor=1234567, lo filtro:
        if ($request->filled('cicompetidor')) {
            $query->where('cicompetidor', $request->input('cicompetidor'));
        }

        $competidores = $query->get();
        return response()->json($competidores, 200);
    }
    /**
     * POST /api/competidores
     * Crea un nuevo competidor y su usuario en la tabla users.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'nombrecompetidor'    => 'required|string|max:50',
            'apellidocompetidor'  => 'required|string|max:50',
            'emailcompetidor'     => 'required|email|unique:competidor,emailcompetidor|unique:users,email',
            'passwordcompetidor'  => 'required|string|min:6|confirmed',
        ]);

        // 1) Creamos el competidor
        $competidor = Competidor::create([
            'nombrecompetidor'   => $data['nombrecompetidor'],
            'apellidocompetidor' => $data['apellidocompetidor'],
            'emailcompetidor'    => $data['emailcompetidor'],
            'passwordcompetidor' => Hash::make($data['passwordcompetidor']),
        ]);

        // 2) Creamos el usuario asociado en la tabla `users`
        $user = User::create([
            'name'           => $competidor->nombrecompetidor . ' ' . $competidor->apellidocompetidor,
            'email'          => $competidor->emailcompetidor,
            'password'       => Hash::make($data['passwordcompetidor']),
            'role'           => 'competidor',
            'profile_id'     => $competidor->idcompetidor,
            'profile_type'   => Competidor::class,
        ]);

        return response()->json([
            'competidor' => $competidor,
            'usuario'    => $user,
        ], 201);
    }

    /**
     * GET /api/competidores/me
     * Devuelve los datos del competidor autenticado.
     */
    public function me(Request $request): JsonResponse
    {
        $user = $request->user();
        if (!$user || $user->role !== 'competidor') {
            return response()->json(['message' => 'No autorizado'], 403);
        }
        $competidor = Competidor::findOrFail($user->profile_id);
        return response()->json($competidor, 200);
    }

    /**
     * PUT /api/competidores/{id}
     * Actualiza datos de un competidor dado su ID.
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $competidor = Competidor::findOrFail($id);

        $data = $request->validate([
            'nombrecompetidor'     => 'sometimes|string|max:50',
            'apellidocompetidor'   => 'sometimes|string|max:50',
            'emailcompetidor'      => [
                'sometimes',
                'email',
                Rule::unique('competidor', 'emailcompetidor')->ignore($id, 'idcompetidor')
            ],
            'cicompetidor'         => 'sometimes|integer',
            'fechanacimiento'      => 'sometimes|date',
            'telefonocompetidor'   => 'sometimes|string|max:20',
            'colegio'              => 'sometimes|string|max:100',
            'curso'                => 'sometimes|string|max:50',
            'departamento'         => 'sometimes|string|max:50',
            'provincia'            => 'sometimes|string|max:50',
            'passwordcompetidor'   => 'sometimes|string|min:6|confirmed',
            'imagencompetidor'     => 'sometimes|image|max:2048',
        ]);

        // Si suben imagen, la almacenamos
        if ($request->hasFile('imagencompetidor')) {
            $path = $request->file('imagencompetidor')
                ->store('competidores', 'public');
            $data['imagencompetidor'] = $path;
        }

        // Actualizamos los campos del competidor (excluyendo password)
        $competidor->update(Arr::except($data, ['passwordcompetidor']));

        // Sincronizamos con la tabla users si cambió email o password
        $user = User::where('profile_type', Competidor::class)
            ->where('profile_id', $id)
            ->first();

        if ($user) {
            $u = [];
            if (isset($data['emailcompetidor'])) {
                $u['email'] = $data['emailcompetidor'];
                $u['name']  = "{$competidor->nombrecompetidor} {$competidor->apellidocompetidor}";
            }
            if (isset($data['passwordcompetidor'])) {
                $u['password'] = Hash::make($data['passwordcompetidor']);
            }
            if (!empty($u)) {
                $user->update($u);
            }
        }

        return response()->json($competidor, 200);
    }

    /**
     * GET /api/competidores/habilitados
     *
     * Devuelve solo aquellos competidores que:
     *  1) Tienen al menos una validación con estado='validado' en validar_tutor
     *  2) Ya registraron un pago en boleta_pago
     *
     * El JSON retornado contiene, para cada competidor:
     *   - id, nombre, apellidos, correo
     *   - nivel (curso) y área de la competencia validada
     *   - nombre y apellido del tutor, así como teléfono
     *   - estado = 'Inscrito'
     */
    public function habilitados(): JsonResponse
    {
        // 1. Trae todos los competidores que tengan al menos una inscripción
        $competidores = \App\Models\Competidor::all();

        $resultado = $competidores->map(function ($c) {
            // Busco la última o única validación de tutor para ese competidor
            $validacion = \App\Models\ValidarTutor::where('idcompetidor', $c->idcompetidor)
                ->orderByDesc('validar_id')
                ->first();

            // Estado validación tutor
            $estadoValidacion = $validacion ? $validacion->estado_validacion : 'pendiente';

            // Busco si tiene pago registrado
            $pago = \App\Models\BoletaPago::where('idcompetidor', $c->idcompetidor)->first();
            $estadoPago = $pago ? 'pagado' : 'en espera de pago';

            // Determino estado global (solo para referencia, el frontend arma el texto)
            $estadoFinal = '';
            if ($estadoValidacion !== 'validado') {
                $estadoFinal = $estadoValidacion === 'rechazado'
                    ? 'Validación Tutor: Rechazado'
                    : 'Validación Tutor: En espera';
            } elseif ($estadoPago !== 'pagado') {
                $estadoFinal = 'Pago: En espera';
            } else {
                $estadoFinal = 'Inscrito';
            }

            // Busco el tutor y competencia relacionados a la validación (si existe)
            $tutorNombre = $validacion && $validacion->tutor ? $validacion->tutor->nombretutor : '';
            $tutorApellido = $validacion && $validacion->tutor ? $validacion->tutor->apellidotutor : '';
            $telefono = $validacion && $validacion->tutor ? $validacion->tutor->telefonotutor : '';
            $area = $validacion && $validacion->competencia ? $validacion->competencia->areacompetencia : '';
            $nivel = $c->curso;

            return [
                'id'            => $c->idcompetidor,
                'nombre'        => $c->nombrecompetidor,
                'apellidos'     => $c->apellidocompetidor,
                'correo'        => $c->emailcompetidor,
                'nivel'         => $nivel,
                'area'          => $area,
                'tutorNombre'   => $tutorNombre,
                'tutorApellido' => $tutorApellido,
                'telefono'      => $telefono,
                // ESTADOS que necesita el frontend
                'estado_validacion_tutor' => $estadoValidacion,
                'estado_pago'             => $estadoPago,
                'estado'                  => $estadoFinal, // opcional, para mostrar de una vez
            ];
        });

        return response()->json($resultado, 200);
    }


    public function habilitadosParaCajero(): JsonResponse
    {
        // 1) IDs de competidores con estado_validacion = 'validado'
        $idsValidos = ValidarTutor::where('estado_validacion', 'validado')
            ->pluck('idcompetidor')
            ->unique()
            ->toArray();

        // 2) IDs de competidores que YA hicieron pago
        $idsPagaron = BoletaPago::pluck('idcompetidor')
            ->unique()
            ->toArray();

        // 3) COMPETIDORES válidos que TODAVÍA NO pagaron (NO están en boleta_pago)
        $idsHabilitados = array_diff($idsValidos, $idsPagaron);

        if (empty($idsHabilitados)) {
            return response()->json([], 200);
        }

        // 4) Traer cada Competidor con su validación “validado”, para extraer el área y el costo
        $competidores = Competidor::whereIn('idcompetidor', $idsHabilitados)
            ->with(['validaciones' => function ($q) {
                $q->where('estado_validacion', 'validado')
                    ->with(['competencia']);
            }])
            ->get();

        $resultado = $competidores->map(function ($c) {
            $val = $c->validaciones->first();
            $competencia = $val->competencia;

            return [
                'nombre'            => $c->nombrecompetidor . ' ' . $c->apellidocompetidor,
                'area'              => $competencia->areacompetencia,
                'cicompetidor'      => $c->cicompetidor,
                'costo_inscripcion' => $competencia->preciocompetencia,
            ];
        });

        return response()->json($resultado, 200);
    }


    /**
     * GET /api/competidores/{id}
     */
    public function show(int $id): JsonResponse
    {
        $competidor = Competidor::findOrFail($id);
        return response()->json($competidor, 200);
    }

    /**
     * DELETE /api/competidores/{id}
     */
    public function destroy(int $id): JsonResponse
    {
        Competidor::destroy($id);
        return response()->json(null, 204);
    }

    public function showByCi(string $ci): JsonResponse
    {
        // Busca el primer competidor cuyo cicompetidor coincida exactamente:
        $competidor = Competidor::where('cicompetidor', $ci)->first();

        if (! $competidor) {
            return response()->json([
                'message' => 'No se encontró competidor con CI ' . $ci
            ], 404);
        }

        return response()->json($competidor, 200);
    }

    public function findByCi(string $ci): JsonResponse
    {
        $competidor = Competidor::where('cicompetidor', $ci)->firstOrFail();
        return response()->json($competidor, 200);
    }
}
