<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Competencia;

class CompetenciaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Competencia::create([
            'idcompetencia'     => 1,
            'idadmi'            => 1,
            'areacompetencia'   => 'Matemáticas',
            'nivelcompetencia'  => 'Avanzado',
            'preciocompetencia' => 50,
            'descripcion'       => 'Competencia de prueba',
            'imagencompetencia' => null,
        ]);
    }
}
