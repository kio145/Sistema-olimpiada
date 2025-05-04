<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\competidorController;
//listar todos los competidores
Route::get('/competidor', [competidorController::class, 'listar']);
//obtener un competidor
Route::get('/competidor/{id}', [competidorController::class, 'show']);
//crear un competidor
Route::post('/competidor',[competidorController::class, 'crear']);
//editar todos los datos de un competidor
Route::put('/competidor/{id}', [competidorController::class, 'update']);
//editar algunos datos de un competidor 
Route::patch('/competidor/{id}', [competidorController::class, 'updatePartial']);
//eliminar un competidor
Route::delete('/competidor/{id}',[competidorController::class,'eliminar']);