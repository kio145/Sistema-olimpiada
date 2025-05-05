<?php

namespace App\Http\Controllers;

use App\Models\Administrador;
use Illuminate\Http\Request;

class AdministradorController extends Controller
{
    public function index()
    {
        return response()->json(Administrador::all(), 200);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'idadmi'       => 'required|integer|unique:administrador,idadmi',
            'nombreadmi'   => 'required|string|max:50',
            'apellidoadmi' => 'required|string|max:70',
            'correoadmi'   => 'required|email|max:100',
            'imagenadmi'   => 'nullable|string|max:100',
        ]);

        $admin = Administrador::create($data);
        return response()->json($admin, 201);
    }

    public function show($idadmi)
    {
        $admin = Administrador::findOrFail($idadmi);
        return response()->json($admin, 200);
    }

    public function update(Request $request, $idadmi)
    {
        $data = $request->validate([
            'nombreadmi'   => 'sometimes|string|max:50',
            'apellidoadmi' => 'sometimes|string|max:70',
            'correoadmi'   => 'sometimes|email|max:100',
            'imagenadmi'   => 'nullable|string|max:100',
        ]);

        $admin = Administrador::findOrFail($idadmi);
        $admin->update($data);
        return response()->json($admin, 200);
    }

    public function destroy($idadmi)
    {
        Administrador::destroy($idadmi);
        return response()->json(null, 204);
    }
}
