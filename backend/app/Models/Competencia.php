<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Competencia extends Model
{
    use HasFactory;

    protected $table = 'competencia';
    protected $primaryKey = 'idcompetencia';
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        'idcompetencia',
        'idadmi',
        'areacompetencia',
        'areacompetencia',
        'nivelcompetencia',
        'preciocompetencia',
        'descripcion',
        'imagencompetencia'
    ];

    public function administrador()
    {
        return $this->belongsTo(Administrador::class, 'idadmi');
    }

    public function competidores()
    {
        return $this->belongsToMany(Competidor::class, 'competidor_tutores', 'idcompetencia', 'idcompetidor')
                    ->withPivot('idtutor', 'tipo_tutor');
    }

    public function requisitos()
    {
        return $this->hasMany(RequisitoCompetencia::class, 'idcompetencia');
    }
}