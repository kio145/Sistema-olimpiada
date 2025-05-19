<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Cajero;

class CajeroSeeder extends Seeder
{
    public function run()
    {
        Cajero::create([
            'idcajero'       => 1,
            'nombrecajero'    => 'Cajerouno',
            'apellidocajero' => 'Ejemplo',
            'imagencajero'   => null,
        ]);
    }
}
