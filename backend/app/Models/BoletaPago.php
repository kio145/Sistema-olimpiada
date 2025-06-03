<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BoletaPago extends Model
{
    protected $table = 'boleta_pago';    // forzamos el nombre singular
    protected $primaryKey = 'idboleta';
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        'idcajero',
        'idcompetidor',
        'fecha_emision',
        'montototal',
        'id_tutor'
    ];

      public function competidor()
    {
        // Le decimos a Eloquent que la FK en esta tabla es “idcompetidor”
        return $this->belongsTo(Competidor::class, 'idcompetidor', 'idcompetidor');
    }

    public function tutor()
    {
        return $this->belongsTo(Tutor::class, 'id_tutor', 'idtutor');
    }

    public function cajero()
    {
        return $this->belongsTo(Cajero::class, 'idcajero', 'idcajero');
    }
}
