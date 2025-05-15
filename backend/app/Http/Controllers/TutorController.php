<?php

namespace App\Http\Controllers;

use App\Models\Tutor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class TutorController extends Controller
{
    public function index()
    {
        return response()->json(Tutor::all(), 200);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'nombretutor'    => 'required|string|max:50',
            'apellidotutor'  => 'required|string|max:70',
            'correotutor'    => 'required|email|unique:tutor,correotutor|max:100',
            'passwordtutor'  => 'required|string|min:6|confirmed',
            
        ]);
         $data['passwordtutor'] = Hash::make($data['passwordtutor']);

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
            'passwordtutor'  => 'sometimes|string|max:70',
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