<?php

namespace App\Http\Controllers;

use App\Models\Competidor;
use Illuminate\Http\Request;

class CompetidorController extends Controller
{
    public function index()
    {
        return response()->json(Competidor::all(), 200);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'idcompetidor'        => 'required|integer|unique:competidor,idcompetidor',
            'nombrecompetidor'    => 'required|string|max:50',
            'apellidocompetidor'  => 'required|string|max:70',
            'emailcompetidor'     => 'required|email|max:100',
            'cicompetidor'        => 'required|integer',
            'fechanacimiento'      => 'required|date',
            'telefonocompetidor'   => 'required|integer',
            'colegio'             => 'required|string|max:100',
            'curso'               => 'required|string|max:50',
            'departamento'        => 'required|string|max:50',
            'provincia'           => 'required|string|max:50',
            'imagencompetidor'    => 'nullable|string|max:100',
            'usuariocompetidor'    => 'required|string|max:50',
            'contraseniacompetidor'    => 'required|string|max:50',
        ]);

        $competidor = Competidor::create($data);
        return response()->json($competidor, 201);
    }

    public function show($idcompetidor)
    {
        $competidor = Competidor::findOrFail($idcompetidor);
        return response()->json($competidor, 200);
    }

    public function update(Request $request, $idcompetidor)
    {
        $data = $request->validate([
            'nombrecompetidor'    => 'sometimes|string|max:50',
            'apellidocompetidor'  => 'sometimes|string|max:70',
            'emailcompetidor'     => 'sometimes|email|max:100',
            'cicompetidor'        => 'sometimes|integer',
            'fechanacimiento'      => 'sometimes|date',
            'telefonocompetidor'   => 'sometimes|integer',
            'colegio'             => 'sometimes|string|max:100',
            'curso'               => 'sometimes|string|max:50',
            'departamento'        => 'sometimes|string|max:50',
            'provincia'           => 'sometimes|string|max:50',
            'imagencompetidor'    => 'nullable|string|max:100',
            'usuariocompetidor'    => 'sometimes|string|max:50',
            'contraseniacompetidor'    => 'sometimes|string|max:50',

        ]);

        $competidor = Competidor::findOrFail($idcompetidor);
        $competidor->update($data);
        return response()->json($competidor, 200);
    }

    public function destroy($idcompetidor)
    {
        Competidor::destroy($idcompetidor);
        return response()->json(null, 204);
    }
}
