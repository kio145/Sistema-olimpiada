<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Competidor extends Model
{
    use HasFactory;

    protected $table = 'competidor';
    protected $primaryKey = 'idcompetidor';
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        'user_id',
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
        return $this->belongsToMany(Competencia::class,
        'validar_tutor',
        'idcompetidor',
        'idcompetencia'
        )->withPivot('idtutor', 'tipo_tutor', 'estado_validacion', 'motivo_rechazo',);
    }

    public function tutores()
    {
        return $this->belongsToMany(Tutor::class, 'validar_tutor', 'idcompetidor', 'idtutor')
                    ->withPivot('idcompetencia', 'tipo_tutor', 'estado_validacion', 'motivo_rechazo',);
    }

     public function validaciones()
    {
        return $this->hasMany(
            ValidarTutor::class,
            'idcompetidor',    // FK en validar_tutor
            'idcompetidor'     // PK en competidor
        );
    }
}