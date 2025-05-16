<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdministradorController;
use App\Http\Controllers\CajeroController;
use App\Http\Controllers\TutorController;
use App\Http\Controllers\CompetidorController;
use App\Http\Controllers\CompetenciaController;
use App\Http\Controllers\FechaController;
use App\Http\Controllers\InscripcionController;
use App\Http\Controllers\RequisitoCompetenciaController;
use App\Http\Controllers\CompetidorTutorController;
use App\Http\Controllers\ValidacionTutorController;



Route::apiResource('administradores', AdministradorController::class);
Route::apiResource('cajeros', CajeroController::class);
Route::apiResource('tutores', TutorController::class);
Route::apiResource('competidores', CompetidorController::class);
Route::apiResource('competencias', CompetenciaController::class);
Route::apiResource('fechas', FechaController::class);
Route::apiResource('inscripciones', InscripcionController::class);
Route::apiResource('requisitos-competencia', RequisitoCompetenciaController::class);
Route::apiResource('competidor-tutores', CompetidorTutorController::class)
     ->only(['index','store','show','destroy']);
Route::apiResource('validaciones-tutor', ValidacionTutorController::class);
