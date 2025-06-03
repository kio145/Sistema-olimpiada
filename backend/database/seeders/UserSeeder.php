<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

// Importa los modelos de perfil
use App\Models\Administrador;
use App\Models\Cajero;
use App\Models\Tutor;
use App\Models\Competidor;

// Importa el modelo User
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        //
        // 1) Creo el perfil de administrador
        //
        $adminPerfil = Administrador::create([
            'nombreadmi'   => 'Admin',
            'apellidoadmi' => 'Principal',
            'correoadmi'   => 'admin@gmail.com',
            'passwordadmi' => Hash::make('cifrado123'),
            // 'imagenadmi' => null
        ]);

        //
        // 2) Ahora creo el User y apunto al perfil anterior
        //
        User::create([
            'name'         => $adminPerfil->nombreadmi . ' ' . $adminPerfil->apellidoadmi,
            'email'        => 'admin@gmail.com',
            'password'     => Hash::make('cifrado123'),
            'role'         => 'administrador',
            'profile_id'   => $adminPerfil->idadmi,
            'profile_type' => Administrador::class,
        ]);


        //
        // Repite lo mismo para Cajero, Tutor y Competidor
        //
        $cajeroPerfil = Cajero::create([
            'nombrecajero'   => 'Juan',
            'apellidocajero' => 'Pérez',
            'imagencajero'   => null,
        ]);
        User::create([
            'name'         => $cajeroPerfil->nombrecajero . ' ' . $cajeroPerfil->apellidocajero,
            'email'        => 'cajero@gmail.com',
            'password'     => Hash::make('cifrado123'),
            'role'         => 'cajero',
            'profile_id'   => $cajeroPerfil->idcajero,
            'profile_type' => Cajero::class,
        ]);

        $tutorPerfil = Tutor::create([
            'nombretutor'   => 'María',
            'apellidotutor' => 'González',
            'area'          => 'Matemáticas',
            'telefonotutor' => 123456789,
            'correotutor'   => 'tutor@gmail.com',
            'citutor'       => 87654321,
            'imagentutor'   => null,
        ]);
        User::create([
            'name'         => $tutorPerfil->nombretutor . ' ' . $tutorPerfil->apellidotutor,
            'email'        => 'tutor@gmail.com',
            'password'     => Hash::make('cifrado123'),
            'role'         => 'tutor',
            'profile_id'   => $tutorPerfil->idtutor,
            'profile_type' => Tutor::class,
        ]);

        $competidorPerfil = Competidor::create([
            'nombrecompetidor'  => 'Luis',
            'apellidocompetidor'=> 'Ramírez',
            'emailcompetidor'   => 'competidor@gmail.com',
            'cicompetidor'      => 1234567,
            'fechanacimiento'   => now()->subYears(20)->toDateString(),
            'telefonocompetidor'=> 987654321,
            'colegio'           => 'Colegio X',
            'curso'             => 'Quinto',
            'departamento'      => 'La Paz',
            'provincia'         => 'Murillo',
            'imagencompetidor'  => null,
        ]);
        User::create([
            'name'         => $competidorPerfil->nombrecompetidor . ' ' . $competidorPerfil->apellidocompetidor,
            'email'        => 'competidor@gmail.com',
            'password'     => Hash::make('cifrado123'),
            'role'         => 'competidor',
            'profile_id'   => $competidorPerfil->idcompetidor,
            'profile_type' => Competidor::class,
        ]);
    }
}
