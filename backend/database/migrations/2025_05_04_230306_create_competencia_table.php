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
            $table->integer('idcompetencia')->unsigned()->primary();
            $table->integer('idadmi')->unsigned();
            $table->foreign('idadmi')
                  ->references('idadmi')
                  ->on('administrador')  
                  ->restrictOnDelete()
                  ->restrictOnUpdate();      
            $table->string('areacompetencia', 100);
            $table->string('nivelcompetencia', 50);
            $table->integer('preciocompetencia');
            $table->string('estadocompetencia', 100);
            $table->date('fechainicompetencia');
            $table->date('fechafincompetencia');
            $table->date('fechainiinscripcion');
            $table->date('fechafininscripcion');
            $table->date('fechainipago');
            $table->date('fechafinpago');
            $table->date('fechainivalidacion');
            $table->date('fechafinvalidacion');
            $table->string('descripcion', 250)->nullable();
            $table->binary('imagencompetencia')->nullable();
            $table->timestamps();
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
