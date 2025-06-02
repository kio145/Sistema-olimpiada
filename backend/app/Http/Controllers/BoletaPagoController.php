<?php

namespace App\Http\Controllers;

use App\Models\BoletaPago;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class BoletaPagoController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(BoletaPago::all(), 200);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'idcajero'        => 'required|integer|exists:cajero,idcajero',
            'idcompetidor'    => 'required|integer|exists:competidor,idcompetidor',
            'fecha_emision'   => 'required|date',
            'montototal'      => 'required|numeric',
            'idtutor'         => 'nullable|integer|exists:tutor,idtutor',
        ]);

        $boleta = BoletaPago::create($data);
        return response()->json($boleta, 201);
    }

    public function show(int $id): JsonResponse
    {
        $boleta = BoletaPago::findOrFail($id);
        return response()->json($boleta, 200);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $boleta = BoletaPago::findOrFail($id);
        $data = $request->validate([
            'idcajero'      => 'sometimes|integer|exists:cajero,idcajero',
            'idcompetidor'  => 'sometimes|integer|exists:competidor,idcompetidor',
            'fecha_emision' => 'sometimes|date',
            'montototal'    => 'sometimes|numeric',
            'idtutor'       => 'nullable|integer|exists:tutor,idtutor',
        ]);

        $boleta->update($data);
        return response()->json($boleta, 200);
    }

    public function destroy(int $id): JsonResponse
    {
        BoletaPago::destroy($id);
        return response()->json(null, 204);
    }
}
