<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('boleta_pago_inscripcion', function (Blueprint $table) {
            $table->unsignedInteger('idboleta');
            $table->unsignedInteger('_inscripcion_id');

            $table->timestamps();

            $table->foreign('idboleta')->references('idboleta')->on('boleta_pago')->onDelete('cascade');
            $table->foreign('_inscripcion_id')->references('_inscripcion_id')->on('inscripciones')->onDelete('restrict');
        });
    }
    
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('boleta_pago_inscripcion');
    }
};
