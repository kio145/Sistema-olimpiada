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

    public function store(Request $request)
    {
        $data = $request->validate([
            '_inscripcion_id'     => 'required|integer|unique:inscripciones',
            'idcompetencia'       => 'required|integer|exists:competencia,idcompetencia',
            'idcompetidor'        => 'required|integer|exists:competidor,idcompetidor',
            'estado_validacion'   => 'nullable|string|max:256',
            'estado_inscripcion'  => 'nullable|string|max:256',
        ]);

        $i = Inscripcion::create($data);
        return response()->json($i, 201);
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
