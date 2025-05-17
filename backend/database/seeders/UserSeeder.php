<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run()
    {
        User::create([
            'name'           => 'Administrador',
            'email'          => 'admin@gmail.com',
            'password'       => Hash::make('cifrado123'),
            'role'           => 'administrador',
            'profile_id'     => null,
            'profile_type'   => null,
        ]);

        User::create([
            'name'           => 'Cajero',
            'email'          => 'cajero@gmail.com',
            'password'       => Hash::make('cifrado123'),
            'role'           => 'cajero',
            'profile_id'     => null,
            'profile_type'   => null,
        ]);

        User::create([
            'name'           => 'Tutor',
            'email'          => 'tutor@gmail.com',
            'password'       => Hash::make('cifrado123'),
            'role'           => 'tutor',
            'profile_id'     => null,
            'profile_type'   => null,
        ]);
        User::create([
            'name'           => 'Competidor',
            'email'          => 'competidor@gmail.com',
            'password'       => Hash::make('cifrado123'),
            'role'           => 'competidor',
            'profile_id'     => null,
            'profile_type'   => null,
        ]);
    }
}
