<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Competidor extends Model
{
    use HasFactory;

    protected $table = 'competidor';
    protected $primaryKey = 'idcompetidor';
    public $incrementing = false;
    protected $keyType = 'int';

    protected $fillable = [
        'idcompetidor',
        'usuariocompetidor',
        'nombrecompetidor',
        'apellidocompetidor',
        'emailcompetidor',
        'cicompetidor',
        'fechanacimiento',
        'colegio',
        'curso',
        'departamento',
        'provincia',
        'imagencompetidor'
    ];
    protected $hidden = [
        'passwordcompetidor',
    ];

    public function competencias()
    {
        return $this->belongsToMany(Competencia::class, 'competidor_tutores', 'idcompetidor', 'idcompetencia')
                    ->withPivot('idtutor', 'tipo_tutor');
    }

    public function tutores()
    {
        return $this->belongsToMany(Tutor::class, 'competidor_tutores', 'idcompetidor', 'idtutor')
                    ->withPivot('idcompetencia', 'tipo_tutor');
    }
}