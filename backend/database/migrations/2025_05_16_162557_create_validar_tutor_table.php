<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('validar_tutor', function (Blueprint $table) {
             
             $table->increments('validar_id');
    $table->unsignedInteger('idcompetencia')->nullable();
    $table->unsignedInteger('idcompetidor')->nullable();
    $table->unsignedInteger('idtutor')->nullable();

    $table->string('tipo_tutor', 100)->nullable();
    $table->string('estado_validacion', 150)->nullable();
    $table->string('motivo_rechazo', 255)->nullable();

    // Índices para optimizar y clave foránea
    $table->index('idcompetencia');
    $table->index('idcompetidor');
    $table->index('idtutor');

    // Foreign keys: una sola vez por cada columna
    $table->foreign('idcompetencia')->references('idcompetencia')->on('competencia')
          ->onDelete('cascade')->onUpdate('cascade');
    $table->foreign('idcompetidor')->references('idcompetidor')->on('competidor')
          ->onDelete('restrict')->onUpdate('restrict');
    $table->foreign('idtutor')->references('idtutor')->on('tutor')
          ->onDelete('restrict')->onUpdate('restrict');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('validar_tutor');
    }
};
