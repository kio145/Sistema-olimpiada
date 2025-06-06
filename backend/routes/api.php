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

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::post('login', [LoginController::class, 'login']);

// Rutas públicas (sin middleware)
Route::get('competencias/todas', [CompetenciaController::class, 'getTodasLasCompetencias']);

// ------------------------------------------------------------
// RUTA FIJA: Competidores habilitados (debe ir ANTES de /competidores/{id})
// ------------------------------------------------------------
Route::middleware('auth:sanctum')->group(function () {
     Route::get(
        'competidores/habilitados-cajero',
        [CompetidorController::class, 'habilitadosParaCajero']
    );
    Route::get('competidores/habilitados', [CompetidorController::class, 'habilitados']);

    // Rutas “/competidores/me”
    Route::get('competidores/me', [CompetidorController::class, 'me']);

    // Rutas genéricas “/competidores/{id}”
    Route::get('competidores/{id}', [CompetidorController::class, 'show']);
    Route::put('competidores/{id}', [CompetidorController::class, 'update']);
    Route::delete('competidores/{id}', [CompetidorController::class, 'destroy']);

    // POST /competidores
    Route::post('competidores', [CompetidorController::class, 'store']);

    // ------------------------------------------------------------
    // Rutas de TUTORES
    // ------------------------------------------------------------
    Route::get('tutores/me', [TutorController::class, 'me']);
    Route::put('tutores/me', [TutorController::class, 'updateMe']);
    Route::get('tutores/{id}', [TutorController::class, 'show']);
    Route::post('tutores', [TutorController::class, 'store']);
    Route::put('tutores/{id}', [TutorController::class, 'update']);
    Route::delete('tutores/{id}', [TutorController::class, 'destroy']);

    // ------------------------------------------------------------
    // Rutas de CAJEROS
    // ------------------------------------------------------------
    Route::get('cajeros/me', [CajeroController::class, 'me']);
    Route::get('cajeros/{id}', [CajeroController::class, 'show']);
    Route::post('cajeros', [CajeroController::class, 'store']);
    Route::put('cajeros/{id}', [CajeroController::class, 'update']);
    Route::delete('cajeros/{id}', [CajeroController::class, 'destroy']);
    Route::get('competidores/ci/{ci}', [CompetidorController::class, 'showByCi']);
   


    // ------------------------------------------------------------
    // Rutas de VALIDAR TUTOR (pivot)
    // ------------------------------------------------------------
    // "/api/validarTutor" (index, store, show, update, destroy)
    Route::post('validarTutor', [ValidarTutorController::class, 'store']);
    Route::get('validarTutor', [ValidarTutorController::class, 'index']);
    Route::get('validarTutor/{validar_id}', [ValidarTutorController::class, 'show']);
    Route::put('validarTutor/{validar_id}', [ValidarTutorController::class, 'update']);
    Route::delete('validarTutor/{validar_id}', [ValidarTutorController::class, 'destroy']);

    // ------------------------------------------------------------
    // Rutas de INSCRIPCIONES
    // ------------------------------------------------------------
    Route::post('inscripciones/competidor', [InscripcionController::class, 'storeCompetidor']);
    Route::get('inscripciones', [InscripcionController::class, 'index']);
    Route::post('inscripciones', [InscripcionController::class, 'store']);
    Route::get('inscripciones/{id}', [InscripcionController::class, 'show']);
    Route::put('inscripciones/{id}', [InscripcionController::class, 'update']);
    Route::delete('inscripciones/{id}', [InscripcionController::class, 'destroy']);

    // ------------------------------------------------------------
    // Rutas de COMPETENCIAS
    // ------------------------------------------------------------
    Route::apiResource('competencias', CompetenciaController::class);

    // ------------------------------------------------------------
    // Rutas de FECHAS
    // ------------------------------------------------------------
    Route::apiResource('fechas', FechaController::class);

    // ------------------------------------------------------------
    // Rutas de REQUISITOS COMPETENCIA
    // ------------------------------------------------------------
    Route::apiResource('requisitos-competencia', RequisitoCompetenciaController::class);

    // ------------------------------------------------------------
    // Rutas de BOLETA DE PAGO
    // ------------------------------------------------------------
    Route::apiResource('boleta-pagos', BoletaPagoController::class);
});

// Endpoints públicos para Competidores, TAreas, etc. fuera del auth
Route::middleware('auth:sanctum')->group(function () {
    // (Si necesitas duplicar alguna ruta fuera del grupo, puedes ponerla aquí)
});

// Puedes dejar rutas públicas de recursos sin autenticación aquí, si las necesitas:
Route::apiResource('administradores', AdministradorController::class);
    Route::get('validarTutor', [ValidarTutorController::class, 'index']);
    Route::get('validarTutor/{validar_id}', [ValidarTutorController::class, 'show']);
    Route::put('validarTutor/{validar_id}', [ValidarTutorController::class, 'update']);
    Route::delete('validarTutor/{validar_id}', [ValidarTutorController::class, 'destroy']);