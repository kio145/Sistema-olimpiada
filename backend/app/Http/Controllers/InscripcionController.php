<?php

namespace App\Http\Controllers;

use App\Models\Competidor;
use App\Models\Inscripcion;
use Illuminate\Http\Request;

class InscripcionController extends Controller
{
    public function index()
    {
        return response()->json(Inscripcion::all());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            '_inscripcion_id'     => 'required|integer|unique:inscripciones',
            'idcompetencia'       => 'required|integer|exists:competencia,idcompetencia',
            'idcompetidor'        => 'required|integer|exists:competidor,idcompetidor',
            'estado_validacion'   => 'nullable|string|max:256',
            'estado_inscripcion'  => 'nullable|string|max:256',
        ]);

        $i = Inscripcion::create($data);
        return response()->json($i, 201);
    }

    public function show($id)
    {
        return response()->json(Inscripcion::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $i = Inscripcion::findOrFail($id);
        $data = $request->validate([
            'estado_validacion'   => 'sometimes|string|max:256',
            'estado_inscripcion'  => 'sometimes|string|max:256',
        ]);

        $i->update($data);
        return response()->json($i);
    }

    public function destroy($id)
    {
        Inscripcion::destroy($id);
        return response()->noContent();
    }

    public function registrar(Request $request, $idcompetencia)
{
    // 1. Crear competidor
    $competidor = Competidor::create([
        'nombrecompetidor' => $request->nombres,
        'apellidocompetidor' => $request->apellidos,
        'emailcompetidor' => $request->correo,
        'cicompetidor' => $request->cedula,
        'fechanacimiento' => $request->nacimiento,
        'colegio' => $request->unidad,
        'curso' => $request->curso,
        'departamento' => $request->departamento,
        'provincia' => $request->provincia,
    ]);

    // 2. Crear inscripcion
    $inscripcion = Inscripcion::create([
        'idcompetencia' => $idcompetencia,
        'idcompetidor' => $competidor->idcompetidor,
        'estado_validacion' => 'valido',
        'estado_inscripcion' => 'enviado',
    ]);

    return response()->json([
        'mensaje' => 'Inscripción registrada exitosamente',
        'competidor_id' => $competidor->idcompetidor,
        'inscripcion_id' => $inscripcion->_inscripcion_id
    ]);
}
}
