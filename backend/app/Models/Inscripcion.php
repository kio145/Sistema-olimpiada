<?php

// app/Models/Inscripcion.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Inscripcion extends Model
{
    protected $table = 'inscripciones';
    protected $primaryKey = '_inscripcion_id';
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        '_inscripcion_id',
        'idcompetencia',
        'idcompetidor',
        'estado_inscripcion',
    ];

    // Relación hacia Competencia
    public function competencia()
    {
        return $this->belongsTo(
            Competencia::class,
            'idcompetencia',      // FK en inscripciones
            'idcompetencia'       // PK en competencia
        );
    }
}
