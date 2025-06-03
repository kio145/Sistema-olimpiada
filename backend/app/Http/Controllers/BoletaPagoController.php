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
            'inscripciones.*' => 'integer|exists:inscripciones,_inscripcion_id',
        ]);

        // 1. Crear la boleta primero
        $boleta = BoletaPago::create([
            'idcajero'      => $data['idcajero'],
            'idcompetidor'  => $data['idcompetidor'],
            'fecha_emision' => $data['fecha_emision'],
            'montototal'    => $data['montototal'],
        ]);

        // 2. Asociar inscripciones a la boleta
        $boleta->inscripciones()->attach($data['inscripciones']);

        // 3. Actualizar estado de inscripciones
        \App\Models\Inscripcion::whereIn('_inscripcion_id', $data['inscripciones'])
            ->update(['estado_inscripcion' => 'inscrito']);

        // 4. Devolver la boleta con relaciones cargadas
        return response()->json($boleta->load('inscripciones'), 201);

    }

    public function show(int $id): JsonResponse
    {
        $boleta = BoletaPago::findOrFail($id);
        return response()->json($boleta, 200);
    }
   public function habilitados(): JsonResponse
{
    $inscripciones = \App\Models\Inscripcion::with(['competidor', 'competencia'])
        ->where('estado_inscripcion', 'en espera de pago')
        ->whereHas('validaciones', function ($q) {
            $q->where('estado_validacion', 'aceptado')
              ->whereColumn('idcompetencia', 'inscripciones.idcompetencia'); // Asegura que la validación es para esta competencia
        })
        ->get();

    return response()->json($inscripciones, 200);
}

    public function update(Request $request, int $id): JsonResponse
    {
        $boleta = BoletaPago::findOrFail($id);
        $data = $request->validate([
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
