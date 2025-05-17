<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * 
 *
 * @property int $idfecha
 * @property string|null $fecha_inicio_competencia
 * @property string|null $fecha_fin_competencia
 * @property string|null $fecha_inicio_inscripcion
 * @property string|null $fecha_fin_inscripcion
 * @property string|null $fecha_inicio_validacion
 * @property string|null $fecha_fin_validacion
 * @property string|null $fecha_inicio_pago
 * @property string|null $fecha_fin_pago
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|Fecha newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Fecha newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Fecha query()
 * @method static \Illuminate\Database\Eloquent\Builder|Fecha whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Fecha whereFechaFinCompetencia($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Fecha whereFechaFinInscripcion($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Fecha whereFechaFinPago($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Fecha whereFechaFinValidacion($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Fecha whereFechaInicioCompetencia($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Fecha whereFechaInicioInscripcion($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Fecha whereFechaInicioPago($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Fecha whereFechaInicioValidacion($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Fecha whereIdfecha($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Fecha whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Fecha extends Model
{
    protected $table = 'fechas';
    protected $primaryKey = 'idfecha';
    public $incrementing = false;
    protected $keyType = 'int';

    protected $fillable = [
        'idfecha',
        'fecha_inicio_competencia',
        'fecha_fin_competencia',
        'fecha_inicio_inscripcion',
        'fecha_fin_inscripcion',
        'fecha_inicio_validacion',
        'fecha_fin_validacion',
        'fecha_inicio_pago',
        'fecha_fin_pago',
    ];
}
