<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdministradorController;
use App\Http\Controllers\CajeroController;
use App\Http\Controllers\TutorController;
use App\Http\Controllers\CompetidorController;
use App\Http\Controllers\CompetenciaController;
use App\Http\Controllers\ReporteController;
use App\Http\Controllers\BoletaPagoController;

Route::apiResource('administradores', AdministradorController::class);
Route::apiResource('cajeros', CajeroController::class);
Route::apiResource('tutores', TutorController::class);
Route::apiResource('competidores', CompetidorController::class);
Route::apiResource('competencias', CompetenciaController::class);
Route::apiResource('reportes', ReporteController::class);
Route::apiResource('boletas-pago', BoletaPagoController::class);





Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

