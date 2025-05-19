<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\ValidacionTutor;

class ValidacionTutorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ValidacionTutor::create([
            'validacion_id_'   => 1,
            'idtutor'          => 1,
            'idcompetidor'     => 1,
            'estado_validacion' => 'aprobado',
            'motivo_rechazo'   => null,
        ]);
    }
}
