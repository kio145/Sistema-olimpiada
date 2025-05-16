<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Administrador extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $table = 'administrador';
    protected $primaryKey = 'idadmi';
    public $incrementing = false;
    protected $keyType = 'int';

    protected $fillable = [
        'idadmi',
        'nombreadmi',
        'apellidoadmi',
        'correoadmi',
        'imagenadmi',
    ];

    protected $hidden = [
        'passwordadmi',
    ];
}
