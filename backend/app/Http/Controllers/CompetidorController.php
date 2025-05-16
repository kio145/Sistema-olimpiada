<?php

namespace App\Http\Controllers;

use App\Models\Competidor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class CompetidorController extends Controller
{
    public function index()
    {
        return response()->json(Competidor::all());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'idcompetidor'        => 'required|integer|unique:competidor',
            'nombrecompetidor'    => 'required|string|max:50',
            'apellidocompetidor'  => 'required|string|max:70',
            'emailcompetidor'     => 'required|email|max:100|unique:competidor,emailcompetidor',
            'cicompetidor'        => 'required|integer',
            'fechanacimiento'      => 'required|date',
            'telefonocompetidor'   => 'required|integer',
            'colegio'             => 'required|string|max:100',
            'curso'               => 'required|string|max:50',
            'departamento'        => 'required|string|max:50',
            'provincia'           => 'required|string|max:50',
            'passwordcompetidor'  => 'required|string|min:6',
            'imagencompetidor'    => 'nullable|string|max:100',
        ]);

        $data['passwordcompetidor'] = Hash::make($data['passwordcompetidor']);
        $competidor = Competidor::create($data);

        return response()->json($competidor, 201);
    }

    public function show($id)
    {
        return response()->json(Competidor::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $competidor = Competidor::findOrFail($id);

        $data = $request->validate([
            'nombrecompetidor'    => 'sometimes|string|max:50',
            'apellidocompetidor'  => 'sometimes|string|max:70',
            'emailcompetidor'     => 'sometimes|email|max:100|unique:competidor,emailcompetidor,' . $id . ',idcompetidor',
            'cicompetidor'        => 'sometimes|integer',
            'fechanacimiento'      => 'sometimes|date',
            'telefonocompetidor'   => 'sometimes|integer',
            'colegio'             => 'sometimes|string|max:100',
            'curso'               => 'sometimes|string|max:50',
            'departamento'        => 'sometimes|string|max:50',
            'provincia'           => 'sometimes|string|max:50',
            'imagencompetidor'    => 'nullable|string|max:100',
        ]);

        $competidor->update($data);
        return response()->json($competidor);
    }

    public function destroy($id)
    {
        Competidor::destroy($id);
        return response()->noContent();
    }
}
