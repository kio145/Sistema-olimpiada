<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('administrador', function (Blueprint $table) {
            $table->integer('idadmi')->primary();
            $table->string('nombreadmi', 50)->nullable();
            $table->string('apellidoadmi', 70)->nullable();
            $table->string('correoadmi', 100)->nullable();
            $table->string('imagenadmi', 50)->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('administrador');
    }
};
