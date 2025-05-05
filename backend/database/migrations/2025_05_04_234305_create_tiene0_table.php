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
        Schema::create('tiene0', function (Blueprint $table) {
            $table->integer('idcompetidor')->unsigned();
            $table->integer('idcompetencia')->unsigned();
            $table->primary(['idcompetidor', 'idcompetencia']);
            $table->foreign('idcompetidor')
                  ->references('idcompetidor')->on('competidor')
                  ->restrictOnDelete()
                  ->restrictOnUpdate();
            $table->foreign('idcompetencia')
                  ->references('idcompetencia')->on('competencia')
                  ->restrictOnDelete()
                  ->restrictOnUpdate();
            $table->timestamps();
          });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tiene0');
    }
};
