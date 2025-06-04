<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\BoletaPago;

class BoletaPagoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        BoletaPago::create([
            'idboleta'     => 1,
            'idcajero'     => 1,
            'idcompetidor' => 1,
            'fecha_emision' => '2025-05-17',
            'montototal'   => 50,
            'id_tutor'     => 1,
        ]);
    }
}
