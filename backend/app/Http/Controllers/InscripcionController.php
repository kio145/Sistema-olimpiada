<?php

namespace App\Http\Controllers;

use App\Models\Inscripcion;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class InscripcionController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Inscripcion::with('competencia');

        if ($request->filled('idcompetidor')) {
            $query->where('idcompetidor', $request->input('idcompetidor'));
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


    public function show($id)
    {
        return response()->json(Inscripcion::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $i = Inscripcion::findOrFail($id);
        $data = $request->validate([
            'estado_validacion'   => 'sometimes|string|max:256',
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
