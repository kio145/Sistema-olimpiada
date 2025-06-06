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
        // 0) Si ya existe un administrador con ese email, no lo creamos de nuevo
        //
        if (!User::where('email', 'admin@gmail.com')->exists()) {
            $adminPerfil = Administrador::create([
                'nombreadmi'   => 'Admin',
                'apellidoadmi' => 'Principal',
                'correoadmi'   => 'admin@gmail.com',
                'passwordadmi' => Hash::make('cifrado123'),
                // 'imagenadmi' => null
            ]);

            User::create([
                'name'         => $adminPerfil->nombreadmi . ' ' . $adminPerfil->apellidoadmi,
                'email'        => 'admin@gmail.com',
                'password'     => Hash::make('cifrado123'),
                'role'         => 'administrador',
                'profile_id'   => $adminPerfil->idadmi,
                'profile_type' => Administrador::class,
            ]);
        }

        //
        // 1) Cajero
        //
        if (!User::where('email', 'cajero@gmail.com')->exists()) {
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
        }

        //
        // 2) Un tutor inicial
        //
        if (!User::where('email', 'tutor@gmail.com')->exists()) {
            $tutorPerfil = Tutor::create([
                'nombretutor'   => 'María',
                'apellidotutor' => 'González',
                'area'          => 'Matemáticas',
                'telefonotutor' => '123456789',
                'correotutor'   => 'tutor@gmail.com',
                'citutor'       => '87654321',
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
        }

        //
        // 3) Competidor inicial
        //
        if (!User::where('email', 'competidor@gmail.com')->exists()) {
            $competidorPerfil = Competidor::create([
                'nombrecompetidor'   => 'Luis',
                'apellidocompetidor' => 'Ramírez',
                'emailcompetidor'    => 'competidor@gmail.com',
                'cicompetidor'       => '1234567',
                'fechanacimiento'    => now()->subYears(20)->toDateString(),
                'telefonocompetidor' => '987654321',
                'colegio'            => 'Colegio X',
                'curso'              => 'Quinto',
                'departamento'       => 'La Paz',
                'provincia'          => 'Murillo',
                'imagencompetidor'   => null,
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

        //
        // 4) Añadir 3 tutores adicionales
        //
        $tutoresExtra = [
            [
                'nombretutor'   => 'Carlos',
                'apellidotutor' => 'López',
                'area'          => 'Física',
                'telefonotutor' => '765432100',
                'correotutor'   => 'carlos.lopez@gmail.com',
                'citutor'       => '23456789',
                'imagentutor'   => null,
            ],
            [
                'nombretutor'   => 'Ana',
                'apellidotutor' => 'Martínez',
                'area'          => 'Química',
                'telefonotutor' => '714285369',
                'correotutor'   => 'ana.martinez@gmail.com',
                'citutor'       => '34567891',
                'imagentutor'   => null,
            ],
            [
                'nombretutor'   => 'Pedro',
                'apellidotutor' => 'Sánchez',
                'area'          => 'Biología',
                'telefonotutor' => '798765432',
                'correotutor'   => 'pedro.sanchez@gmail.com',
                'citutor'       => '45678912',
                'imagentutor'   => null,
            ],
        ];

        foreach ($tutoresExtra as $data) {
            if (!User::where('email', $data['correotutor'])->exists()) {
                $t = Tutor::create([
                    'nombretutor'   => $data['nombretutor'],
                    'apellidotutor' => $data['apellidotutor'],
                    'area'          => $data['area'],
                    'telefonotutor' => $data['telefonotutor'],
                    'correotutor'   => $data['correotutor'],
                    'citutor'       => $data['citutor'],
                    'imagentutor'   => $data['imagentutor'],
                ]);

                User::create([
                    'name'         => $t->nombretutor . ' ' . $t->apellidotutor,
                    'email'        => $t->correotutor,
                    'password'     => Hash::make('cifrado123'),
                    'role'         => 'tutor',
                    'profile_id'   => $t->idtutor,
                    'profile_type' => Tutor::class,
                ]);
            }
        }

        //
        // 5) Añadir 3 competidores adicionales
        //
        $competidoresExtra = [
            [
                'nombrecompetidor'   => 'Marcos',
                'apellidocompetidor' => 'Gutiérrez',
                'emailcompetidor'    => 'marcos.gutierrez@gmail.com',
                'cicompetidor'       => '2345678',
                'fechanacimiento'    => now()->subYears(18)->toDateString(),
                'telefonocompetidor' => '712345678',
                'colegio'            => 'Colegio Y',
                'curso'              => 'Sexto',
                'departamento'       => 'Cochabamba',
                'provincia'          => 'Quillacollo',
                'imagencompetidor'   => null,
            ],
            [
                'nombrecompetidor'   => 'Elena',
                'apellidocompetidor' => 'Torres',
                'emailcompetidor'    => 'elena.torres@gmail.com',
                'cicompetidor'       => '3456789',
                'fechanacimiento'    => now()->subYears(17)->toDateString(),
                'telefonocompetidor' => '701234567',
                'colegio'            => 'Colegio Z',
                'curso'              => 'Séptimo',
                'departamento'       => 'Santa Cruz',
                'provincia'          => 'Andrés Ibáñez',
                'imagencompetidor'   => null,
            ],
            [
                'nombrecompetidor'   => 'Diego',
                'apellidocompetidor' => 'Vargas',
                'emailcompetidor'    => 'diego.vargas@gmail.com',
                'cicompetidor'       => '4567890',
                'fechanacimiento'    => now()->subYears(19)->toDateString(),
                'telefonocompetidor' => '709876543',
                'colegio'            => 'Colegio A',
                'curso'              => 'Octavo',
                'departamento'       => 'Potosí',
                'provincia'          => 'Tomás Frías',
                'imagencompetidor'   => null,
            ],
        ];

        foreach ($competidoresExtra as $data) {
            if (!User::where('email', $data['emailcompetidor'])->exists()) {
                $c = Competidor::create([
                    'nombrecompetidor'   => $data['nombrecompetidor'],
                    'apellidocompetidor' => $data['apellidocompetidor'],
                    'emailcompetidor'    => $data['emailcompetidor'],
                    'cicompetidor'       => $data['cicompetidor'],
                    'fechanacimiento'    => $data['fechanacimiento'],
                    'telefonocompetidor' => $data['telefonocompetidor'],
                    'colegio'            => $data['colegio'],
                    'curso'              => $data['curso'],
                    'departamento'       => $data['departamento'],
                    'provincia'          => $data['provincia'],
                    'imagencompetidor'   => $data['imagencompetidor'],
                ]);

                User::create([
                    'name'         => $c->nombrecompetidor . ' ' . $c->apellidocompetidor,
                    'email'        => $c->emailcompetidor,
                    'password'     => Hash::make('cifrado123'),
                    'role'         => 'competidor',
                    'profile_id'   => $c->idcompetidor,
                    'profile_type' => Competidor::class,
                ]);
            }
        }
    }
}
