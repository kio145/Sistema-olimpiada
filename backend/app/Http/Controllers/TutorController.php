<?php

namespace App\Http\Controllers;

use App\Models\Tutor;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Arr;              
use Illuminate\Validation\Rule; 


class TutorController extends Controller
{
    public function index()
    {
        return response()->json(Tutor::all());
    }

    public function store(Request $request)
    {
        // 1) valida los datos
        $data = $request->validate([
            'nombretutor'    => 'required|string|max:50',
            'apellidotutor'  => 'required|string|max:50',
            'correotutor'     => 'required|email|unique:tutor,correotutor|unique:users,email',
            'passwordtutor'  => 'required|string|min:6|confirmed',
            'area'          => 'required|string|max:50',
            'telefonotutor'  => 'required|integer',
            'citutor'       => 'required|integer',
        ]);

        // 2) crea el tutor
        $tutor = Tutor::create([
            'nombretutor'   => $data['nombretutor'],
            'apellidotutor' => $data['apellidotutor'],
            'correotutor'    => $data['correotutor'],
            'passwordtutor' => Hash::make($data['passwordtutor']),
            'area'           => $data['area'],
            'telefonotutor'  => $data['telefonotutor'],
            'citutor'        => $data['citutor'],
        ]);

        // 3) crea el usuario en tabla "users"
        $user = User::create([
            'name'           => $tutor->nombretutor . ' ' . $tutor->apellidotutor,
            'email'          => $tutor->correotutor,
            'password'       => Hash::make($data['passwordtutor']),
            'role'           => 'tutor',
            'profile_id'     => $tutor->idtutor,
            'profile_type'   => Tutor::class,
        ]);

        // 4) devuelve la respuesta
        return response()->json([
            'tutor' => $tutor,
            'usuario'    => $user,
        ], 201);
    }

    // GET /api/tutores/{id}
    public function show(int $id): JsonResponse
{
    $tutor = Tutor::with('competidores.competencias')->findOrFail($id);


    return response()->json($tutor, 200);
}

    public function update(Request $request, int $id): JsonResponse
     {
        \Log::info('Update payload:', $request->all());
        $tutor = Tutor::findOrFail($id);

        $data = $request->validate([
            'nombretutor'   => 'sometimes|string|max:50',
            'apellidotutor' => 'sometimes|string|max:50',
            'area'          => 'sometimes|string|max:50',
            'telefonotutor' => 'sometimes|numeric',
            'correotutor'    => [
                'sometimes',
                'email',
                Rule::unique('tutor', 'correotutor')->ignore($id, 'idtutor')
            ],
            'citutor'       => 'sometimes|numeric',
            'passwordtutor' => 'sometimes|string|min:6|confirmed',
            'imagentutor'   => 'sometimes',
        ]);
        if ($request->hasFile('imagentutor')) {
            $path = $request->file('imagentutor')->store('tutores', 'public');
            $data['imagentutor'] = $path;
        }
        $tutor->update(Arr::except($data, ['passwordtutor']));

        $user = User::where('profile_type', Competidor::class)
            ->where('profile_id', $id)
            ->first();

        if ($user) {
            $userUpdates = [];
            if (isset($data['correotutor'])) {
                $userUpdates['email'] = $data['correotutor'];
                $userUpdates['name']  = "{$tutor->nombretutor} {$tutor->apellidotutor}";
            }
            if (isset($data['passwordtutor'])) {
                $userUpdates['password'] = Hash::make($data['passwordtutor']);
            }
            if ($userUpdates) {
                $user->update($userUpdates);
            }
        }
   
        return response()->json($tutor, 200);
    }

    public function destroy($id)
    {
        Tutor::destroy($id);
        return response()->json(null, 204);
    }
}
