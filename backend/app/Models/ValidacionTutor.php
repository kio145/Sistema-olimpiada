<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ValidacionTutor extends Model
{
    protected $table = 'validaciones_tutor';
    protected $primaryKey = 'validacion_id_';
    public $incrementing = false;
    protected $keyType = 'int';

    protected $fillable = [
        'validacion_id_',
        'idtutor',
        'idcompetidor',
        'estado_validacion',
        'motivo_rechazo',
    ];
}
