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
        Schema::create('reporte', function (Blueprint $table) {
            $table->increments('idreporte');
            $table->integer('idadmi')->unsigned();
            $table->foreign('idadmi')
                  ->references('idadmi')
                  ->on('administrador')  
                  ->restrictOnDelete()
                  ->restrictOnUpdate();  
            $table->string('tiporeporte', 50);
            $table->dateTime('fechareporte');
            $table->string('detalles', 250)->nullable();
            $table->timestamps();
         });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reporte');
    }
};
