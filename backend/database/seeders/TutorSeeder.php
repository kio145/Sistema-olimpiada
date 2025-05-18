<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Tutor;

class TutorSeeder extends Seeder
{
    public function run(): void
    {
        Tutor::create([
            'idtutor'       => 2,
            'nombretutor'   => 'Ana',
            'apellidotutor' => 'Ramírez',
            'area'          => 'Matemáticas',
            'telefonotutor' => '71234567',
            'correotutor'   => 'ana.ramirez@ejemplo.com',
            'citutor'       => 78965412,
            'imagentutor'   => null,
        ]);

        Tutor::create([
            'idtutor'       => 3,
            'nombretutor'   => 'Luis',
            'apellidotutor' => 'Torres',
            'area'          => 'Física',
            'telefonotutor' => '79876543',
            'correotutor'   => 'luis.torres@ejemplo.com',
            'citutor'       => 12345678,
            'imagentutor'   => null,
        ]);
    }
}
