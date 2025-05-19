<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $fillable = [
        'name','email','password','role','profile_id',
        'profile_type',
    ];
    protected $hidden = [
        'password','remember_token'
    ];

    public function administrador()
    {
        return $this->hasOne(Administrador::class, 'user_id');
    }

    public function competidor()
    {
        return $this->hasOne(Competidor::class, 'user_id');
    }

    public function tutor()
    {
        return $this->hasOne(Tutor::class, 'user_id');
    }

    public function cajero()
    {
        return $this->hasOne(Cajero::class, 'user_id');
    }
}
