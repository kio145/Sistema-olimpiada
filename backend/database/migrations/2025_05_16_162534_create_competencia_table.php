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
        Schema::create('competencia', function (Blueprint $table) {
            $table->integer('idcompetencia')->primary();
            $table->integer('idadmi')->nullable();
            $table->string('areacompetencia', 50)->nullable();
            $table->string('nivelcompetencia', 50)->nullable();
            $table->integer('preciocompetencia')->nullable();
            $table->string('descripcion', 250)->nullable();
            $table->string('imagencompetencia', 50)->nullable();
            $table->timestamps();

            $table->foreign('idadmi')->references('idadmi')->on('administrador')
                ->onDelete('restrict')->onUpdate('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('competencia');
    }
};
