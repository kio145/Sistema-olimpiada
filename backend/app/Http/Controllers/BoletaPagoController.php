<?php

namespace App\Http\Controllers;

use App\Models\BoletaPago;
use Illuminate\Http\Request;

class BoletaPagoController extends Controller
{
    public function index()
    {
        return response()->json(BoletaPago::with(['cajero','competidor','tutor'])->get(), 200);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'idboleta'        => 'required|integer|unique:boleta_pago,idboleta',
            'idcajero'        => 'required|integer|exists:cajero,idcajero',
            'id_competidor'   => 'required|integer|exists:competidor,idcompetidor',
            'fecha_emision'   => 'required|date',
            'montototal'      => 'required|integer',
            'id_tutor'        => 'required|integer|exists:tutor,idtutor',
        ]);

        $boleta = BoletaPago::create($data);
        return response()->json($boleta, 201);
    }

    public function show($idboleta)
    {
        $boleta = BoletaPago::with(['cajero','competidor','tutor'])->findOrFail($idboleta);
        return response()->json($boleta, 200);
    }

    public function update(Request $request, $idboleta)
    {
        $data = $request->validate([
            'idcajero'        => 'sometimes|integer|exists:cajero,idcajero',
            'id_competidor'   => 'sometimes|integer|exists:competidor,idcompetidor',
            'fecha_emision'   => 'sometimes|date',
            'montototal'      => 'sometimes|integer',
            'id_tutor'        => 'sometimes|integer|exists:tutor,idtutor',
        ]);

        $boleta = BoletaPago::findOrFail($idboleta);
        $boleta->update($data);
        return response()->json($boleta, 200);
    }

    public function destroy($idboleta)
    {
        BoletaPago::destroy($idboleta);
        return response()->json(null, 204);
    }
}