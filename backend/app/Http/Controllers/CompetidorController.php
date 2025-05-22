<?php


namespace App\Http\Controllers;

use App\Models\Competidor;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Arr;              
use Illuminate\Validation\Rule; 


class CompetidorController extends Controller
{
    public function index()
    {
        return response()->json(Competidor::all());
    }

    public function store(Request $request)
    {
        // 1) valida los datos
        $data = $request->validate([
            'nombrecompetidor'    => 'required|string|max:50',
            'apellidocompetidor'  => 'required|string|max:50',
            'emailcompetidor'     => 'required|email|unique:competidor,emailcompetidor|unique:users,email',
            'passwordcompetidor'  => 'required|string|min:6|confirmed',
        ]);

        // 2) crea el competidor
        $competidor = Competidor::create([
            'nombrecompetidor'   => $data['nombrecompetidor'],
            'apellidocompetidor' => $data['apellidocompetidor'],
            'emailcompetidor'    => $data['emailcompetidor'],
            // guarda la contraseña alfanumérica de competidor en su propia columna si la necesitas:
            'passwordcompetidor' => Hash::make($data['passwordcompetidor']),
        ]);

        // 3) crea el usuario en tabla "users"
        $user = User::create([
            'name'           => $competidor->nombrecompetidor . ' ' . $competidor->apellidocompetidor,
            'email'          => $competidor->emailcompetidor,
            'password'       => Hash::make($data['passwordcompetidor']),
            'role'           => 'competidor',
            'profile_id'     => $competidor->idcompetidor,
            'profile_type'   => Competidor::class,
        ]);

        // 4) devuelve la respuesta
        return response()->json([
            'competidor' => $competidor,
            'usuario'    => $user,
        ], 201);
    }
    public function show(int $id): JsonResponse
    {
        $competidor = Competidor::findOrFail((int) $id);
        return response()->json($competidor, 200);
    }

    // PUT/PATCH /api/competidores/{id}
    // app/Http/Controllers/CompetidorController.php

    public function update(Request $request, int $id): JsonResponse
    {
        \Log::info('Update payload:', $request->all());
        $competidor = Competidor::findOrFail($id);

        // 1) Validar sólo los campos que pueden cambiar
        $data = $request->validate([
            'nombrecompetidor'   => 'sometimes|string|max:50',
            'apellidocompetidor' => 'sometimes|string|max:50',
            'emailcompetidor'    => [
                'sometimes',
                'email',
                Rule::unique('competidor', 'emailcompetidor')->ignore($id, 'idcompetidor')
            ],
            'passwordcompetidor' => 'sometimes|string|min:6|confirmed',
            'imagencompetidor'   => 'sometimes|image|max:2048',
        ]);

        // 2) Si viene archivo de imagen, guárdalo y setea la ruta
        if ($request->hasFile('imagencompetidor')) {
            $path = $request->file('imagencompetidor')->store('competidores', 'public');
            $data['imagencompetidor'] = $path;
        }

        // 3) Actualiza competidor
        $competidor->update(Arr::except($data, ['passwordcompetidor']));

        // 4) Actualiza usuario asociado
        $user = User::where('profile_type', Competidor::class)
            ->where('profile_id', $id)
            ->first();

        if ($user) {
            $userUpdates = [];
            if (isset($data['emailcompetidor'])) {
                $userUpdates['email'] = $data['emailcompetidor'];
                $userUpdates['name']  = "{$competidor->nombrecompetidor} {$competidor->apellidocompetidor}";
            }
            if (isset($data['passwordcompetidor'])) {
                $userUpdates['password'] = Hash::make($data['passwordcompetidor']);
            }
            if ($userUpdates) {
                $user->update($userUpdates);
            }
        }

        // 5) Devolver el perfil actualizado
        return response()->json($competidor, 200);
    }


    // DELETE /api/competidores/{id}
    public function destroy(int $id): JsonResponse
    {
        Competidor::destroy($id);
        return response()->json(null, 204);
    }
}
