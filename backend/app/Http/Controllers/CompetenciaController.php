<?php

namespace App\Http\Controllers;
use Carbon\Carbon;
use App\Models\Competencia;
use Illuminate\Http\Request;

class CompetenciaController extends Controller
{
    public function index()
    {
        return response()->json(Competencia::all());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'idcompetencia'     => 'required|integer|unique:competencia',
            'idadmi'            => 'required|integer|exists:administrador,idadmi',
            'areacompetencia'   => 'required|string|max:50',
            'nivelcompetencia'  => 'required|string|max:50',
            'preciocompetencia' => 'required|integer',
            'descripcion'       => 'nullable|string|max:250',
            'imagencompetencia' => 'nullable|string|max:100',
        ]);

        $cmp = Competencia::create($data);
        return response()->json($cmp, 201);
    }

    public function show($id)
    {
        return response()->json(Competencia::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $cmp = Competencia::findOrFail($id);
        $data = $request->validate([
            'idadmi'            => 'sometimes|integer|exists:administrador,idadmi',
            'areacompetencia'   => 'sometimes|string|max:50',
            'nivelcompetencia'  => 'sometimes|string|max:50',
            'preciocompetencia' => 'sometimes|integer',
            'descripcion'       => 'nullable|string|max:250',
            'imagencompetencia' => 'nullable|string|max:100',
        ]);

        $cmp->update($data);
        return response()->json($cmp);
    }

    public function destroy($id)
    {
        Competencia::destroy($id);
        return response()->noContent();
    }
 public function getTodasLasCompetencias()
{
    $competencias = Competencia::with('administrador', 'competidores')
        ->orderBy('fechainicompetencia', 'asc')
        ->get();

    return response()->json($competencias, 200);
}
public function getEstadoInscripcionCompetencias()
{
    $hoy = Carbon::now()->toDateString();

    $competencias = Competencia::select('nombrecompetencia', 'nivelcompetencia', 'fechainiinscripcion', 'fechafininscripcion','estadocompetencia')
        ->get()
        ->map(function ($competencia) use ($hoy) {
            $estadoInscripcion = ($hoy >= $competencia->fechainiinscripcion && $hoy <= $competencia->fechafininscripcion);

            return [
                'nombrecompetencia'  => $competencia->nombrecompetencia,
                'nivelcompetencia'   => $competencia->nivelcompetencia,
                'estadoinscripcion'  => $competencia->estadocompetencia,
            ];
        });

    return response()->json($competencias, 200);
}

}
