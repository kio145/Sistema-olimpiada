<?php

namespace App\Http\Controllers;

use App\Models\BoletaPago;
use Illuminate\Http\Request;

class BoletaPagoController extends Controller
{
    public function index()
    {
        return response()->json(BoletaPago::all());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'idboleta'      => 'required|integer|unique:boleta_pago,idboleta',
            'idcajero'      => 'required|integer|exists:cajero,idcajero',
            'idcompetidor'  => 'required|integer|exists:competidor,idcompetidor',
            'fecha_emision' => 'required|date',
            'montototal'    => 'required|integer',
            'id_tutor'      => 'nullable|integer|exists:tutor,idtutor',
        ]);

        $boleta = BoletaPago::create($data);
        return response()->json($boleta, 201);
    }

    public function show($id)
    {
        return response()->json(BoletaPago::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $boleta = BoletaPago::findOrFail($id);
        $data = $request->validate([
            'montototal'    => 'sometimes|integer',
            'fecha_emision' => 'sometimes|date',
            // otros campos opcionales...
        ]);
        $boleta->update($data);
        return response()->json($boleta);
    }

    public function destroy($id)
    {
        BoletaPago::destroy($id);
        return response()->noContent();
    }
}
