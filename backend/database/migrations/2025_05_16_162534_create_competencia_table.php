<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('competencia', function (Blueprint $table) {
            // Si quieres auto-increment:
            $table->increments('idcompetencia');
            //$table->integer('idcompetencia')->primary();

            // Campo de administrador (nullable si no siempre hay uno)
            $table->unsignedInteger('idadmi')->nullable();

            $table->string('areacompetencia', 50)->nullable();
            $table->string('nivelcompetencia', 50)->nullable();
            $table->integer('preciocompetencia')->nullable();
            $table->string('descripcion', 250)->nullable();
            $table->string('imagencompetencia', 50)->nullable();

            // si quieres created_at / updated_at:
            $table->timestamps();

            // Índice explícito (opcional)
            $table->index('idadmi');

            // Llave foránea
            $table->foreign('idadmi')
                  ->references('idadmi')
                  ->on('administrador')
                  ->onDelete('restrict')
                  ->onUpdate('restrict');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('competencia');
    }
};
