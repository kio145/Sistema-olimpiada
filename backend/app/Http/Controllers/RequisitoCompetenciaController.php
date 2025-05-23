<?php

namespace App\Http\Controllers;

use App\Models\RequisitoCompetencia;
use Illuminate\Http\Request;

class RequisitoCompetenciaController extends Controller
{
    public function index()
    {
        return response()->json(RequisitoCompetencia::all());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'requisito_id'   => 'required|string|unique:requisitos_competencia',
            'idcompetencia' => 'nullable|integer|exists:competencia,idcompetencia',
            'curso'         => 'nullable|string|max:50',
        ]);

        $r = RequisitoCompetencia::create($data);
        return response()->json($r, 201);
    }

    public function show($id)
    {
        return response()->json(RequisitoCompetencia::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $r = RequisitoCompetencia::findOrFail($id);
        $data = $request->validate([
            'curso' => 'sometimes|string|max:50',
        ]);

        $r->update($data);
        return response()->json($r);
    }

    public function destroy($id)
    {
        RequisitoCompetencia::destroy($id);
        return response()->noContent();
    }
}
