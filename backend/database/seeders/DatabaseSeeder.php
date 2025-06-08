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
use Illuminate\Support\Facades\DB;
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run()
{
     // SOLO EN DESARROLLO: Desactiva claves foráneas
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        // Trunca primero las tablas hijas, luego las padres
        DB::table('validar_tutor')->truncate();
        DB::table('requisito_competencia')->truncate();
        DB::table('inscripcion')->truncate();
        DB::table('fecha')->truncate();
        DB::table('boleta_pago')->truncate();
        DB::table('competencia')->truncate();
        DB::table('users')->truncate();

        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
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
