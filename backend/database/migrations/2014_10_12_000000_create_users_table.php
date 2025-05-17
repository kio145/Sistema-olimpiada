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
        Schema::create('users', function (Blueprint $table) {
            $table->id();                           // bigint unsigned auto‐increment
            $table->string('name');                 // nombre completo
            $table->string('email')->unique();      // correo
            $table->string('password');             // contraseña Hasheada
            $table->enum('role', [                  // para saber a qué “perfil” pertenece
                'administrador',
                'competidor',
                'tutor',
                'cajero'
            ]);
            $table->unsignedBigInteger('profile_id')->nullable();   // id en la tabla de perfil
            $table->string('profile_type')->nullable();             // el modelo: App\Models\Administrador, etc.
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
