<?php

namespace App\Http\Controllers;

use App\Models\Tutor;
use Illuminate\Http\Request;

class TutorController extends Controller
{
    public function index()
    {
        return response()->json(Tutor::all());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'idtutor'       => 'required|integer|unique:tutor',
            'nombretutor'   => 'required|string|max:50',
            'apellidotutor' => 'required|string|max:50',
            'area'          => 'required|string|max:50',
            'telefontutor'  => 'required|integer',
            'correotutor'   => 'required|email|max:100',
            'citutor'       => 'required|integer',
            'imagentutor'   => 'nullable|string|max:100',
        ]);

        $tutor = Tutor::create($data);
        return response()->json($tutor, 201);
    }

    public function show($id)
    {
        return response()->json(Tutor::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $tutor = Tutor::findOrFail($id);
        $data = $request->validate([
            'nombretutor'   => 'sometimes|string|max:50',
            'apellidotutor' => 'sometimes|string|max:50',
            'area'          => 'sometimes|string|max:50',
            'telefontutor'  => 'sometimes|integer',
            'correotutor'   => 'sometimes|email|max:100',
            'citutor'       => 'sometimes|integer',
            'imagentutor'   => 'nullable|string|max:100',
        ]);

        $tutor->update($data);
        return response()->json($tutor);
    }

    public function destroy($id)
    {
        Tutor::destroy($id);
        return response()->noContent();
    }
}
