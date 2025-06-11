<?php

namespace App\Http\Controllers;

use App\Models\ValidarTutor;
use App\Models\Inscripcion;     // <-- importamos el modelo Inscripcion
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ValidarTutorController extends Controller
{
    public function index(): JsonResponse
    {
        $validaciones = ValidarTutor::with(['competidor', 'competencia'])
            ->get();

        return response()->json($validaciones);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'idcompetencia'     => 'required|integer|exists:competencia,idcompetencia',
            'idcompetidor'      => 'required|integer|exists:competidor,idcompetidor',
            'idtutor'           => 'required|integer|exists:tutor,idtutor',
            'tipo_tutor'        => 'required|string|max:256',
            'estado_validacion' => 'nullable|string|max:256',
            'motivo_rechazo'    => 'nullable|string|max:256',
        ]);

        // Si no vino estado_validacion, lo dejamos en "pendiente"
        if (empty($data['estado_validacion'])) {
            $data['estado_validacion'] = 'pendiente';
        }

        // Solo actualiza si aún está pendiente
        $validarTutor = ValidarTutor::updateOrCreate(
            [
                'idcompetencia' => $data['idcompetencia'],
                'idcompetidor'  => $data['idcompetidor'],
                'idtutor'       => $data['idtutor'],
            ],
            [
                'tipo_tutor'        => $data['tipo_tutor'],
                // Si ya está validado o rechazado, no lo sobrescribas:
                'estado_validacion' => $data['estado_validacion'],
                'motivo_rechazo'    => $data['motivo_rechazo'] ?? null,
            ]
        );

        // Si ya no está pendiente, no vuelvas a cambiar el estado
        if ($validarTutor->estado_validacion !== 'pendiente') {
            return response()->json($validarTutor, 200);
        }

        // Si se acaba de aceptar o rechazar, sincroniza inscripción
        if ($data['estado_validacion'] === 'validado') {
            $inscripcion = Inscripcion::where('idcompetencia', $data['idcompetencia'])
                ->where('idcompetidor', $data['idcompetidor'])
                ->first();
            if ($inscripcion) {
                $inscripcion->estado_inscripcion = 'inscrito';
                $inscripcion->save();
            }
        }
        if ($data['estado_validacion'] === 'rechazado') {
            $inscripcion = Inscripcion::where('idcompetencia', $data['idcompetencia'])
                ->where('idcompetidor', $data['idcompetidor'])
                ->first();
            if ($inscripcion) {
                $inscripcion->estado_inscripcion = 'rechazado';
                $inscripcion->save();
            }
        }

        return response()->json($validarTutor, 200);
    }


    public function update(Request $request, int $validar_id): JsonResponse
    {
        $data = $request->validate([
            'idcompetencia'     => 'sometimes|integer|exists:competencia,idcompetencia',
            'idcompetidor'      => 'sometimes|integer|exists:competidor,idcompetidor',
            'idtutor'           => 'sometimes|integer|exists:tutor,idtutor',
            'tipo_tutor'        => 'sometimes|string|max:256',
            'estado_validacion' => 'sometimes|string|max:256',
            'motivo_rechazo'    => 'nullable|string|max:256',
        ]);

        $validarTutor = ValidarTutor::findOrFail($validar_id);
        $validarTutor->update($data);

        // Al actualizar una validación, si cambió a “validado” o “rechazado”, de nuevo sincronizamos la inscripción:
        if (isset($data['estado_validacion'])) {
            $estado = $data['estado_validacion'];
            // Buscamos la inscripción correspondiente:
            $inscripcion = Inscripcion::where('idcompetencia', $validarTutor->idcompetencia)
                ->where('idcompetidor', $validarTutor->idcompetidor)
                ->first();
            if ($inscripcion) {
                if ($estado === 'validado') {
                    $inscripcion->estado_inscripcion = 'inscrito';
                } elseif ($estado === 'rechazado') {
                    $inscripcion->estado_inscripcion = 'rechazado';
                }
                $inscripcion->save();
            }
        }

        return response()->json($validarTutor);
    }

    public function show(int $validar_id): JsonResponse
    {
        $validarTutor = ValidarTutor::findOrFail($validar_id);
        return response()->json($validarTutor);
    }

    public function destroy(int $validar_id): JsonResponse
    {
        $validarTutor = ValidarTutor::findOrFail($validar_id);
        $validarTutor->delete();
        return response()->json(null, 204);
    }
}
