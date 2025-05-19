<?php

namespace App\Http\Controllers;

use App\Models\Tutor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\JsonResponse;


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

    // GET /api/tutores/{id}
    public function show(int $id): JsonResponse
    {
        $tutor = Tutor::findOrFail($id);
        return response()->json($tutor, 200);
    }

    public function update(Request $request, int $id): JsonResponse
     {
        $data = $request->validate([
            'nombretutor'   => 'sometimes|string|max:50',
            'apellidotutor' => 'sometimes|string|max:50',
            'area'          => 'sometimes|string|max:50',
            'telefonotutor' => 'sometimes|numeric',
            'correotutor'   => 'sometimes|email|max:100',
            'citutor'       => 'sometimes|numeric',
            'imagentutor'   => 'sometimes|url',
        ]);

        $tutor = Tutor::findOrFail($id);
        $tutor->update($data);
        return response()->json($tutor, 200);
    }

    public function destroy($id)
    {
        Tutor::destroy($id);
        return response()->noContent();
    }
}
