<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Competidor;

class CompetidorSeeder extends Seeder
{
    public function run(): void
    {
        Competidor::create([
            'idcompetidor'        => 2,
            'nombrecompetidor'    => 'Juan',
            'apellidocompetidor'  => 'Pérez',
            'emailcompetidor'     => 'juan.perez@ejemplo.com',
            'cicompetidor'        => 1234567,
            'fechanacimiento'      => '2008-04-15',
            'telefonocompetidor'   => '76543210',
            'colegio'             => 'Colegio Nacional',
            'curso'               => 'Quinto',
            'departamento'        => 'Cochabamba',
            'provincia'           => 'Cercado',
            'imagencompetidor'    => null,
        ]);

        Competidor::create([
            'idcompetidor'        => 3,
            'nombrecompetidor'    => 'María',
            'apellidocompetidor'  => 'Gómez',
            'emailcompetidor'     => 'maria.gomez@ejemplo.com',
            'cicompetidor'        => 2345678,
            'fechanacimiento'      => '2009-09-20',
            'telefonocompetidor'   => '71234589',
            'colegio'             => 'Unidad Educativa',
            'curso'               => 'Cuarto',
            'departamento'        => 'La Paz',
            'provincia'           => 'Murillo',
            'imagencompetidor'    => null,
        ]);
    }
}
