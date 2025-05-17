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
            $table->increments('idcajero');
            $table->string('nombrecajero', 50)->nullable();
            $table->string('apellidocajero', 50)->nullable();
            $table->string('imagencajero', 50)->nullable();
            $table->timestamps();
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
