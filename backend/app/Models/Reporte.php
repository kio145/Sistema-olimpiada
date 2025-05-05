<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Reporte extends Model
{
    use HasFactory;

    protected $table = 'reporte';
    protected $primaryKey = 'idreporte';
    public $incrementing = false;
    protected $keyType = 'int';
    public $timestamps = true;

    protected $fillable = [
        'idreporte',
        'idadmi',
        'tiporeporte',
        'fechareporte',
        'detalles',
    ];

    public function administrador(): BelongsTo
    {
        return $this->belongsTo(Administrador::class, 'idadmi', 'idadmi');
    }
}
