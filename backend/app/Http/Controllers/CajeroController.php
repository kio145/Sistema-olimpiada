<?php

namespace App\Http\Controllers;

use App\Models\Cajero;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Arr;
use Illuminate\Validation\Rule;

class CajeroController extends Controller
{
    public function index()
    {
        return response()->json(Cajero::all());
    }

    public function me(Request $request): JsonResponse
    {
        // 1) obtenemos el usuario autenticado (en la tabla "users", gracias a sanctum)
        /** @var \App\Models\User $user */
        $user = $request->user();

        // 2) buscamos al cajero cuyo profile_id coincide con $user->profile_id
        $cajero = Cajero::findOrFail($user->profile_id);

        return response()->json($cajero, 200);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'nombrecajero'    => 'required|string|max:50',
            'apellidocajero'  => 'required|string|max:50',
            'emailcajero'     => 'required|email|unique:cajero,emailcajero|unique:users,email',
            'passwordcajero'  => 'required|string|min:6|confirmed',
        ]);

        $cajero = Cajero::create([
            'nombrecajero'   => $data['nombrecajero'],
            'apellidocajero' => $data['apellidocajero'],
            'emailcajero'    => $data['emailcajero'],
            'passwordcajero' => Hash::make($data['passwordcajero']),
        ]);

        $user = User::create([
            'name'           => $cajero->nombrecajero . ' ' . $cajero->apellidocajero,
            'email'          => $cajero->emailcajero,
            'password'       => Hash::make($data['passwordcajero']),
            'role'           => 'cajero',
            'profile_id'     => $cajero->idcajero,
            'profile_type'   => Cajero::class,
        ]);

        return response()->json([
            'cajero'  => $cajero,
            'usuario' => $user,
        ], 201);
    }

    public function show(int $id): JsonResponse
    {
        $cajero = Cajero::findOrFail($id);
        return response()->json($cajero, 200);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        \Log::info('CAJERO_UPDATE:', $request->all());
        // Validación de datos (nota: todos los campos son opcionales en un update salvo que quieras forzar lo contrario)
        $validated = $request->validate([
            'nombrecajero'    => 'sometimes|string|max:50',
            'apellidocajero'  => 'sometimes|string|max:50',
            'emailcajero'     => [
                'sometimes',
                'email',
                Rule::unique('cajero', 'emailcajero')->ignore($id, 'idcajero'),
                Rule::unique('users', 'email')->ignore($this->getUserId($id), 'id')
            ],
            'imagencajero'    => 'sometimes|image|max:2048',
            'passwordcajero'  => 'sometimes|string|min:6',
        ]);

        $cajero = Cajero::findOrFail($id);

        try {
            // Manejo de imagen (opcional)
            if ($request->hasFile('imagencajero')) {
                if ($cajero->imagencajero) {
                    \Storage::disk('public')->delete($cajero->imagencajero);
                }
                $path = $request->file('imagencajero')->store('cajeros', 'public');
                $validated['imagencajero'] = $path;
            }

            // Actualizamos el cajero (sin password)
            $cajero->update(Arr::except($validated, ['passwordcajero']));

            // Update usuario relacionado
            $user = User::where('profile_id', $id)
                ->where('profile_type', Cajero::class)
                ->first();

            if ($user) {
                $userData = [];

                if (isset($validated['nombrecajero']) || isset($validated['apellidocajero'])) {
                    $userData['name'] =
                        ($validated['nombrecajero'] ?? $cajero->nombrecajero) . ' ' .
                        ($validated['apellidocajero'] ?? $cajero->apellidocajero);
                }
                if (isset($validated['emailcajero'])) {
                    $userData['email'] = $validated['emailcajero'];
                }
                if (isset($validated['passwordcajero'])) {
                    $userData['password'] = Hash::make($validated['passwordcajero']);
                }
                if (!empty($userData)) {
                    $user->update($userData);
                }
            }

            return response()->json([
                'cajero' => $cajero,
                'user'   => $user
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al actualizar',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Método auxiliar para obtener el ID de usuario
    private function getUserId(int $cajeroId): int
    {
        return User::where('profile_id', $cajeroId)
            ->where('profile_type', Cajero::class)
            ->value('id');
    }

    public function destroy(int $id): JsonResponse
    {
        Cajero::destroy($id);
        return response()->json(null, 204);
    }
}
