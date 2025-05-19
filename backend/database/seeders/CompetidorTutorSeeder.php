<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\CompetidorTutor;

class CompetidorTutorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        CompetidorTutor::create([
            'idcompetencia' => 1,
            'idcompetidor'  => 1,
            'idtutor'       => 1,
            'tipo_tutor'    => 'principal',
        ]);
    }
}
