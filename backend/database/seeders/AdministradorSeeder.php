<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Administrador;
use Illuminate\Support\Facades\Hash;

class AdministradorSeeder extends Seeder
{
    public function run()
    {
        Administrador::create([
            'idadmi'       => 1,
            'nombreadmi'   => 'Admin',
            'apellidoadmi' => 'Principal',
            'correoadmi'   => 'admin@ejemplo.com',
            'passwordadmi' => Hash::make('secreto123'),
            'imagenadmi'   => null,
        ]);
    }
}
