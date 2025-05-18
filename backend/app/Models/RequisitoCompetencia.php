<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * 
 *
 * @property string $requisito_id
 * @property int|null $idcompetencia
 * @property string|null $curso
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|RequisitoCompetencia newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|RequisitoCompetencia newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|RequisitoCompetencia query()
 * @method static \Illuminate\Database\Eloquent\Builder|RequisitoCompetencia whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RequisitoCompetencia whereCurso($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RequisitoCompetencia whereIdcompetencia($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RequisitoCompetencia whereRequisitoId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RequisitoCompetencia whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class RequisitoCompetencia extends Model
{
    protected $table = 'requisitos_competencia';
    protected $primaryKey = 'requisito_id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'requisito_id',
        'idcompetencia',
        'curso',
    ];
}
