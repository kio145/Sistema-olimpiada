<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Cajero;

class CajeroSeeder extends Seeder
{
    public function run(): void
    {
        Cajero::create([
            'idcajero'       => 2,
            'nombrecajero'   => 'Carlos',
            'apellidocajero' => 'González',
            'imagencajero'   => null,
        ]);

        Cajero::create([
            'idcajero'       => 3,
            'nombrecajero'   => 'María',
            'apellidocajero' => 'Pérez',
            'imagencajero'   => null,
        ]);
    }
}
