<?php


namespace App\Http\Controllers;

use App\Models\Competidor;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\JsonResponse;


class CompetidorController extends Controller
{
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
    public function update(Request $request, int $id): JsonResponse
    {
        $competidor = Competidor::findOrFail($id);
        $data = $request->validate([
            'nombrecompetidor'   => 'sometimes|string|max:50',
            'apellidocompetidor' => 'sometimes|string|max:50',
            'emailcompetidor'    => 'sometimes|email|unique:competidor,emailcompetidor,'.$competidor->idcompetidor.',idcompetidor',
            'cicompetidor'       => 'sometimes|integer|unique:competidor,cicompetidor,'.$competidor->idcompetidor.',idcompetidor',
            'fechanacimiento'     => 'sometimes|date',
            'telefonocompetidor' => 'sometimes|string|max:20',
            'colegio'            => 'sometimes|string|max:100',
            'curso'              => 'sometimes|string|max:50',
            'departamento'       => 'nullable|string|max:50',
            'provincia'          => 'nullable|string|max:50',
            'imagencompetidor'   => 'nullable|string|max:100',
        ]);

        $competidor->update($data);
        return response()->json($competidor, 200);
    }

    // DELETE /api/competidores/{id}
    public function destroy(int $id): JsonResponse
    {
        Competidor::destroy($id);
         return response()->json(null, 204);
    }
}
