<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * 
 *
 * @property int $idcompetidor
 * @property string|null $nombrecompetidor
 * @property string|null $apellidocompetidor
 * @property string|null $emailcompetidor
 * @property int|null $cicompetidor
 * @property string|null $fechanacimiento
 * @property int|null $telefonocompetidor
 * @property string|null $colegio
 * @property string|null $curso
 * @property string|null $departamento
 * @property string|null $provincia
 * @property string|null $imagencompetidor
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Competencia> $competencias
 * @property-read int|null $competencias_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Tutor> $tutores
 * @property-read int|null $tutores_count
 * @method static \Illuminate\Database\Eloquent\Builder|Competidor newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Competidor newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Competidor query()
 * @method static \Illuminate\Database\Eloquent\Builder|Competidor whereApellidocompetidor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Competidor whereCicompetidor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Competidor whereColegio($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Competidor whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Competidor whereCurso($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Competidor whereDepartamento($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Competidor whereEmailcompetidor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Competidor whereFechanacimiento($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Competidor whereIdcompetidor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Competidor whereImagencompetidor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Competidor whereNombrecompetidor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Competidor whereProvincia($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Competidor whereTelefonocompetidor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Competidor whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Competidor extends Model
{
    use HasFactory;

    protected $table = 'competidor';
    protected $primaryKey = 'idcompetidor';
    public $incrementing = false;
    protected $keyType = 'int';

    protected $fillable = [
        'user_id',
        'nombrecompetidor',
        'apellidocompetidor',
        'emailcompetidor',
        'cicompetidor',
        'fechanacimiento',
        'colegio',
        'curso',
        'departamento',
        'provincia',
        'imagencompetidor'
    ];
    protected $hidden = [
        'passwordcompetidor',
    ];

    public function competencias()
    {
        return $this->belongsToMany(Competencia::class, 'competidor_tutores', 'idcompetidor', 'idcompetencia')
                    ->withPivot('idtutor', 'tipo_tutor');
    }

    public function tutores()
    {
        return $this->belongsToMany(Tutor::class, 'competidor_tutores', 'idcompetidor', 'idtutor')
                    ->withPivot('idcompetencia', 'tipo_tutor');
    }
}