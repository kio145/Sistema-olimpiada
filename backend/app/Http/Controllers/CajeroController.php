<?php

namespace App\Http\Controllers;

use App\Models\Cajero;
use Illuminate\Http\Request;

class CajeroController extends Controller
{
    public function index()
    {
        return response()->json(Cajero::all(), 200);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'nombrecajero'   => 'required|string|max:50',
            'apellidocajero' => 'required|string|max:70',
            'imagencajero'   => 'nullable|string|max:100',
            'passwordcajero'   => 'required|string|max:50',
            
        ]);

        $cajero = Cajero::create($data);
        return response()->json($cajero, 201);
    }

    public function show($idcajero)
    {
        $cajero = Cajero::findOrFail($idcajero);
        return response()->json($cajero, 200);
    }

    public function update(Request $request, $idcajero)
    {
        $data = $request->validate([
            'nombrecajero'   => 'sometimes|string|max:50',
            'apellidocajero' => 'sometimes|string|max:70',
            'imagencajero'   => 'nullable|string|max:100',
            'passwordcajero'   => 'sometimes|string|max:50',
        ]);

        $cajero = Cajero::findOrFail($idcajero);
        $cajero->update($data);
        return response()->json($cajero, 200);
    }

    public function destroy($idcajero)
    {
        Cajero::destroy($idcajero);
        return response()->json(null, 204);
    }
}
