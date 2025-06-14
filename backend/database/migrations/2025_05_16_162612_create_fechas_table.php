<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('fechas', function (Blueprint $table) {
            $table->increments('idfecha');
            $table->date('fecha_inicio_competencia')->nullable();
            $table->date('fecha_fin_competencia')->nullable();
            $table->date('fecha_inicio_inscripcion')->nullable();
            $table->date('fecha_fin_inscripcion')->nullable();
            $table->date('fecha_inicio_validacion')->nullable();
            $table->date('fecha_fin_validacion')->nullable();
            $table->date('fecha_inicio_pago')->nullable();
            $table->date('fecha_fin_pago')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('fechas');
    }
};
