<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BoletaPago extends Model
{
    use HasFactory;

    protected $table = 'boleta_pago';
    protected $primaryKey = 'idboleta';
    public $incrementing = false;
    protected $keyType = 'int';
    public $timestamps = true;

    protected $fillable = [
        'idboleta',
        'idcajero',
        'id_competidor',
        'fecha_emision',
        'montototal',
        'id_tutor',
    ];

    public function cajero(): BelongsTo
    {
        return $this->belongsTo(Cajero::class, 'idcajero', 'idcajero');
    }

    public function competidor(): BelongsTo
    {
        return $this->belongsTo(Competidor::class, 'id_competidor', 'idcompetidor');
    }

    public function tutor(): BelongsTo
    {
        return $this->belongsTo(Tutor::class, 'id_tutor', 'idtutor');
    }
}
