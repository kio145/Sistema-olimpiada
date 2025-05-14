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
    $table->integer('idcajero')->unsigned();
    $table->foreign('idcajero')
          ->references('idcajero')
          ->on('cajero')           
          ->restrictOnDelete()
          ->restrictOnUpdate();

    $table->integer('id_competidor')->unsigned();
    $table->foreign('id_competidor')
          ->references('idcompetidor')
          ->on('competidor')
          ->restrictOnDelete()
          ->restrictOnUpdate();

    $table->integer('id_tutor')->unsigned();
    $table->foreign('id_tutor')
          ->references('idtutor')
          ->on('tutor')
          ->restrictOnDelete()
          ->restrictOnUpdate();

          $table->dateTime('fecha_emision');
    $table->integer('montototal');
    $table->timestamps();
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
