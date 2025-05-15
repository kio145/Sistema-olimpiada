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
    $table->id('idboleta'); // BIGINT UNSIGNED AUTO_INCREMENT

    $table->foreignId('idcajero')
          ->constrained('cajero','idcajero')
          ->restrictOnDelete()
          ->restrictOnUpdate();

    $table->foreignId('id_competidor')
          ->constrained('competidor','idcompetidor')
          ->restrictOnDelete()
          ->restrictOnUpdate();

    $table->foreignId('id_tutor')
          ->constrained('tutor','idtutor')
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
