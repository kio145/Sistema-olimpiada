<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Competidor; 

class CompetidorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        Competidor::create([
            'idcompetidor'        => 1,
            'nombrecompetidor'    => 'Juan',
            'apellidocompetidor'  => 'Pérez',
            'emailcompetidor'     => 'juan@ejemplo.com',
            'cicompetidor'        => 123456,
            'fechanacimiento'     => '2008-05-10',
            'telefonocompetidor'  => 77712345,
            'colegio'             => 'Colegio X',
            'curso'               => '5to',
            'departamento'        => 'Cochabamba',
            'provincia'           => 'Cercado',
            'imagencompetidor'    => null,
        ]);
    }
}
