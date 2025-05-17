<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * 
 *
 * @property int $idtutor
 * @property string|null $nombretutor
 * @property string|null $apellidotutor
 * @property string|null $area
 * @property int|null $telefonotutor
 * @property string|null $correotutor
 * @property int|null $citutor
 * @property string|null $imagentutor
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Competidor> $competidores
 * @property-read int|null $competidores_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\ValidacionTutor> $validaciones
 * @property-read int|null $validaciones_count
 * @method static \Illuminate\Database\Eloquent\Builder|Tutor newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Tutor newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Tutor query()
 * @method static \Illuminate\Database\Eloquent\Builder|Tutor whereApellidotutor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Tutor whereArea($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Tutor whereCitutor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Tutor whereCorreotutor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Tutor whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Tutor whereIdtutor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Tutor whereImagentutor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Tutor whereNombretutor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Tutor whereTelefonotutor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Tutor whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Tutor extends Model
{
    use HasFactory;

    protected $table = 'tutor';
    protected $primaryKey = 'idtutor';
    public $incrementing = true;
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