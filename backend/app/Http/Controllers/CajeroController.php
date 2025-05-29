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
            'cajero' => $cajero,
            'usuario'    => $user,
        ], 201);
    }

    public function show(int $id): JsonResponse
    {
        $cajero = Cajero::findOrFail((int) $id);
        return response()->json($cajero, 200);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        \Log::info('Update payload:', $request->all());
        $cajero = Cajero::findOrFail($id);

        $data = $request->validate([
            'nombrecajero'   => 'sometimes|string|max:50',
            'apellidocajero' => 'sometimes|string|max:50',
            'emailcajero'    => [
                'sometimes',
                'email',
                Rule::unique('cajero', 'emailcajero')->ignore($id, 'idcajero')
            ],
            'passwordcajero' => 'sometimes|string|min:6|confirmed',
            'imagencajero'   => 'sometimes|image|max:2048',
        ]);

        if ($request->hasFile('imagencajero')) {
            $path = $request->file('imagencajero')->store('cajeros', 'public');
            $data['imagencajero'] = $path;
        }
        
        $cajero->update(Arr::except($data, ['passwordcajero']));

         $user = User::where('profile_type', Cajero::class)
            ->where('profile_id', $id)
            ->first();

        if ($user) {
            $userUpdates = [];
            if (isset($data['emailcajero'])) {
                $userUpdates['email'] = $data['emailcajero'];
                $userUpdates['name']  = "{$cajero->nombrecajero} {$cajero->apellidocajero}";
            }
            if (isset($data['passwordcajero'])) {
                $userUpdates['password'] = Hash::make($data['passwordcajero']);
            }
            if ($userUpdates) {
                $user->update($userUpdates);
            }
        }

        return response()->json($cajero, 200);
    }

    public function destroy(int $id): JsonResponse
    {
        Competidor::destroy($id);
        return response()->json(null, 204);
    }
}
