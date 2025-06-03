<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('competidor', function (Blueprint $table) {
            $table->increments('idcompetidor');
            $table->string('nombrecompetidor', 50)->nullable();
            $table->string('apellidocompetidor', 50)->nullable();
            $table->string('emailcompetidor', 100)->nullable();
            $table->integer('cicompetidor')->nullable();
            $table->date('fechanacimiento')->nullable();
            $table->string('telefonocompetidor', 20)->nullable();
            $table->string('colegio', 100)->nullable();
            $table->string('curso', 50)->nullable();
            $table->string('departamento', 50)->nullable();
            $table->string('provincia', 50)->nullable();
            $table->string('imagencompetidor', 100)->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('competidor');
    }
};
