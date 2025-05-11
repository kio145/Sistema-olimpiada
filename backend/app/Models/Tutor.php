<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Tutor extends Model
{
    use HasFactory;

    protected $table = 'tutor';
    protected $primaryKey = 'idtutor';
    public $incrementing = false;
    protected $keyType = 'int';
    public $timestamps = true;

    protected $fillable = [
        'idtutor',
        'nombretutor',
        'apellidotutor',
        'tipotutor',
        'telefonotutor',
        'correotutor',
        'citutor',
        'imagentutor',
        'usuariotutor',
        'contraseniatutor',
    ];

    public function competidores(): BelongsToMany
    {
        return $this->belongsToMany(Competidor::class, 'tiene', 'idtutor', 'idcompetidor');
    }

    public function boletasPago(): HasMany
    {
        return $this->hasMany(BoletaPago::class, 'id_tutor', 'idtutor');
    }
}