<?php

namespace App\Http\Controllers;

use App\Models\Tutor;
use Illuminate\Http\Request;

class TutorController extends Controller
{
    public function index()
    {
        return response()->json(Tutor::all(), 200);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'idtutor'        => 'required|integer|unique:tutor,idtutor',
            'nombretutor'    => 'required|string|max:50',
            'apellidotutor'  => 'required|string|max:70',
            'tipotutor'      => 'required|string|max:50',
            'telefonotutor'  => 'required|integer',
            'correotutor'    => 'required|email|max:100',
            'citutor'        => 'required|integer',
            'imagentutor'    => 'nullable',
            'usuariotutor'    => 'required|string|max:50',
            'contraseniatutor'    => 'required|string|max:50',
        ]);

        $tutor = Tutor::create($data);
        return response()->json($tutor, 201);
    }

    public function show($idtutor)
    {
        $tutor = Tutor::findOrFail($idtutor);
        return response()->json($tutor, 200);
    }

    public function update(Request $request, $idtutor)
    {
        $data = $request->validate([
            'nombretutor'    => 'sometimes|string|max:50',
            'apellidotutor'  => 'sometimes|string|max:70',
            'tipotutor'      => 'sometimes|string|max:50',
            'telefonotutor'  => 'sometimes|integer',
            'correotutor'    => 'sometimes|email|max:100',
            'citutor'        => 'sometimes|integer',
            'imagentutor'    => 'nullable',
            'usuariotutor'    => 'sometimes|string|max:50',
            'contraseniatutor'    => 'sometimes|string|max:50',
        ]);

        $tutor = Tutor::findOrFail($idtutor);
        $tutor->update($data);
        return response()->json($tutor, 200);
    }

    public function destroy($idtutor)
    {
        Tutor::destroy($idtutor);
        return response()->json(null, 204);
    }
}