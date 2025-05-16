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
            $table->integer('idcompetidor')->primary();
            $table->string('nombrecompetidor', 50)->nullable();
            $table->string('apellidocompetidor', 50)->nullable();
            $table->string('emailcompetidor', 50)->nullable();
            $table->integer('cicompetidor')->nullable();
            $table->date('fechanacimiento')->nullable();
            $table->integer('telefonocompetidor')->nullable();
            $table->string('colegio', 50)->nullable();
            $table->string('curso', 50)->nullable();
            $table->string('departamento', 50)->nullable();
            $table->string('provincia', 50)->nullable();
            $table->string('imagencompetidor', 50)->nullable();
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
