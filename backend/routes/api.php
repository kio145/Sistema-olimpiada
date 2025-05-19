<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdministradorController;
use App\Http\Controllers\BoletaPagoController;
use App\Http\Controllers\CajeroController;
use App\Http\Controllers\TutorController;
use App\Http\Controllers\CompetidorController;
use App\Http\Controllers\CompetenciaController;
use App\Http\Controllers\FechaController;
use App\Http\Controllers\InscripcionController;
use App\Http\Controllers\RequisitoCompetenciaController;
use App\Http\Controllers\CompetidorTutorController;
use App\Http\Controllers\ValidacionTutorController;
use App\Http\Controllers\Auth\LoginController;


//Administradores
Route::apiResource('administradores', AdministradorController::class);
//para creacion de competencia
Route::get('competencias', [CompetenciaController::class, 'index']);
Route::post('competencias', [CompetenciaController::class, 'store']);

//Cajeros
Route::apiResource('cajeros', CajeroController::class);

//Perfil Tutores
Route::apiResource('tutores', TutorController::class)->only(['index','show','update','store','destroy']);
  // Obtener el perfil del tutor que está logueado
Route::middleware('auth:sanctum')->group(function(){
    Route::get('tutores/me',       [TutorController::class, 'me']);
    Route::put('tutores/me',       [TutorController::class, 'updateMe']);
});
  // (Por si acaso) Obtener el perfil de cualquier tutor por su ID
    Route::get('tutores/{id}', [TutorController::class, 'show']);

//Competidores
Route::apiResource('competidores', CompetidorController::class);
Route::get('competidores/{id}', [CompetidorController::class, 'show']);

//Competencias
Route::apiResource('competencias', CompetenciaController::class);

//Fechas
Route::apiResource('fechas', FechaController::class);

//Inscripciones
Route::apiResource('inscripciones', InscripcionController::class)
     ->only(['index','store','show','update','destroy']);
//Requisitos-competencia
Route::apiResource('requisitos-competencia', RequisitoCompetenciaController::class);

//Relacion competidores-tutores
Route::apiResource('competidor-tutores', CompetidorTutorController::class)
     ->only(['index', 'store', 'show', 'destroy']);

//Validaciones de tutor a competidor
Route::apiResource('validaciones-tutor', ValidacionTutorController::class);
Route::post('login', [LoginController::class, 'login']);

//boleta de pago
Route::apiResource('boleta-pagos', BoletaPagoController::class);



