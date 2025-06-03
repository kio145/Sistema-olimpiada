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

Route::post('login', [LoginController::class, 'login']);
  Route::get('competencias/todas', [CompetenciaController::class, 'getTodasLasCompetencias']);
  Route::apiResource('competidores', CompetidorController::class);


Route::middleware('auth:sanctum')->group(function () {
  //Administradores
  Route::apiResource('administradores', AdministradorController::class);

  //Cajeros
  Route::apiResource('cajeros', CajeroController::class);

  //Perfil Tutores
  Route::apiResource('tutores', TutorController::class)->only(['index', 'show', 'update', 'store', 'destroy']);
  // Obtener el perfil del tutor que está logueado

  Route::get('tutores/me',       [TutorController::class, 'me']);
  Route::put('tutores/me',       [TutorController::class, 'updateMe']);

  // (Por si acaso) Obtener el perfil de cualquier tutor por su ID
  Route::get('tutores/{id}', [TutorController::class, 'show']);

  //Competidores
  Route::get('competidores/{id}', [CompetidorController::class, 'show']);
  Route::put('competidores/{id}', [CompetidorController::class, 'update']);
  Route::get('competidores/me', [CompetidorController::class, 'me']);

  //Competencias
  Route::apiResource('competencias', CompetenciaController::class);

  //Fechas
  Route::apiResource('fechas', FechaController::class);

  // Nuevo endpoint para creación automática de competidor + inscripción
Route::post('inscripciones/competidor', [InscripcionController::class, 'storeCompetidor']);

  //Inscripciones
  Route::apiResource('inscripciones', InscripcionController::class)
    ->only(['index', 'store', 'show', 'update', 'destroy']);
  //Requisitos-competencia
  Route::apiResource('requisitos-competencia', RequisitoCompetenciaController::class);

  //Relacion competidores-tutores
  Route::apiResource('validarTutor', ValidarTutorController::class)
     ->only(['index', 'store', 'show','update', 'destroy']);

  //boleta de pago
  Route::apiResource('boleta-pagos', BoletaPagoController::class);
});

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

Route::apiResource('boleta-pagos', BoletaPagoController::class);
Route::get('boleta/habilitados', [BoletaPagoController::class, 'habilitados']);
