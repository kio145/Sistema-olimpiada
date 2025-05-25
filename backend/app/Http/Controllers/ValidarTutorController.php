<?php

namespace App\Http\Controllers;

use App\Models\ValidarTutor;
use Illuminate\Http\Request;

class ValidarTutorController extends Controller
{
    public function index()
    {
        return response()->json(ValidarTutor::all());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'idcompetencia' => 'required|integer|exists:competencia,idcompetencia',
            'idcompetidor'  => 'required|integer|exists:competidor,idcompetidor',
            'idtutor'       => 'required|integer|exists:tutor,idtutor',
            'tipo_tutor'    => 'nullable|string|max:256',
            'estado_validacion'=> 'nullable|string|max:256',
            'motivo_rechazo'  => 'nullable|string|max:256',
        ]);

        $pt = ValidarTutor::create($data);
        return response()->json($pt, 201);
    }

    public function show($idcompetencia, $idcompetidor)
    {
        $pt = ValidarTutor::where('idcompetencia',$idcompetencia)
             ->where('idcompetidor',$idcompetidor)
             ->firstOrFail();
        return response()->json($pt);
    }

    public function destroy($idcompetencia, $idcompetidor)
    {
        ValidarTutor::where('idcompetencia',$idcompetencia)
            ->where('idcompetidor',$idcompetidor)
            ->delete();
        return response()->noContent();
    }
}
