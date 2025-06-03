<?php


namespace App\Http\Controllers;

use App\Models\Competidor;
use App\Models\User;
use App\Models\ValidarTutor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Arr;              
use Illuminate\Validation\Rule; 


class CompetidorController extends Controller
{
    public function index()
    {
        return response()->json(Competidor::all());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'nombrecompetidor'    => 'required|string|max:50',
            'apellidocompetidor'  => 'required|string|max:50',
            'emailcompetidor'     => 'required|email|unique:competidor,emailcompetidor|unique:users,email',
            'passwordcompetidor'  => 'required|string|min:6|confirmed',
        ]);

        $competidor = Competidor::create([
            'nombrecompetidor'   => $data['nombrecompetidor'],
            'apellidocompetidor' => $data['apellidocompetidor'],
            'emailcompetidor'    => $data['emailcompetidor'],
            'passwordcompetidor' => Hash::make($data['passwordcompetidor']),
        ]);

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
    public function show(int $id): JsonResponse
    {
        $competidor = Competidor::findOrFail((int) $id);
        return response()->json($competidor, 200);
    }

    public function me(Request $request): JsonResponse
    {
        $user = $request->user();
        if (!$user || $user->role !== 'competidor') {
            return response()->json(['message' => 'No autorizado'], 403);
        }
        $competidor = Competidor::findOrFail($user->profile_id);
        return response()->json($competidor, 200);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $competidor = Competidor::findOrFail($id);

        $data = $request->validate([
            'nombrecompetidor'     => 'sometimes|string|max:50',
            'apellidocompetidor'   => 'sometimes|string|max:50',
            'emailcompetidor'      => [
                'sometimes','email',
                Rule::unique('competidor','emailcompetidor')->ignore($id,'idcompetidor')
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

        if ($request->hasFile('imagencompetidor')) {
            $path = $request->file('imagencompetidor')->store('competidores','public');
            $data['imagencompetidor'] = $path;
        }

        $competidor->update(Arr::except($data, ['passwordcompetidor']));

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
            if ($u) {
                $user->update($u);
            }
        }

        return response()->json($competidor, 200);
    }

    public function habilitados(): JsonResponse
    {
        // 1) Obtengo todos los registros en validar_tutor donde estado_validacion = 'aceptada'
        $registros = ValidarTutor::where('estado_validacion', 'validado')
            ->with(['competidor', 'competencia'])
            ->get();

        // 2) Mapeo para devolver solo los campos necesarios
        $resultado = $registros->map(function($v) {
            return [
                'nombrecompetidor'   => $v->competidor->nombrecompetidor,
                'apellidocompetidor' => $v->competidor->apellidocompetidor,
                'cicompetidor'       => $v->competidor->cicompetidor,
                'area'               => $v->competencia->areacompetencia,
                'nivel'              => $v->competencia->nivelcompetencia,
                'costo_inscripcion'  => $v->competencia->preciocompetencia,
                'validar_id'         => $v->validar_id,
            ];
        });

        return response()->json($resultado, 200);
    }


    public function destroy(int $id): JsonResponse
    {
        Competidor::destroy($id);
        return response()->json(null, 204);
    }
}
