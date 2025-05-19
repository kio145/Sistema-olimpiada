<?php

namespace App\Http\Controllers;

use App\Models\Competencia;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
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
        $competencias = Competencia::query()
            ->area($request->query('area'))
            ->nivel($request->query('nivel'))
            ->precioBetween(
                $request->query('precio_min'),
                $request->query('precio_max')
            )
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
        if (Auth::user()->role !== 'administrador') {
            return response()->json(['message' => 'No autorizado'], 403);
        }

        $data = $request->validate([
            'idcompetencia'     => 'required|integer|unique:competencia,idcompetencia',
            'areacompetencia'   => 'required|string|max:50',
            'nivelcompetencia'  => 'required|string|max:50',
            'preciocompetencia' => 'required|integer',
            'descripcion'       => 'nullable|string|max:250',
            'imagencompetencia' => 'nullable|string|max:100',
        ]);

        // Asignar el administrador que crea la competencia
        $data['idadmi'] = Auth::user()->profile_id;

        $competencia = Competencia::create($data);

        return response()->json($competencia, 201);
    }

    /**
     * GET /api/competencias/{id}
     * Mostrar una competencia específica.
     */
    public function show(int $id): JsonResponse
    {
        $competencia = Competencia::with(['administrador', 'competidores', 'requisitos'])
            ->findOrFail($id);

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
