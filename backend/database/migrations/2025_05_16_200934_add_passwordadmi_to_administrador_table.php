<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('administrador', function (Blueprint $table) {
            // Ajusta el tamaño según tus necesidades
            $table->string('passwordadmi', 100)->after('correoadmi')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('administrador', function (Blueprint $table) {
            $table->dropColumn('passwordadmi');
        });
    }
};
