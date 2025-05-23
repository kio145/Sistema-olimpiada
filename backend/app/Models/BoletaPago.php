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
        'idboleta','idcajero','idcompetidor',
        'fecha_emision','montototal','id_tutor'
    ];
}
