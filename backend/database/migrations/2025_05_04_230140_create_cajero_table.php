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
        Schema::create('cajero', function (Blueprint $table) {
            $table->integer('idcajero')->unsigned()->primary();
            $table->string('nombrecajero', 50);
            $table->string('apellidocajero', 70);
            $table->string('imagencajero', 100)->nullable();
            $table->timestamps();
            $table->string('usuariocajero', 50);
            $table->string('contraseniacajero', 50);
         });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cajero');
    }
};
