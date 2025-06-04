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

    public function me(Request $request): JsonResponse
    {
        $user = $request->user();
        if (!$user || $user->role !== 'competidor') {
            return response()->json(['message' => 'No autorizado'], 403);
        }
        $competidor = Competidor::findOrFail($user->profile_id);
        return response()->json($competidor, 200);
    }

    // PUT/PATCH /api/competidores/{id}
    // app/Http/Controllers/CompetidorController.php

    public function update(Request $request, int $id): JsonResponse
    {
        $competidor = Competidor::findOrFail($id);

        $data = $request->validate([
            'nombrecompetidor'     => 'sometimes|string|max:50',
            'apellidocompetidor'   => 'sometimes|string|max:50',
            'emailcompetidor'      => [
                'sometimes','email',
                Rule::unique('competidor','emailcompetidor')->ignore($id,'idcompetidor')
            ],
            'cicompetidor'         => 'sometimes|integer',
            'fechanacimiento'      => 'sometimes|date',
            'telefonocompetidor'   => 'sometimes|string|max:20',
            'colegio'              => 'sometimes|string|max:100',
            'curso'                => 'sometimes|string|max:50',
            'departamento'         => 'sometimes|string|max:50',
            'provincia'            => 'sometimes|string|max:50',
            'passwordcompetidor'   => 'sometimes|string|min:6|confirmed',
            'imagencompetidor'     => 'sometimes|image|max:2048',
        ]);

        // si viene imagen, guardamos
        if ($request->hasFile('imagencompetidor')) {
            $path = $request->file('imagencompetidor')->store('competidores','public');
            $data['imagencompetidor'] = $path;
        }

        // actualizamos competidor (sin tocar password)
        $competidor->update(Arr::except($data, ['passwordcompetidor']));

        // actualizamos usuario en `users` si cambió email o password
        $user = User::where('profile_type', Competidor::class)
                    ->where('profile_id', $id)
                    ->first();

        if ($user) {
            $u = [];
            if (isset($data['emailcompetidor'])) {
                $u['email'] = $data['emailcompetidor'];
                $u['name']  = "{$competidor->nombrecompetidor} {$competidor->apellidocompetidor}";
            }
            if (isset($data['passwordcompetidor'])) {
                $u['password'] = Hash::make($data['passwordcompetidor']);
            }
            if ($u) {
                $user->update($u);
            }
        }

        return response()->json($competidor, 200);
    }


    // DELETE /api/competidores/{id}
    public function destroy(int $id): JsonResponse
    {
        Competidor::destroy($id);
        return response()->json(null, 204);
    }

    public function buscarPorCI($ci)
{
    $competidor = Competidor::with('inscripciones.competencia')
                    ->where('cicompetidor', $ci)
                    ->first();

    if (!$competidor) {
        return response()->json(['error' => 'Competidor no encontrado'], 404);
    }

    return response()->json($competidor);
}

}
