<?php

namespace App\Http\Controllers;

use App\Models\Cajero;
use Illuminate\Http\Request;

class CajeroController extends Controller
{
    public function index()
    {
        return response()->json(Cajero::all());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'idcajero'       => 'required|integer|unique:cajero',
            'nobrecajero'    => 'required|string|max:50',
            'apellidocajero' => 'required|string|max:50',
            'imagencajero'   => 'nullable|string|max:100',
        ]);

        $cajero = Cajero::create($data);
        return response()->json($cajero, 201);
    }

    public function show($id)
    {
        return response()->json(Cajero::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $cajero = Cajero::findOrFail($id);
        $data = $request->validate([
            'nobrecajero'    => 'sometimes|string|max:50',
            'apellidocajero' => 'sometimes|string|max:50',
            'imagencajero'   => 'nullable|string|max:100',
        ]);

        $cajero->update($data);
        return response()->json($cajero);
    }

    public function destroy($id)
    {
        Cajero::destroy($id);
        return response()->noContent();
    }
}
