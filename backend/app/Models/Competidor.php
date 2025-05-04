<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Competidor extends Model
{
    use HasFactory;

    protected $table = 'competidor';

    protected $fillable = [
        'NOMBRECOMPETIDOR',
        'APELLIDOCOMPETIDOR',
        'EMAILCOMPETIDOR',
        'CICOMPETIDOR',
        'TELEFONOCOMPETIDOR',
        'FECHANACIMIENTO',
        'COLEGIO',
        'CURSO',
        'DEPARTAMENTO',
        'PROVINCIA',
        'IMAGENCOMPETIDOR'
    ];
}
