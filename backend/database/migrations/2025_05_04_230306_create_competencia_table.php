<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('competencia', function (Blueprint $table) {
            $table->id('idcompetencia'); 
            
            $table->foreignId('idadmi')
                  ->constrained('administrador', 'idadmi')
                  ->restrictOnDelete()
                  ->restrictOnUpdate();
                  
            $table->string('nombrecompetencia', 100);
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

    public function down(): void
    {
        Schema::dropIfExists('competencia');
    }
};