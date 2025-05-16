<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tutor extends Model
{
    use HasFactory;

    protected $table = 'tutor';
    protected $primaryKey = 'idtutor';
    public $incrementing = false;
    protected $keyType = 'int';

    protected $fillable = [
        'idtutor',
        'nombretutor',
        'apellidotutor',
        'area',
        'telefonotutor',
        'correotutor',
        'citutor',
        'imagentutor'
    ];

    public function competidores()
    {
        return $this->belongsToMany(Competidor::class, 'competidor_tutores', 'idtutor', 'idcompetidor')
                    ->withPivot('idcompetencia', 'tipo_tutor');
    }

    public function validaciones()
    {
        return $this->hasMany(ValidacionTutor::class, 'idtutor');
    }
}