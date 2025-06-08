<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\UserSeeder;
use Database\Seeders\CompetenciaSeeder;
use Database\Seeders\BoletaPagoSeeder;
use Database\Seeders\FechaSeeder;
use Database\Seeders\InscripcionSeeder;
use Database\Seeders\RequisitoCompetenciaSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run()
{
    $this->call([
        UserSeeder::class,
        CompetenciaSeeder::class,
        BoletaPagoSeeder::class,
        FechaSeeder::class,
        InscripcionSeeder::class,
        RequisitoCompetenciaSeeder::class,
        ValidarTutorSeeder::class,
    ]);
}

}
