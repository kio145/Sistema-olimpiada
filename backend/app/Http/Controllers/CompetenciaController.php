<?php

namespace App\Http\Controllers;

use App\Models\Competencia;
use Illuminate\Http\Request;

class CompetenciaController extends Controller
{
    public function index()
    {
        return response()->json(Competencia::with('administrador','competidores')->get(), 200);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'idadmi'                => 'required|integer|exists:administrador,idadmi',
            'areacompetencia'     => 'required|string|max:100',
            'nivelcompetencia'      => 'required|string|max:50',
            'preciocompetencia'     => 'required|integer',
            'estadocompetencia'     => 'required|string|max:100',
            'fechainicompetencia'=> 'required|date',
            'fechafincompetencia'   => 'required|date',
            'fechainiinscripcion'   => 'required|date',
            'fechafininscripcion'   => 'required|date',
            'fechainipago'          => 'required|date',
            'fechafinpago'   => 'required|date',
            'descripcion'           => 'nullable|string|max:250',
            'imagencompetencia'     => 'nullable',
            'fechainivalidacion'    => 'required|date',
            'fechafinvalidacion'    => 'required|date',
        ]);

        $competencia = Competencia::create($data);
        return response()->json($competencia, 201);
    }

    public function show($idcompetencia)
    {
        $competencia = Competencia::with('administrador','competidores')->findOrFail($idcompetencia);
        return response()->json($competencia, 200);
    }

    public function update(Request $request, $idcompetencia)
    {
        $data = $request->validate([
            'idadmi'                => 'sometimes|integer|exists:administrador,idadmi',
            'areacompetencia'     => 'sometimes|string|max:100',
            'nivelcompetencia'      => 'sometimes|string|max:50',
            'preciocompetencia'     => 'sometimes|integer',
            'estadocompetencia'     => 'sometimes|string|max:100',
            'fechainicompetencia'=> 'sometimes|date',
            'fechafincompetencia'   => 'sometimes|date',
            'fechainiinscripcion'   => 'sometimes|date',
            'fechafininscripcion'   => 'sometimes|date',
            'fechainipago'          => 'sometimes|date',
            'fechafinpago'   => 'sometimes|date',
            'descripcion'           => 'nullable|string|max:250',
            'imagencompetencia'     => 'nullable',
            'fechainivalidacion'    => 'sometimes|date',
            'fechafinvalidacion'    => 'sometimes|date',
        ]);

        $competencia = Competencia::findOrFail($idcompetencia);
        $competencia->update($data);
        return response()->json($competencia, 200);
    }

    public function destroy($idcompetencia)
    {
        Competencia::destroy($idcompetencia);
        return response()->json(null, 204);
    }
}