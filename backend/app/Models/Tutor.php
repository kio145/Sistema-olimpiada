<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Tutor extends Authenticatable
{
    use HasApiTokens, Notifiable, HasFactory;

    protected $table = 'tutor';
    protected $primaryKey = 'idtutor';
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        'nombretutor',
        'apellidotutor',
        'area',
        'telefonotutor',
        'correotutor',
        'citutor',
        'imagentutor'
    ];

    protected $hidden = [
    ];

    public function competidores()
    {
        return $this->belongsToMany(
            Competidor::class,
            'competidor_tutores',
            'idtutor',
            'idcompetidor'
        )->withPivot('idcompetencia', 'tipo_tutor');
    }

    public function validaciones()
    {
        return $this->hasMany(ValidacionTutor::class, 'idtutor');
    }
}
