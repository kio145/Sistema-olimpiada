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
        Schema::create('validaciones_tutor', function (Blueprint $table) {
            $table->integer('validacion_id_')->primary();
            $table->unsignedInteger('idtutor')->nullable();
            $table->unsignedInteger('idcompetidor')->nullable();
            $table->string('estado_validacion', 256)->nullable();
            $table->string('motivo_rechazo', 256)->nullable();
            $table->timestamps();

            $table->foreign('idtutor')->references('idtutor')->on('tutor')
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
        Schema::dropIfExists('validaciones_tutor');
    }
};
