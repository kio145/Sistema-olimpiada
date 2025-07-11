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
        Schema::create('inscripciones', function (Blueprint $table) {
            $table->increments('_inscripcion_id');
            $table->unsignedInteger('idcompetencia')->nullable();
            $table->unsignedInteger('idcompetidor')->nullable();
            $table->string('estado_inscripcion', 256)->nullable();
            $table->timestamps();

            $table->foreign('idcompetencia')->references('idcompetencia')->on('competencia')
                ->onDelete('restrict')->onUpdate('restrict');
            $table->foreign('idcompetidor')->references('idcompetidor')->on('competidor')
                ->onDelete('restrict')->onUpdate('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inscripciones');
    }
};
