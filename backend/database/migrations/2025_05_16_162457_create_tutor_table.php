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
        Schema::create('tutor', function (Blueprint $table) {
            $table->increments('idtutor');
            $table->string('nombretutor', 50)->nullable();
            $table->string('apellidotutor', 50)->nullable();
            $table->string('area', 50)->nullable();
            $table->integer('telefonotutor')->nullable();
            $table->string('correotutor', 50)->nullable();
            $table->integer('citutor')->nullable();
            $table->string('imagentutor', 50)->nullable();
            $table->timestamps();

        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tutor');
    }
};
