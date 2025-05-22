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
        Schema::create('requisitos_competencia', function (Blueprint $table) {
            $table->increments('requisito_id');
            $table->unsignedInteger('idcompetencia')->nullable();
            $table->string('curso', 50)->nullable();
            $table->timestamps();

            $table->foreign('idcompetencia')->references('idcompetencia')->on('competencia')
                ->onDelete('restrict')->onUpdate('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('requisitos_competencia');
    }
};
