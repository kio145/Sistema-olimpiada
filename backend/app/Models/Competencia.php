<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Competencia extends Model
{
    use HasFactory;

    protected $table = 'competencia';
    protected $primaryKey = 'idcompetencia';
    public $incrementing = true;
    protected $keyType = 'int';
    public $timestamps = true;

    protected $fillable = [
        'idcompetencia',
        'idadmi',
        'areacompetencia',
        'nivelcompetencia',
        'preciocompetencia',
        'estadocompetencia',
        'fechainicompetencia',
        'fechafincompetencia',
        'fechainiinscripcion',
        'fechafininscripcion',
        'fechainipago',
        'fechafinpago',
        'fechainivalidacion',
        'fechafinvalidacion',
        'descripcion',
        'imagencompetencia',
    ];

    public function administrador(): BelongsTo
    {
        return $this->belongsTo(Administrador::class, 'idadmi', 'idadmi');
    }

    public function competidores(): BelongsToMany
    {
        return $this->belongsToMany(Competidor::class, 'tiene0', 'idcompetencia', 'idcompetidor');
    }
}