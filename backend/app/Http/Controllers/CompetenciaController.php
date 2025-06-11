<?php

namespace App\Http\Controllers;

use App\Models\RequisitoCompetencia;
use App\Models\Fecha;
use App\Models\Competencia;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Arr;
use Carbon\Carbon;

class CompetenciaController extends Controller
{
    /**
     * GET /api/competencias
     * Listado con filtros opcionales de área, nivel, precio y descripción,
     * además paginado.
     *
     * Parámetros querystring:
     *   - area
     *   - nivel
     *   - precio_min
     *   - precio_max
     *   - q          (texto en descripción)
     *   - page       (para paginación)
     */
    public function index(Request $request): JsonResponse
    {
        $competencias = Competencia::with('requisitos')   // ← aquí
            ->area($request->query('area'))
            ->nivel($request->query('nivel'))
            ->precioBetween($request->query('precio_min'), $request->query('precio_max'))
            ->descripcionLike($request->query('q'))
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        return response()->json($competencias);
    }
    /**
     * POST /api/competencias
     * Crear una nueva competencia (solo administradores).
     */
    public function store(Request $request): JsonResponse
    {
        // 1) Usuario actual
        $user = $request->user();
        if (!$user || $user->role !== 'administrador') {
            return response()->json(['message' => 'No autorizado'], 403);
        }

        // 2) Validación
        $data = $request->validate([
            'areacompetencia'   => 'required|string|max:50',
            'nivelcompetencia'  => 'required|string|max:50',
            'preciocompetencia' => 'required|integer',
            'descripcion'       => 'nullable|string|max:250',
            'imagencompetencia' => 'nullable|image|max:1024',
            'cursos'            => 'required|array|min:1',
            'cursos.*'          => 'string|max:50',
        ]);

        // 3) ID del admin
        $data['idadmi'] = $user->profile_id;

        // 4) Guardar imagen
        if ($request->hasFile('imagencompetencia')) {
            $data['imagencompetencia'] = $request
                ->file('imagencompetencia')
                ->store('competencias', 'public');
        }

        // 5) Crear competencia (omite 'cursos')
        $competencia = Competencia::create(
            Arr::except($data, ['cursos'])
        );

        // 6) Crear un requisito por cada curso seleccionado
        foreach ($data['cursos'] as $curso) {
            RequisitoCompetencia::create([
                'idcompetencia' => $competencia->idcompetencia,
                'curso'         => $curso,
            ]);
        }

        // 7) Devolver con los requisitos cargados
        return response()->json(
            $competencia->load('requisitos'),
            201
        );
    }

    /**
     * GET /api/competencias/{id}
     * Mostrar una competencia específica.
     */
    public function show($id): JsonResponse
    {
        // Carga competencia con sus requisitos
        $competencia = Competencia::with('requisitos')->findOrFail($id);

        // Trae el único registro de fechas globales
        $fechas = Fecha::first();

        // Adjunta SOLO los campos que usa el frontend
        $competencia->setAttribute('fechas', [
            'fecha_inicio_inscripcion' => $fechas->fecha_inicio_inscripcion,
            'fecha_fin_inscripcion'    => $fechas->fecha_fin_inscripcion,
            'fecha_inicio_validacion'  => $fechas->fecha_inicio_validacion,
            'fecha_fin_validacion'     => $fechas->fecha_fin_validacion,
            'fecha_inicio_pago'        => $fechas->fecha_inicio_pago,
            'fecha_fin_pago'           => $fechas->fecha_fin_pago,
            'fecha_inicio_competencia' => $fechas->fecha_inicio_competencia,
            'fecha_fin_competencia'    => $fechas->fecha_fin_competencia,
        ]);

        return response()->json($competencia, 200);
    }


    /**
     * PUT /api/competencias/{id}
     * Actualizar datos de una competencia existente.
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $competencia = Competencia::findOrFail($id);

        $data = $request->validate([
            'areacompetencia'   => 'sometimes|string|max:50',
            'nivelcompetencia'  => 'sometimes|string|max:50',
            'preciocompetencia' => 'sometimes|integer',
            'descripcion'       => 'nullable|string|max:250',
            'imagencompetencia' => 'nullable|string|max:100',
        ]);

        $competencia->update($data);

        return response()->json($competencia, 200);
    }

    /**
     * DELETE /api/competencias/{id}
     * Eliminar una competencia.
     */
    public function destroy(int $id): JsonResponse
    {
        Competencia::destroy($id);

        return response()->json(null, 204);
    }

    /**
     * GET /api/competencias/todas
     * Obtener todas las competencias con sus relaciones.
     */
    public function getTodasLasCompetencias(): JsonResponse
    {
        $competencias = Competencia::with(['administrador', 'competidores', 'requisitos'])
            ->orderBy('areacompetencia', 'asc')
            ->get();

        $fechasGlobal = Fecha::first();

        // Para cada competencia, adjunto las mismas fechas globales
        foreach ($competencias as $comp) {
            $comp->setAttribute('fechas', $fechasGlobal);
        }

        return response()->json($competencias, 200);
    }
    /**
     * GET /api/competencias/estado-inscripcion
     * Determinar si la inscripción está abierta según las fechas en tabla 'fechas'.
     */
    public function getEstadoInscripcionCompetencias(): JsonResponse
    {
        $hoy = Carbon::now()->toDateString();

        $result = Competencia::select(
            'idcompetencia',
            'areacompetencia',
            'nivelcompetencia'
        )
            ->get()
            ->map(function ($c) use ($hoy) {
                // Asumimos que la tabla FECHAS está vinculada por idfechas = idcompetencia
                $fechas = $c->requisitos()->first()?->fechas;
                $ini = $fechas->fecha_inicio_inscripcion ?? null;
                $fin = $fechas->fecha_fin_inscripcion ?? null;
                return [
                    'idcompetencia'     => $c->idcompetencia,
                    'areacompetencia'   => $c->areacompetencia,
                    'nivelcompetencia'  => $c->nivelcompetencia,
                    'inscripcion_abierta' => $ini && $fin && $hoy >= $ini && $hoy <= $fin,
                ];
            });

        return response()->json($result, 200);
    }
}
