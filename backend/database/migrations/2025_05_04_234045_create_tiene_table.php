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
        Schema::create('tiene', function (Blueprint $table) {
            $table->integer('idtutor')->unsigned();
            $table->integer('idcompetidor')->unsigned();
            $table->primary(['idtutor', 'idcompetidor']);
            $table->foreign('idtutor')
                  ->references('idtutor')
                  ->on('tutor')
                  ->restrictOnDelete()
                  ->restrictOnUpdate();
            $table->foreign('idcompetidor')
                  ->references('idcompetidor')
                  ->on('competidor')
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
        Schema::dropIfExists('tiene');
    }
};
