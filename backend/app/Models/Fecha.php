<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Fecha extends Model
{
    protected $table = 'fechas';
    protected $primaryKey = 'idfecha';
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        'fecha_inicio_competencia',
        'fecha_fin_competencia',
        'fecha_inicio_inscripcion',
        'fecha_fin_inscripcion',
        'fecha_inicio_validacion',
        'fecha_fin_validacion',
        'fecha_inicio_pago',
        'fecha_fin_pago',
    ];
}
