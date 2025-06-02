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

        // 1) Creamos/el guardamos el registro de validación
        $validarTutor = ValidarTutor::create($data);

        // 2) Si el tutor decidió “aceptada”, actualizamos la inscripción:
        if ($data['estado_validacion'] === 'aceptada') {
            // Buscamos la inscripción que coincide con (idcompetencia, idcompetidor)
            $inscripcion = Inscripcion::where('idcompetencia', $data['idcompetencia'])
                ->where('idcompetidor', $data['idcompetidor'])
                ->first();
            if ($inscripcion) {
                // Actualizamos su estado a “inscrito”
                $inscripcion->estado_inscripcion = 'inscrito';
                $inscripcion->save();
            }
        }

        // 3) Si el tutor decidió “rechazado”, marcamos estado_inscripcion como “rechazado” (opcional)
        if ($data['estado_validacion'] === 'rechazado') {
            $inscripcion = Inscripcion::where('idcompetencia', $data['idcompetencia'])
                ->where('idcompetidor', $data['idcompetidor'])
                ->first();
            if ($inscripcion) {
                $inscripcion->estado_inscripcion = 'rechazado';
                $inscripcion->save();
            }
        }

        return response()->json($validarTutor, 201);
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

        // Al actualizar una validación, si cambió a “aceptada” o “rechazado”, de nuevo sincronizamos la inscripción:
        if (isset($data['estado_validacion'])) {
            $estado = $data['estado_validacion'];
            // Buscamos la inscripción correspondiente:
            $inscripcion = Inscripcion::where('idcompetencia', $validarTutor->idcompetencia)
                ->where('idcompetidor', $validarTutor->idcompetidor)
                ->first();
            if ($inscripcion) {
                if ($estado === 'aceptada') {
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
