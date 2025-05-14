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
        Schema::create('competidor', function (Blueprint $table) {
            $table->id('idcompetidor');
            $table->string('nombrecompetidor', 50);
            $table->string('apellidocompetidor', 70);
            $table->string('emailcompetidor', 100);
            $table->integer('cicompetidor')->nullable();
            $table->date('fechanacimiento')->nullable();
            $table->integer('telefonocompetidor')->nullable();
            $table->string('colegio', 100)->nullable();
            $table->string('curso', 50)->nullable();
            $table->string('departamento', 50)->nullable();
            $table->string('provincia', 50)->nullable();
            $table->string('passwordcompetidor', 100);
            $table->string('imagencompetidor', 100)->nullable();
            $table->timestamps();
         });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('competidor');
    }
};
