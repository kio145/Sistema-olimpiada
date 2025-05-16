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
        Schema::create('competidor_tutores', function (Blueprint $table) {
            $table->integer('idcompetencia')->nullable();
            $table->integer('idcompetidor')->nullable();
            $table->integer('idtutor')->nullable();
            $table->string('tipo_tutor', 256)->nullable();

            $table->foreign('idcompetencia')->references('idcompetencia')->on('competencia')
                ->onDelete('restrict')->onUpdate('restrict');
            $table->foreign('idcompetidor')->references('idcompetidor')->on('competidor')
                ->onDelete('restrict')->onUpdate('restrict');
            $table->foreign('idtutor')->references('idtutor')->on('tutor')
                ->onDelete('restrict')->onUpdate('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('competidor_tutores');
    }
};
