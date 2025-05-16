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
        Schema::create('boleta_pago', function (Blueprint $table) {
            $table->integer('idboleta')->primary();
            $table->integer('idcajero')->nullable();
            $table->integer('idcompetidor')->nullable();
            $table->integer('id_competidor')->nullable();
            $table->date('fecha_emision')->nullable();
            $table->integer('montototal')->nullable();
            $table->integer('id_tutor')->nullable();
            $table->timestamps();

            $table->foreign('idcajero')->references('idcajero')->on('cajero')
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
        Schema::dropIfExists('boleta_pago');
    }
};
