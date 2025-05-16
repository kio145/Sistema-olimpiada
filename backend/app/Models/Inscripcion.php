<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Inscripcion extends Model
{
    protected $table = 'inscripciones';
    protected $primaryKey = '_inscripcion_id';
    public $incrementing = false;
    protected $keyType = 'int';

    protected $fillable = [
        '_inscripcion_id',
        'idcompetencia',
        'idcompetidor',
        'estado_validacion',
        'estado_inscripcion',
    ];
}
