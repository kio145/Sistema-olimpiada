<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\RequisitoCompetencia;

class RequisitoCompetenciaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        RequisitoCompetencia::create([
            'requisito_id' => '1',
            'idcompetencia' => 1,
            'curso'        => '5to',
        ]);
    }
}
