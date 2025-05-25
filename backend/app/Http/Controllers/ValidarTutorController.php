<?php

namespace App\Http\Controllers;

use App\Models\ValidarTutor;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ValidarTutorController extends Controller
{
    public function index(): JsonResponse
    {
        $validaciones = ValidarTutor::all();
        return response()->json($validaciones);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'idcompetencia'    => 'required|integer|exists:competencia,idcompetencia',
            'idcompetidor'     => 'required|integer|exists:competidor,idcompetidor',
            'idtutor'          => 'required|integer|exists:tutor,idtutor',
            'tipo_tutor'       => 'required|string|max:256',
        ]);

        $validarTutor = ValidarTutor::create($data);

        return response()->json($validarTutor, 201);
    }

    public function update(Request $request, int $validar_id): JsonResponse
    {
        $data = $request->validate([
            'idcompetencia'    => 'sometimes|integer|exists:competencia,idcompetencia',
            'idcompetidor'     => 'sometimes|integer|exists:competidor,idcompetidor',
            'idtutor'          => 'sometimes|integer|exists:tutor,idtutor',
            'tipo_tutor'       => 'sometimes|string|max:256',
            'estado_validacion'=> 'sometimes|string|max:256',
            'motivo_rechazo'   => 'nullable|string|max:256',
        ]);

        $validarTutor = ValidarTutor::findOrFail($validar_id);
        $validarTutor->update($data);

        return response()->json($validarTutor);
    }

    // Nota: Usar el primary key 'validar_id' para show y destroy es más correcto
    public function show(int $validar_id): JsonResponse
    {
        $validarTutor = ValidarTutor::findOrFail($validar_id);
        return response()->json($validarTutor);
    }

    public function destroy(int $validar_id): JsonResponse
    {
        $validarTutor = ValidarTutor::findOrFail($validar_id);
        $validarTutor->delete();

        return response()->noContent();
    }
}
