<?php

namespace App\Http\Controllers;

use App\Models\CompetidorTutor;
use Illuminate\Http\Request;

class CompetidorTutorController extends Controller
{
    public function index()
    {
        return response()->json(CompetidorTutor::all());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'idcompetencia' => 'required|integer|exists:competencia,idcompetencia',
            'idcompetidor'  => 'required|integer|exists:competidor,idcompetidor',
            'idtutor'       => 'required|integer|exists:tutor,idtutor',
            'tipo_tutor'    => 'nullable|string|max:256',
        ]);

        $pt = CompetidorTutor::create($data);
        return response()->json($pt, 201);
    }

    public function show($idcompetencia, $idcompetidor)
    {
        $pt = CompetidorTutor::where('idcompetencia',$idcompetencia)
             ->where('idcompetidor',$idcompetidor)
             ->firstOrFail();
        return response()->json($pt);
    }

    public function destroy($idcompetencia, $idcompetidor)
    {
        CompetidorTutor::where('idcompetencia',$idcompetencia)
            ->where('idcompetidor',$idcompetidor)
            ->delete();
        return response()->noContent();
    }
}
