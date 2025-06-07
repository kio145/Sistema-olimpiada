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
    dd($request->all());
    // Validación de datos
    $validated = $request->validate([
        'nombrecajero' => 'required|string|max:50',
        'apellidocajero' => 'required|string|max:50',
        'emailcajero' => [
            'required',
            'email',
            Rule::unique('cajero', 'emailcajero')->ignore($id, 'idcajero'),
            Rule::unique('users', 'email')->ignore($this->getUserId($id), 'id')
        ],
        'imagencajero' => 'sometimes|image|max:2048',
    ]);

    // Obtener el cajero
    $cajero = Cajero::findOrFail($id);

    // Manejo de imagen
    if ($request->hasFile('imagencajero')) {
        // Eliminar imagen anterior si existe
        if ($cajero->imagencajero) {
            Storage::disk('public')->delete($cajero->imagencajero);
        }
        $path = $request->file('imagencajero')->store('cajeros', 'public');
        $validated['imagencajero'] = $path;
    }

 $cajero = Cajero::findOrFail($id);
    $cajero->update($validated);

    // Update User
    $user = User::where('profile_id', $id)
        ->where('profile_type', Cajero::class)
        ->firstOrFail();

    $userData = [
        'name' => "{$validated['nombrecajero']} {$validated['apellidocajero']}",
        'email' => $validated['emailcajero']
    ];

    if ($request->filled('passwordcajero')) {
        $userData['password'] = Hash::make($request->input('passwordcajero'));
    }

    $user->update($userData);

    return response()->json([
        'cajero' => $cajero,
        'user' => $user
    ], 200);
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
