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
            $table->id('idcajero');
            $table->string('nombrecajero', 50);
            $table->string('apellidocajero', 70);
            $table->string('passwordcajero', 100);
            $table->string('imagencajero', 100)->nullable();
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
