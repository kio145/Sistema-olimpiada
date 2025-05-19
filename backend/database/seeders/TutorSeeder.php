<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Tutor;

class TutorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        Tutor::create([
            'idtutor'       => 1,
            'nombretutor'   => 'Ana',
            'apellidotutor' => 'Gómez',
            'area'          => 'Física',
            'telefonotutor' => 77754321,
            'correotutor'   => 'ana@ejemplo.com',
            'citutor'       => 987654,
            'imagentutor'   => null,
        ]);
    }
}
