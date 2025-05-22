<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Fecha;

class FechaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Fecha::create([
            'idfecha'                  => 1,
            'idcompetencia'            => 1,
            'fecha_inicio_competencia' => '2025-06-01',
            'fecha_fin_competencia'    => '2025-06-02',
            'fecha_inicio_inscripcion' => '2025-05-01',
            'fecha_fin_inscripcion'    => '2025-05-15',
            'fecha_inicio_validacion'  => '2025-05-16',
            'fecha_fin_validacion'     => '2025-05-20',
            'fecha_inicio_pago'        => '2025-05-21',
            'fecha_fin_pago'           => '2025-05-25',
        ]);
    }
}
