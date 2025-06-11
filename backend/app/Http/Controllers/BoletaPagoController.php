<?php

namespace App\Http\Controllers;

use App\Models\BoletaPago;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class BoletaPagoController extends Controller
{
   public function index(): JsonResponse
{
    // Carga la relación con competidor y tutor
    $pagos = BoletaPago::with(['competidor', 'tutor'])->get();
 if ($pagos->count()) {
        \Log::info('Primer pago:', ['pago' => $pagos[0], 'competidor' => $pagos[0]->competidor]);
    }
    // Transforma para devolver los datos en formato amigable
    $resultado = $pagos->map(function ($pago) {
        return [
            'idboleta'    => $pago->idboleta,
            'nombre'      => $pago->competidor->nombrecompetidor ?? '',
            'apellidos'   => $pago->competidor->apellidocompetidor ?? '',
            'ci'          => $pago->competidor->cicompetidor ?? '',
            'fechaPago'   => $pago->fecha_emision,
            'montoTotal'  => $pago->montototal,
        ];
    });
 \Log::info('Pagos enviados al frontend:', ['resultado' => $resultado]);
    return response()->json($resultado, 200);
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
