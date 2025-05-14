<?php

namespace App\Http\Controllers;

use App\Models\Competidor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;


class CompetidorController extends Controller
{
    public function index()
    {
        return response()->json(Competidor::all(), 200);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'usuariocompetidor'    => 'required|string|max:50',
            'nombrecompetidor'    => 'required|string|max:50',
            'apellidocompetidor'  => 'required|string|max:70',
            'emailcompetidor'     => 'required|email|max:100',
            'cicompetidor'        => 'required|integer',
            'fechanacimiento'      => 'required|date',
            'colegio'             => 'required|string|max:100',
            'curso'               => 'required|string|max:50',
            'departamento'        => 'required|string|max:50',
            'provincia'           => 'required|string|max:50',
            'imagencompetidor'    => 'nullable|string|max:100',
            'passwordcompetidor'    => 'required|string|max:50',
            
        ]);

         $data['passwordcompetidor'] = Hash::make($data['passwordcompetidor']);

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
            'usuariocompetidor'    => 'sometimes|string|max:50',
            'nombrecompetidor'    => 'sometimes|string|max:50',
            'apellidocompetidor'  => 'sometimes|string|max:70',
            'emailcompetidor'     => 'sometimes|email|max:100',
            'cicompetidor'        => 'sometimes|integer',
            'fechanacimiento'      => 'sometimes|date',
            'colegio'             => 'sometimes|string|max:100',
            'curso'               => 'sometimes|string|max:50',
            'departamento'        => 'sometimes|string|max:50',
            'provincia'           => 'sometimes|string|max:50',
            'imagencompetidor'    => 'nullable|string|max:100',
            'passwordcompetidor'    => 'sometimes|string|max:50',
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
