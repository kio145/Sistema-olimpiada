<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Inscripcion;

class InscripcionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
      
        Inscripcion::create([
            '_inscripcion_id'    => 1,
            'idcompetencia'      => 1,
            'idcompetidor'       => 1,
            'estado_validacion'  => 'pendiente',
            'estado_inscripcion' => 'inscrito',
        ]);
    }
}
