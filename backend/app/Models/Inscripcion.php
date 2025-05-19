<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * 
 *
 * @property int $_inscripcion_id
 * @property int|null $idcompetencia
 * @property int|null $idcompetidor
 * @property string|null $estado_validacion
 * @property string|null $estado_inscripcion
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|Inscripcion newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Inscripcion newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Inscripcion query()
 * @method static \Illuminate\Database\Eloquent\Builder|Inscripcion whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Inscripcion whereEstadoInscripcion($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Inscripcion whereEstadoValidacion($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Inscripcion whereIdcompetencia($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Inscripcion whereIdcompetidor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Inscripcion whereInscripcionId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Inscripcion whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Inscripcion extends Model
{
    protected $table = 'inscripciones';
    protected $primaryKey = '_inscripcion_id';
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        '_inscripcion_id',
        'idcompetencia',
        'idcompetidor',
        'estado_validacion',
        'estado_inscripcion',
    ];
}
