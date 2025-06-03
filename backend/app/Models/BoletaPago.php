<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BoletaPago extends Model
{
    use HasFactory;

    protected $table = 'boleta_pago';    // forzamos el nombre singular
    protected $primaryKey = 'idboleta';
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        'idcajero',
        'idcompetidor',
        'fecha_emision',
        'montototal',
    ];
     // Relación con el competidor que paga
    public function competidor()
    {
        return $this->belongsTo(Competidor::class, 'idcompetidor');
    }

    // Relación con el cajero que generó la boleta
    public function cajero()
    {
        return $this->belongsTo(Cajero::class, 'idcajero');
    }

    // Relación con inscripciones pagadas en esta boleta (tabla pivote)
    public function inscripciones()
    {
        return $this->belongsToMany(
            Inscripcion::class,
            'boleta_pago_inscripcion',
            'idboleta',
            '_inscripcion_id'
        )->withTimestamps();
    }

}
