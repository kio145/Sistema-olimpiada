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
use App\Http\Controllers\ValidarTutorController;
use App\Http\Controllers\Auth\LoginController;

//Cajeros
Route::apiResource('cajeros', CajeroController::class);
Route::get('cajeros/{id}', [CajeroController::class, 'show']);
Route::put('cajeros/{id}', [CajeroController::class, 'update']);

//Tutores
Route::apiResource('tutores', TutorController::class);
Route::get('tutores/{id}', [TutorController::class, 'show']);
Route::put('tutores/{id}', [TutorController::class, 'update']);

//Competidores
Route::apiResource('competidores', CompetidorController::class);
Route::get('competidores/{id}', [CompetidorController::class, 'show']);
Route::put('competidores/{id}', [CompetidorController::class, 'update']);

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
Route::apiResource('validarTutor', ValidarTutorController::class)
     ->only(['index', 'store', 'show','update', 'destroy']);

Route::middleware('auth:sanctum')->group(function () {

  //Competidores
  Route::get('competidores/{id}', [CompetidorController::class, 'show']);
  Route::put('competidores/{id}', [CompetidorController::class, 'update']);

  //Competencias
  Route::apiResource('competencias', CompetenciaController::class);


  //Fechas
  Route::apiResource('fechas', FechaController::class);

  //Inscripciones
  Route::apiResource('inscripciones', InscripcionController::class)
    ->only(['index', 'store', 'show', 'update', 'destroy']);
  //Requisitos-competencia
  Route::apiResource('requisitos-competencia', RequisitoCompetenciaController::class);

  //Relacion competidores-tutores
  Route::apiResource('competidor-tutores', CompetidorTutorController::class)
    ->only(['index', 'store', 'show', 'destroy']);

  //boleta de pago
  Route::apiResource('boleta-pagos', BoletaPagoController::class);
});
