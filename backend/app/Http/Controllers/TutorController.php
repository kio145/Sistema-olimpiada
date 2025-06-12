<?php

namespace App\Http\Controllers;

use App\Models\Tutor;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Arr;
use Illuminate\Validation\Rule;


class TutorController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Tutor::query();

        if ($request->filled('area')) {
            $area = trim($request->input('area'));
            $query->whereRaw('LOWER(area) LIKE ?', ['%' . strtolower($area) . '%']);
        }

        $tutores = $query->get();
        return response()->json($tutores, 200);
    }

    public function store(Request $request)
    {
        // 1) valida los datos
        $data = $request->validate([
            'nombretutor'    => 'required|string|max:50',
            'apellidotutor'  => 'required|string|max:50',
            'correotutor'     => 'required|email|unique:tutor,correotutor|unique:users,email',
            'passwordtutor'  => 'required|string|min:6|confirmed',
            'area'          => 'required|string|max:100',
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

    public function show(int $id): JsonResponse
    {
        // 1) Cargo al tutor con la relación “competidores” y la relación “competencias”
        $tutor = Tutor::with('competidores.competencias')->findOrFail($id);

        // 2) Para cada competidor relacionado (en la tabla pivot), buscamos su inscripción
        foreach ($tutor->competidores as $competidor) {
            $pivot = $competidor->pivot;
            // El pivot trae idcompetidor y idcompetencia:
            $insc = \App\Models\Inscripcion::where('idcompetidor', $pivot->idcompetidor)
                ->where('idcompetencia', $pivot->idcompetencia)
                ->first();
            // Añadimos manualmente la propiedad _inscripcion_id dentro del pivot
            $competidor->pivot->_inscripcion_id = $insc ? $insc->_inscripcion_id : null;
        }

        // 3) Devolvemos el JSON con el tutor (y, ahora sí, cada competidor.pivot._inscripcion_id)
        return response()->json($tutor, 200);
    }

    public function update(Request $request, int $id)
    {
        \Log::info($request->all());
        $validated = $request->validate([
            'nombretutor'   => 'sometimes|string|max:50',
            'apellidotutor' => 'sometimes|string|max:50',
            'correotutor'   => [
                'sometimes',
                'email',
                Rule::unique('tutor', 'correotutor')->ignore($id, 'idtutor'),
                Rule::unique('users', 'email')->ignore($this->getUserId($id), 'id'),
            ],
            'area'          => 'sometimes|string|max:100',
            'telefonotutor' => 'sometimes|string|max:20',
            'citutor'       => 'sometimes|string|max:20',
            'imagentutor'   => 'sometimes|image|max:2048',
            'passwordtutor' => 'sometimes|string|min:6',
        ]);

        $tutor = Tutor::findOrFail($id);

        DB::beginTransaction();
        try {
            if ($request->hasFile('imagentutor')) {
                if ($tutor->imagentutor) {
                    Storage::disk('public')->delete($tutor->imagentutor);
                }
                $validated['imagentutor'] = $request->file('imagentutor')->store('tutores', 'public');
            }

            $tutor->update(Arr::except($validated, ['passwordtutor'])); // Así como competidor

            $user = User::where('profile_id', $id)
                ->where('profile_type', Tutor::class)
                ->first();

            if ($user) {
                $u = [];
                if (isset($validated['correotutor'])) {
                    $u['email'] = $validated['correotutor'];
                }
                if (isset($validated['nombretutor']) || isset($validated['apellidotutor'])) {
                    $u['name'] =
                        ($validated['nombretutor'] ?? $tutor->nombretutor) . ' ' .
                        ($validated['apellidotutor'] ?? $tutor->apellidotutor);
                }
                if (isset($validated['passwordtutor'])) {
                    $u['password'] = Hash::make($validated['passwordtutor']);
                }
                if (!empty($u)) {
                    $user->update($u);
                }
            }

            DB::commit();
            return response()->json(['tutor' => $tutor, 'user' => $user], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Error al actualizar', 'error' => $e->getMessage()], 500);
        }
    }

    // Helper para obtener el ID de usuario
    private function getUserId(int $tutorId): int
    {
        return User::where('profile_id', $tutorId)
            ->where('profile_type', Tutor::class)
            ->value('id');
    }



    public function destroy($id)
    {
        Tutor::destroy($id);
        return response()->json(null, 204);
    }

    public function me(Request $request): JsonResponse
    {
        // Obtiene el ID de tutor desde el token (profile_id)
        /** @var \App\Models\User $user */
        $user = $request->user();

        $tutor = Tutor::with('competidores.competencias')
            ->findOrFail($user->profile_id);

        return response()->json($tutor, 200);
    }

    public function areasFijas($idtutor)
    {
        // Busca áreas donde el tutor ya fue validado por al menos un competidor
        $areas = DB::table('validar_tutor')
            ->join('competencias', 'validar_tutor.idcompetencia', '=', 'competencias.idcompetencia')
            ->where('validar_tutor.idtutor', $idtutor)
            ->where('validar_tutor.estado_validacion', 'validado')
            ->pluck('competencias.areacompetencia')
            ->unique()
            ->values();

        return response()->json($areas, 200);
    }
}
