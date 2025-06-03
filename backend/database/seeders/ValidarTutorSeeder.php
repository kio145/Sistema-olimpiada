<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\ValidarTutor;

class ValidarTutorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ValidarTutor::create([
            'idcompetencia' => 1,
            'idcompetidor'  => 1,
            'idtutor'       => 1,
            'tipo_tutor'    => 'principal',
            'estado_validacion'=> "pendiente",
            'motivo_rechazo'=> null,
        ]);
    }
}
