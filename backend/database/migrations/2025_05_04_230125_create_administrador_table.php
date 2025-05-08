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
        Schema::create('administrador', function (Blueprint $table) {
            $table->integer('idadmi')->unsigned()->primary();
            $table->string('nombreadmi', 50);
            $table->string('apellidoadmi', 70);
            $table->string('correoadmi', 100);
            $table->string('imagenadmi', 100)->nullable();
            $table->timestamps();          
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('administrador');
    }
};
