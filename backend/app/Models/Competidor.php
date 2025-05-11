<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Competidor extends Model
{
    use HasFactory;

    protected $table = 'competidor';
    protected $primaryKey = 'idcompetidor';
    public $incrementing = false;
    protected $keyType = 'int';
    public $timestamps = true;

    protected $fillable = [
        'idcompetidor',
        'nombrecompetidor',
        'apellidocompetidor',
        'emailcompetidor',
        'cicompetidor',
        'fechanacimiento',
        'telefonocompetidor',
        'colegio',
        'curso',
        'departamento',
        'provincia',
        'imagencompetidor',
        'usuariocompetidor',
        'contraseniacompetidor',
    ];

    public function tutores(): BelongsToMany
    {
        return $this->belongsToMany(Tutor::class, 'tiene', 'idcompetidor', 'idtutor');
    }

    public function competencias(): BelongsToMany
    {
        return $this->belongsToMany(Competencia::class, 'tiene0', 'idcompetidor', 'idcompetencia');
    }
}
