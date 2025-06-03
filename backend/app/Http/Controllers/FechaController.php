<?php

namespace App\Http\Controllers;

use App\Models\Fecha;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class FechaController extends Controller
{
    /**
     * Chequea que cada fase tenga inicio < fin
     * y que las fases vayan en el orden:
     * Inscripción → Validación → Pago → Competencia
     */
    protected function validateFases(array $data)
    {
        // 1) Cada inicio sea anterior al fin
        if ($data['fecha_inicio_inscripcion'] >= $data['fecha_fin_inscripcion']) {
            throw ValidationException::withMessages([
                'fecha_fin_inscripcion' => ['La fecha de fin de inscripción debe ser posterior al inicio.']
            ]);
        }
        if ($data['fecha_inicio_validacion'] >= $data['fecha_fin_validacion']) {
            throw ValidationException::withMessages([
                'fecha_fin_validacion' => ['La fecha de fin de validación debe ser posterior al inicio.']
            ]);
        }
        if ($data['fecha_inicio_pago'] >= $data['fecha_fin_pago']) {
            throw ValidationException::withMessages([
                'fecha_fin_pago' => ['La fecha de fin de pago debe ser posterior al inicio.']
            ]);
        }
        if ($data['fecha_inicio_competencia'] >= $data['fecha_fin_competencia']) {
            throw ValidationException::withMessages([
                'fecha_fin_competencia' => ['La fecha de fin de competencia debe ser posterior al inicio.']
            ]);
        }

        // 2) Comprobar orden lógico entre fases
        // Inscripción termina antes de Validación → Validación antes de Pago → Pago antes de Competencia
        if (! (
            $data['fecha_fin_inscripcion'] < $data['fecha_inicio_validacion']
            && $data['fecha_fin_validacion']  < $data['fecha_inicio_pago']
            && $data['fecha_fin_pago']        < $data['fecha_inicio_competencia']
        )) {
            throw ValidationException::withMessages([
                'fases' => ['Las fases deben sucederse en este orden: Inscripción → Validación → Pago → Competencia.']
            ]);
        }
    }

    /**
     * POST /api/fechas
     */
    public function store(Request $request): JsonResponse
    {
        // 1) Validamos entrada
        $data = $request->validate([
            'fecha_inicio_inscripcion' => 'required|date',
            'fecha_fin_inscripcion'    => 'required|date',
            'fecha_inicio_validacion'  => 'required|date',
            'fecha_fin_validacion'     => 'required|date',
            'fecha_inicio_pago'        => 'required|date',
            'fecha_fin_pago'           => 'required|date',
            'fecha_inicio_competencia' => 'required|date',
            'fecha_fin_competencia'    => 'required|date',
        ]);

        $this->validateFases($data);
        $f = Fecha::create($data);
        return response()->json($f, 201);
    }

    /**
     * PUT /api/fechas/{id}
     */
    public function update(Request $request, $id): JsonResponse
    {
        $f = Fecha::findOrFail($id);
        // 1) Validamos los campos que vengan
        $data = $request->validate([
            'fecha_inicio_inscripcion' => 'sometimes|date',
            'fecha_fin_inscripcion'    => 'sometimes|date',
            'fecha_inicio_validacion'  => 'sometimes|date',
            'fecha_fin_validacion'     => 'sometimes|date',
            'fecha_inicio_pago'        => 'sometimes|date',
            'fecha_fin_pago'           => 'sometimes|date',
            'fecha_inicio_competencia' => 'sometimes|date',
            'fecha_fin_competencia'    => 'sometimes|date',
        ]);

        $merged = array_merge($f->toArray(), $data);
        $this->validateFases($merged);

        $f->update($data);
        return response()->json($f, 200);
    }

    /**
     * GET /api/fechas
     */
    public function index(): JsonResponse
    {
        return response()->json(Fecha::all(), 200);
    }

    /**
     * GET /api/fechas/{id}
     */
    public function show(): JsonResponse
    {
        // Si no existe, devolvemos 404 o creamos uno por defecto
        $f = Fecha::firstOrFail();
        return response()->json($f, 200);
    }

    /**
     * DELETE /api/fechas/{id}
     */
    public function destroy($id): JsonResponse
    {
        Fecha::destroy($id);
        return response()->json(null, 204);
    }
}
