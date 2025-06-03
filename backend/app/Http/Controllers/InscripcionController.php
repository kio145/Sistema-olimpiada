<?php

namespace App\Http\Controllers;

use App\Models\Inscripcion;
use App\Models\Competidor;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

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

         // Evitar duplicación
        $existing = Inscripcion::where('idcompetencia', $data['idcompetencia'])
            ->where('idcompetidor', $data['idcompetidor'])
            ->first();

        if ($existing) {
            return response()->json(['message' => 'Ya estás inscrito en esta competencia'], 409);
        }
    
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
            'fechanacimiento'     => 'required|date',
            'colegio'            => 'nullable|string|max:100',
            'curso'              => 'required|string|max:50',
            'departamento'       => 'required|string|max:50',
            'provincia'          => 'required|string|max:50',
            'idcompetencia'      => 'required|integer|exists:competencia,idcompetencia',
        ]);

        // 1) Buscamos por email; si no existe, creamos uno nuevo
        $competidor = Competidor::firstOrNew([
            'emailcompetidor' => $data['emailcompetidor']
        ]);

        // 2) Rellenamos/actualizamos los demás campos
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

        // 3) Creamos la inscripción
        $insc = Inscripcion::create([
            'idcompetidor'       => $competidor->idcompetidor,
            'idcompetencia'      => $data['idcompetencia'],
            'estado_inscripcion' => 'pendiente',
        ]);

        // 4) Crear el registro de validación en la tabla pivot
        ValidarTutor::create([
            'idcompetencia'     => $data['idcompetencia'],
            'idcompetidor'      => $competidor->idcompetidor,
            'idtutor'           => $data['idtutor'],
            'tipo_tutor'        => 'tutor',
            'estado_validacion' => 'pendiente',
        ]);

        // 5) Devolvemos ambos recursos
        return response()->json([
            'competidor'   => $competidor,
            'inscripcion'  => $insc,
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

    public function competidor() {
    return $this->belongsTo(\App\Models\Competidor::class, 'idcompetidor');
    }
    public function competencia() {
        return $this->belongsTo(\App\Models\Competencia::class, 'idcompetencia');
    }

    public function destroy($id)
    {
        Inscripcion::destroy($id);
        return response()->noContent();
    }
}
