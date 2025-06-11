<?php

namespace App\Http\Controllers;

use App\Models\Administrador;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;


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

    // app/Http/Controllers/AdministradorController.php

    public function update(Request $request, int $id)
    {
        \Log::info('ADMIN_UPDATE:', $request->all());
        $validated = $request->validate([
            'nombreadmi'   => 'sometimes|string|max:50',
            'apellidoadmi' => 'sometimes|string|max:50',
            'correoadmi'    => [
                'sometimes',
                'email',
                Rule::unique('administrador', 'correoadmi')->ignore($id, 'idadmi'),
                Rule::unique('users', 'email')->ignore($this->getUserId($id), 'id'),
            ],
            'imagenadmi'   => 'sometimes|image|max:2048',
            'passwordadmi' => 'sometimes|string|min:6',
        ]);

        $admi = \App\Models\Administrador::findOrFail($id);

        \DB::beginTransaction();
        try {
            // Imagen
            if ($request->hasFile('imagenadmi')) {
                if ($admi->imagenadmi) {
                    \Storage::disk('public')->delete($admi->imagenadmi);
                }
                $validated['imagenadmi'] = $request->file('imagenadmi')->store('administradores', 'public');
            }
            $admi->update($validated);

            // Actualiza usuario relacionado
            $user = \App\Models\User::where('profile_id', $id)
                ->where('profile_type', \App\Models\Administrador::class)
                ->firstOrFail();

            if (isset($validated['nombreadmi']) || isset($validated['apellidoadmi'])) {
                $user->name = ($validated['nombreadmi'] ?? $admi->nombreadmi) . ' ' . ($validated['apellidoadmi'] ?? $admi->apellidoadmi);
            }
            if (isset($validated['correoadmi'])) {
                $user->email = $validated['correoadmi'];
            }
            if ($request->filled('passwordadmi')) {
                $user->password = \Hash::make($request->input('passwordadmi'));
            }
            $user->save();

            \DB::commit();
            return response()->json(['admi' => $admi, 'user' => $user], 200);
        } catch (\Exception $e) {
            \DB::rollBack();
            return response()->json(['message' => 'Error al actualizar', 'error' => $e->getMessage()], 500);
        }
    }

    // Helper
    private function getUserId(int $adminId): int
    {
        return \App\Models\User::where('profile_id', $adminId)
            ->where('profile_type', \App\Models\Administrador::class)
            ->value('id');
    }


    public function destroy($id)
    {
        Administrador::destroy($id);
        return response()->noContent();
    }
}
