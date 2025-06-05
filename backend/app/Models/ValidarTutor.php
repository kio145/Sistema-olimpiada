<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Database\Eloquent\Model;

class ValidarTutor extends Model
{
    protected $table = 'validar_tutor';
    protected $primaryKey = 'validar_id';
    public $incrementing = true;
    public $timestamps = false;

    protected $fillable = [
        'idcompetencia',
        'idcompetidor',
        'idtutor',
        'tipo_tutor',
        'estado_validacion',
        'motivo_rechazo',
    ];

    public function competidor()
    {
        return $this->belongsTo(
            Competidor::class,
            'idcompetidor',     
            'idcompetidor'      
        );
    }

    public function competencia()
    {
        return $this->belongsTo(
            Competencia::class,
            'idcompetencia',     
            'idcompetencia'      
        );
    }

    public function tutor()
    {
        return $this->belongsTo(Tutor::class,
            'idtutor',
            'idtutor'
        );
    }
}
