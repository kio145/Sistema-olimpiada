<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * 
 *
 * @property int $validacion_id_
 * @property int|null $idtutor
 * @property int|null $idcompetidor
 * @property string|null $estado_validacion
 * @property string|null $motivo_rechazo
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|ValidacionTutor newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ValidacionTutor newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ValidacionTutor query()
 * @method static \Illuminate\Database\Eloquent\Builder|ValidacionTutor whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ValidacionTutor whereEstadoValidacion($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ValidacionTutor whereIdcompetidor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ValidacionTutor whereIdtutor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ValidacionTutor whereMotivoRechazo($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ValidacionTutor whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ValidacionTutor whereValidacionId($value)
 * @mixin \Eloquent
 */
class ValidacionTutor extends Model
{
    protected $table = 'validaciones_tutor';
    protected $primaryKey = 'validacion_id_';
    public $incrementing = false;
    protected $keyType = 'int';

    protected $fillable = [
        'validacion_id_',
        'idtutor',
        'idcompetidor',
        'estado_validacion',
        'motivo_rechazo',
    ];
}
