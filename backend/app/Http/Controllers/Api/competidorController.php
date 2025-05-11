<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Competidor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class competidorController extends Controller
{
    //listar todos los estudiantes
    public function listar(){
        $competidor = Competidor::all();
        if ($competidor->isEmpty()){
            $data =[
                'message' => 'No se encontraron estudiantes',
                'status' => 200
            ];
            return response()->json($data,200);
        }
        return response()->json($competidor,200);
    }

    //crear competidor
    public function crear(Request $request){
        $validator = Validator::make($request->all(), [
            'NOMBRECOMPETIDOR' => 'required',
            'APELLIDOCOMPETIDOR' => 'required',
            'EMAILCOMPETIDOR' => 'required|email|unique:competidor',
            'CICOMPETIDOR' => 'required|unique:competidor',
            'TELEFONOCOMPETIDOR' => 'required',
            'FECHANACIMIENTO' => 'required|date',
            'COLEGIO' => 'required',
            'CURSO' => 'required',
            'DEPARTAMENTO' => 'required',
            'PROVINCIA' => 'required',
            'IMAGENCOMPETIDOR' => 'nullable'
        ]);
    
        // Comprobar si la validación falla
        if ($validator->fails()) {
            $data = [
                'message'=> 'Error en la validación de datos',
                'errors' => $validator->errors(),
                'status' => 400
            ];
            return response()->json($data, 400);
        }
    
        // Crear el competidor solo si la validación pasó
        $competidor = Competidor::create([
            'NOMBRECOMPETIDOR' => $request->NOMBRECOMPETIDOR,
        'APELLIDOCOMPETIDOR' => $request->APELLIDOCOMPETIDOR,
        'EMAILCOMPETIDOR' => $request->EMAILCOMPETIDOR,
        'CICOMPETIDOR' => $request->CICOMPETIDOR,
        'TELEFONOCOMPETIDOR' => $request->TELEFONOCOMPETIDOR,
        'FECHANACIMIENTO' => $request->FECHANACIMIENTO,
        'COLEGIO' => $request->COLEGIO,
        'CURSO' => $request->CURSO,
        'DEPARTAMENTO' => $request->DEPARTAMENTO,
        'PROVINCIA' => $request->PROVINCIA,
        'IMAGENCOMPETIDOR' => $request->IMAGENCOMPETIDOR,
        ]);
    
        // Verificar si la creación fue exitosa
        if (!$competidor) {
            $data = [
                'message' => 'Error al crear el competidor',
                'status' => 500
            ];
            return response()->json($data, 500);
        }
    
        // Si la creación es exitosa
        $data = [
            'competidor' => $competidor,
            'status' => 200
        ];
        return response()->json($data, 200);
    }
    //funcion obtener un competidor
    public function show($id){
        $competidor = Competidor::find($id);
        
        if(!$competidor){
            $data = [
                'message' => 'Estudiante no enctontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $data = [
            'competidor' => $competidor,
            'status' => 200
        ];
        return response()->json($data, 200);
    }

    public function eliminar($id){
        $competidor = Competidor::find($id);

        if(!$competidor){
            $data =[
                'message' => 'Estudiante no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);  
        }

        $competidor->delete();

            $data =[
                'message' => 'Estudiante eliminado',
                'status' => 200
            ];
        return response()->json($data, 200);
    }

    public function update(Request $request, $id){
        $competidor = Competidor::find($id);

        if(!$competidor){
            $data =[
                'message' => 'Estudiante no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $validator = Validator::make($request->all(), [
            'NOMBRECOMPETIDOR' => 'required',
            'APELLIDOCOMPETIDOR' => 'required',
            'EMAILCOMPETIDOR' => 'required|email|unique:competidor',
            'CICOMPETIDOR' => 'required|unique:competidor',
            'TELEFONOCOMPETIDOR' => 'required',
            'FECHANACIMIENTO' => 'required|date',
            'COLEGIO' => 'required',
            'CURSO' => 'required',
            'DEPARTAMENTO' => 'required',
            'PROVINCIA' => 'required',
            'IMAGENCOMPETIDOR' => 'nullable'
        ]);

        if ($validator->fails()) {
            $data = [
                'message'=> 'Error en la validación de datos',
                'errors' => $validator->errors(),
                'status' => 400
            ];
            return response()->json($data, 400);
        }

        $competidor->NOMBRECOMPETIDOR = $request->NOMBRECOMPETIDOR;
        $competidor->APELLIDOCOMPETIDOR = $request->APELLIDOCOMPETIDOR;
        $competidor->EMAILCOMPETIDOR = $request->EMAILCOMPETIDOR;
        $competidor->CICOMPETIDOR = $request->CICOMPETIDOR;
        $competidor->TELEFONOCOMPETIDOR = $request->TELEFONOCOMPETIDOR;
        $competidor->FECHANACIMIENTO = $request->FECHANACIMIENTO;
        $competidor->COLEGIO = $request->COLEGIO;
        $competidor->CURSO = $request->CURSO;
        $competidor->DEPARTAMENTO = $request->DEPARTAMENTO;
        $competidor->PROVINCIA = $request->PROVINCIA;
        $competidor->IMAGENCOMPETIDOR = $request->IMAGENCOMPETIDOR;

        $competidor->save();
        
        $data = [
            'message'=> 'Estuadiante actualizado',
            'competidor' => $competidor,
            'status' => 200
        ];
        return response()->json($data, 200);
    }

    public function updatePartial(Request $request, $id){
        $competidor = Competidor::find($id);
        if(!$competidor){
            $data =[
                'message' => 'Estudiante no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $validator = Validator::make($request->all(), [
            'NOMBRECOMPETIDOR' => 'sometimes|required',
            'APELLIDOCOMPETIDOR' => 'sometimes|required',
            'EMAILCOMPETIDOR' => 'sometimes|required|email|unique:competidor',
            'CICOMPETIDOR' => 'sometimes|required|unique:competidor',
            'TELEFONOCOMPETIDOR' => 'sometimes|required',
            'FECHANACIMIENTO' => 'sometimes|required|date',
            'COLEGIO' => 'sometimes|required',
            'CURSO' => 'sometimes|required',
            'DEPARTAMENTO' => 'sometimes|required',
            'PROVINCIA' => 'sometimes|required',
            'IMAGENCOMPETIDOR' => 'nullable'
        ]);

        if ($validator->fails()) {
            $data = [
                'message'=> 'Error en la validación de datos',
                'errors' => $validator->errors(),
                'status' => 400
            ];
            return response()->json($data, 400);
        }

        // Actualizar solo los campos que fueron enviados en el request
        if ($request->has('NOMBRECOMPETIDOR')) {
            $competidor->NOMBRECOMPETIDOR = $request->NOMBRECOMPETIDOR;
        }  
        if ($request->has('APELLIDOCOMPETIDOR')) {
            $competidor->APELLIDOCOMPETIDOR = $request->APELLIDOCOMPETIDOR;
        }
        if ($request->has('EMAILCOMPETIDOR')) {
            $competidor->EMAILCOMPETIDOR = $request->EMAILCOMPETIDOR;
        }
        if ($request->has('CICOMPETIDOR')) {
            $competidor->CICOMPETIDOR = $request->CICOMPETIDOR;
        }
        if ($request->has('TELEFONOCOMPETIDOR')) {
            $competidor->TELEFONOCOMPETIDOR = $request->TELEFONOCOMPETIDOR;
        }
        if ($request->has('FECHANACIMIENTO')) {
            $competidor->FECHANACIMIENTO = $request->FECHANACIMIENTO;
        }
        if ($request->has('COLEGIO')) {
            $competidor->COLEGIO = $request->COLEGIO;
        }
        if ($request->has('CURSO')) {
            $competidor->CURSO = $request->CURSO;
        }
        if ($request->has('DEPARTAMENTO')) {
            $competidor->DEPARTAMENTO = $request->DEPARTAMENTO;
        }
        if ($request->has('PROVINCIA')) {
            $competidor->PROVINCIA = $request->PROVINCIA;
        }
        if ($request->has('IMAGENCOMPETIDOR')) {
            $competidor->IMAGENCOMPETIDOR = $request->IMAGENCOMPETIDOR;
        }
        $competidor->save();
        
        $data = [
            'message'=> 'Estuadiante actualizado',
            'competidor' => $competidor,
            'status' => 200
        ];
        return response()->json($data, 200);
    }
}
