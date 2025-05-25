<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

/**
 * 
 *
 * @property int|null $idcompetencia
 * @property int|null $idcompetidor
 * @property int|null $idtutor
 * @property string|null $tipo_tutor
 * @method static \Illuminate\Database\Eloquent\Builder|CompetidorTutor newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CompetidorTutor newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CompetidorTutor query()
 * @method static \Illuminate\Database\Eloquent\Builder|CompetidorTutor whereIdcompetencia($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CompetidorTutor whereIdcompetidor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CompetidorTutor whereIdtutor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CompetidorTutor whereTipoTutor($value)
 * @mixin \Eloquent
 */
class ValidarTutor extends Pivot
{
    protected $table = 'validar_tutor';
    protected $primaryKey = 'validar_id';
    public $incrementing = true;
    public $timestamps = false;

    protected $fillable = [
        'idcompetencia',
        'idcompetidor',
        'idtutor',
        'tipo_tutor',
        'estado_validacion',
        'motivo_rechazo',
    ];
}
