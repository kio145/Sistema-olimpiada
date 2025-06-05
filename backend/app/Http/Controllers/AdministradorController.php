<?php

namespace App\Http\Controllers;

use App\Models\Administrador;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdministradorController extends Controller
{
    public function index()
    {
        return response()->json(Administrador::all());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'idadmi'       => 'required|integer|unique:administrador',
            'nombreadmi'   => 'required|string|max:50',
            'apellidoadmi' => 'required|string|max:70',
            'correoadmi'   => 'required|email|max:100|unique:administrador,correoadmi',
            'passwordadmi' => 'required|string|min:6',
            'imagenadmi'   => 'nullable|string|max:100',
        ]);

        $data['passwordadmi'] = Hash::make($data['passwordadmi']);
        $admin = Administrador::create($data);

        return response()->json($admin, 201);
    }

    public function show($id)
    {
        return response()->json(Administrador::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $admin = Administrador::findOrFail($id);

        $data = $request->validate([
            'nombreadmi'   => 'sometimes|string|max:50',
            'apellidoadmi' => 'sometimes|string|max:70',
            'correoadmi'   => 'sometimes|email|max:100|unique:administrador,correoadmi,' . $id . ',idadmi',
            'passwordadmi' => 'required|string|min:6|confirmed',
            'imagenadmi'   => 'nullable|string|max:100',
        ]);
        $data['passwordadmi'] = Hash::make($data['passwordadmi']);
        Administrador::create($data);
        $admin->update($data);
        return response()->json($admin);
    }

    public function destroy($id)
    {
        Administrador::destroy($id);
        return response()->noContent();
    }
}
