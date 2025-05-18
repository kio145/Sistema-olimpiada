<?php

namespace App\Http\Controllers;

use App\Models\Fecha;
use Illuminate\Http\Request;

class FechaController extends Controller
{
    public function index()
    {
        return response()->json(Fecha::all());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'idfecha'                    => 'required|integer|unique:fechas',
            'fecha_inicio_competencia'   => 'required|date',
            'fecha_fin_competencia'      => 'required|date',
            'fecha_inicio_inscripcion'   => 'required|date',
            'fecha_fin_inscripcion'      => 'required|date',
            'fecha_inicio_validacion'    => 'required|date',
            'fecha_fin_validacion'       => 'required|date',
            'fecha_inicio_pago'          => 'required|date',
            'fecha_fin_pago'             => 'required|date',
        ]);

        $f = Fecha::create($data);
        return response()->json($f, 201);
    }

    public function show($id)
    {
        return response()->json(Fecha::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $f = Fecha::findOrFail($id);
        $data = $request->validate([
            'fecha_inicio_competencia'   => 'sometimes|date',
            'fecha_fin_competencia'      => 'sometimes|date',
            'fecha_inicio_inscripcion'   => 'sometimes|date',
            'fecha_fin_inscripcion'      => 'sometimes|date',
            'fecha_inicio_validacion'    => 'sometimes|date',
            'fecha_fin_validacion'       => 'sometimes|date',
            'fecha_inicio_pago'          => 'sometimes|date',
            'fecha_fin_pago'             => 'sometimes|date',
        ]);

        $f->update($data);
        return response()->json($f);
    }

    public function destroy($id)
    {
        Fecha::destroy($id);
        return response()->noContent();
    }
}

