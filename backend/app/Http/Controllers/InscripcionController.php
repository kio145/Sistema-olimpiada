<?php

namespace App\Http\Controllers;

use App\Models\Inscripcion;
use App\Models\Competidor;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\ValidarTutor;

class InscripcionController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Inscripcion::with('competencia');

        // Si mandan idcompetidor, lo filtramos
        if ($request->filled('idcompetidor')) {
            $query->where('idcompetidor', $request->input('idcompetidor'));
        }
        // Si mandan idcompetencia, lo filtramos también
        if ($request->filled('idcompetencia')) {
            $query->where('idcompetencia', $request->input('idcompetencia'));
        }

        $inscripciones = $query->get();
        return response()->json($inscripciones, 200);
    }

    // app/Http/Controllers/InscripcionController.php

    public function store(Request $request): JsonResponse
    {
        $user = $request->user();
        if (!$user || $user->role !== 'competidor') {
            return response()->json(['message' => 'No autorizado'], 403);
        }

        // 1) Sólo validamos idcompetencia
        $data = $request->validate([
            'idcompetencia' => 'required|integer|exists:competencia,idcompetencia',
            // 'idtutor' ya no lo pedimos
        ]);

        // 2) Rellenamos el resto
        $data['idcompetidor']      = $user->profile_id;
        $data['estado_inscripcion'] = 'pendiente';

        // 3) Creamos la inscripción
        $insc = Inscripcion::create($data);

        return response()->json($insc, 201);
    }

    /**
     * Crea primero un Competidor y luego su Inscripción
     * POST /api/inscripciones/competidor
     */
    public function storeCompetidor(Request $request): JsonResponse
    {
        $data = $request->validate([
            'nombrecompetidor'   => 'required|string|max:50',
            'apellidocompetidor' => 'required|string|max:50',
            'emailcompetidor'    => 'required|email',
            'cedulacompetidor'   => 'required|integer',
            'fechanacimiento'    => 'required|date',
            'colegio'            => 'nullable|string|max:100',
            'curso'              => 'required|string|max:50',
            'departamento'       => 'required|string|max:50',
            'provincia'          => 'required|string|max:50',
            'idcompetencia'      => 'required|integer|exists:competencia,idcompetencia',
            'idtutor'            => 'required|integer|exists:tutor,idtutor',
        ]);

        // 1. Busca al competidor por email
        $competidor = Competidor::firstOrNew([
            'emailcompetidor' => $data['emailcompetidor']
        ]);
        $competidor->fill([
            'nombrecompetidor'   => $data['nombrecompetidor'],
            'apellidocompetidor' => $data['apellidocompetidor'],
            'cicompetidor'       => $data['cedulacompetidor'],
            'fechanacimiento'    => $data['fechanacimiento'],
            'colegio'            => $data['colegio'] ?? null,
            'curso'              => $data['curso'],
            'departamento'       => $data['departamento'],
            'provincia'          => $data['provincia'],
        ]);
        $competidor->save();

        // 2. Verifica inscripciones distintas áreas
        // Toma todas las inscripciones del competidor (diferentes idcompetencia)
        $inscripciones = \App\Models\Inscripcion::where('idcompetidor', $competidor->idcompetidor)->get();

        // Contar cuántas inscripciones en áreas distintas tiene
        // (asume que el área es por competencia)
        $areaCompetencia = \App\Models\Competencia::findOrFail($data['idcompetencia'])->areacompetencia;
        $areasYaInscritas = $inscripciones
            ->map(function ($i) {
                return $i->competencia->areacompetencia;
            })->unique();

        // Si ya tiene 2 áreas y quiere inscribirse a una nueva
        if ($areasYaInscritas->count() >= 2 && !$areasYaInscritas->contains($areaCompetencia)) {
            return response()->json([
                'message' => 'Solo puedes inscribirte en un máximo de 2 áreas diferentes.',
            ], 422);
        }

        // Si ya está inscrito a esta área, tampoco permitas inscribirse 2 veces en la misma
        if ($areasYaInscritas->contains($areaCompetencia)) {
            return response()->json([
                'message' => 'Ya estás inscrito en esta área.',
            ], 422);
        }

        // 3. Crear la inscripción y la validación (como ya tienes)
        $insc = \App\Models\Inscripcion::create([
            'idcompetidor'       => $competidor->idcompetidor,
            'idcompetencia'      => $data['idcompetencia'],
            'estado_inscripcion' => 'pendiente',
        ]);
        \App\Models\ValidarTutor::create([
            'idcompetencia'     => $data['idcompetencia'],
            'idcompetidor'      => $competidor->idcompetidor,
            'idtutor'           => $data['idtutor'],
            'tipo_tutor'        => 'tutor',
            'estado_validacion' => 'pendiente',
        ]);

        return response()->json([
            'competidor'  => $competidor,
            'inscripcion' => $insc,
        ], 201);
    }


    public function show($id)
    {
        return response()->json(Inscripcion::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $i = Inscripcion::findOrFail($id);
        $data = $request->validate([
            'estado_inscripcion'  => 'sometimes|string|max:256',
        ]);

        $i->update($data);
        return response()->json($i);
    }

    public function destroy($id)
    {
        Inscripcion::destroy($id);
        return response()->noContent();
    }
}
