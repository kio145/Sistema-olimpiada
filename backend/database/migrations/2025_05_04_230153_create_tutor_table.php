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
            $table->id('idtutor');
            $table->string('nombretutor', 50);
            $table->string('apellidotutor', 70);
            $table->string('tipotutor', 50)->nullable();
            $table->integer('telefonotutor')->nullable();
            $table->string('correotutor', 100);
            $table->integer('citutor')->nullable();
            $table->string('passwordtutor', 100);
            $table->binary('imagentutor')->nullable();
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
