<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class Tutor extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
         DB::table('tutor')->insert([
            [
                'nombretutor' => 'Juan',
                'apellidotutor' => 'Pérez',
                'tipotutor' => 'Padre',
                'telefonotutor' => 78945612,
                'correotutor' => 'juan.perez@example.com',
                'citutor' => 12345678,
                'passwordtutor' => Hash::make('12345678'),
                'imagentutor' => null,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'nombretutor' => 'Ana',
                'apellidotutor' => 'Gómez',
                'tipotutor' => 'Madre',
                'telefonotutor' => 74561234,
                'correotutor' => 'ana.gomez@example.com',
                'citutor' => 87654321,
                'passwordtutor' => Hash::make('87654321'),
                'imagentutor' => null,
                'created_at' => now(),
                'updated_at' => now()
            ],
        ]);
    }
}
