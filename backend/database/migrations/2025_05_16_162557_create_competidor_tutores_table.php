<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('competidor_tutores', function (Blueprint $table) {
            // Coincidir con increments() de competencia
            $table->unsignedInteger('idcompetencia')->nullable();

            // Si en competidor usaste increments(): es unsigned
            $table->unsignedInteger('idcompetidor')->nullable();

            // Si en tutor usaste increments(): es unsigned
            $table->unsignedInteger('idtutor')->nullable();

            $table->string('tipo_tutor', 256)->nullable();

            // Índices para optimizar y clave foránea
            $table->index('idcompetencia');
            $table->index('idcompetidor');
            $table->index('idtutor');

            $table->foreign('idcompetencia')
                  ->references('idcompetencia')
                  ->on('competencia')
                  ->onDelete('restrict')
                  ->onUpdate('restrict');

            $table->foreign('idcompetidor')
                  ->references('idcompetidor')
                  ->on('competidor')
                  ->onDelete('restrict')
                  ->onUpdate('restrict');

            $table->foreign('idtutor')
                  ->references('idtutor')
                  ->on('tutor')
                  ->onDelete('restrict')
                  ->onUpdate('restrict');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('competidor_tutores');
    }
};
