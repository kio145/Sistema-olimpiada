<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * 
 *
 * @property int $idcompetencia
 * @property int|null $idadmi
 * @property string|null $areacompetencia
 * @property string|null $nivelcompetencia
 * @property int|null $preciocompetencia
 * @property string|null $descripcion
 * @property string|null $imagencompetencia
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Administrador|null $administrador
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Competidor> $competidores
 * @property-read int|null $competidores_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\RequisitoCompetencia> $requisitos
 * @property-read int|null $requisitos_count
 * @method static \Illuminate\Database\Eloquent\Builder|Competencia newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Competencia newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Competencia query()
 * @method static \Illuminate\Database\Eloquent\Builder|Competencia whereAreacompetencia($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Competencia whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Competencia whereDescripcion($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Competencia whereIdadmi($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Competencia whereIdcompetencia($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Competencia whereImagencompetencia($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Competencia whereNivelcompetencia($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Competencia wherePreciocompetencia($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Competencia whereUpdatedAt($value)
 * @mixin \Eloquent
 */
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