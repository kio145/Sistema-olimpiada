<?php

namespace App\Http\Controllers;

use App\Models\Reporte;
use Illuminate\Http\Request;

class ReporteController extends Controller
{
    public function index()
    {
        return response()->json(Reporte::with('administrador')->get(), 200);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'idreporte'    => 'required|integer|unique:reporte,idreporte',
            'idadmi'       => 'required|integer|exists:administrador,idadmi',
            'tiporeporte'  => 'required|string|max:50',
            'fechareporte' => 'required|date',
            'detalles'     => 'nullable|string|max:250',
        ]);

        $reporte = Reporte::create($data);
        return response()->json($reporte, 201);
    }

    public function show($idreporte)
    {
        $reporte = Reporte::with('administrador')->findOrFail($idreporte);
        return response()->json($reporte, 200);
    }

    public function update(Request $request, $idreporte)
    {
        $data = $request->validate([
            'idadmi'       => 'sometimes|integer|exists:administrador,idadmi',
            'tiporeporte'  => 'sometimes|string|max:50',
            'fechareporte' => 'sometimes|date',
            'detalles'     => 'nullable|string|max:250',
        ]);

        $reporte = Reporte::findOrFail($idreporte);
        $reporte->update($data);
        return response()->json($reporte, 200);
    }

    public function destroy($idreporte)
    {
        Reporte::destroy($idreporte);
        return response()->json(null, 204);
    }
}