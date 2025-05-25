<?php

namespace App\Http\Controllers;

use App\Models\ValidacionTutor;
use Illuminate\Http\Request;

class ValidacionTutorController extends Controller
{
    public function index()
    {
        return response()->json(ValidacionTutor::all());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            //'validacion_id_'  => 'required|integer|unique:validaciones_tutor,validacion_id_',
            'idtutor'         => 'required|integer|exists:tutor,idtutor',
            'idcompetidor'    => 'required|integer|exists:competidor,idcompetidor',
            'estado_validacion'=> 'nullable|string|max:256',
            'motivo_rechazo'  => 'nullable|string|max:256',
        ]);

        $v = ValidacionTutor::create($data);
        return response()->json($v, 201);
    }

    public function show($id)
    {
        return response()->json(ValidacionTutor::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $v = ValidacionTutor::findOrFail($id);
        $data = $request->validate([
            'estado_validacion'=> 'sometimes|string|max:256',
            'motivo_rechazo'  => 'sometimes|string|max:256',
        ]);

        $v->update($data);
        return response()->json($v);
    }

    public function destroy($id)
    {
        ValidacionTutor::destroy($id);
        return response()->noContent();
    }
}

