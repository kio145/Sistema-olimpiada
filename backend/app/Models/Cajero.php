<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * 
 *
 * @property int $idcajero
 * @property string|null $nombrecajero
 * @property string|null $apellidocajero
 * @property string|null $imagencajero
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|Cajero newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Cajero newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Cajero query()
 * @method static \Illuminate\Database\Eloquent\Builder|Cajero whereApellidocajero($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Cajero whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Cajero whereIdcajero($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Cajero whereImagencajero($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Cajero whereNombrecajero($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Cajero whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Cajero extends Model
{
    protected $table = 'cajero';
    protected $primaryKey = 'idcajero';
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        'idcajero',
        'nobrecajero',
        'apellidocajero',
        'imagencajero',
        'passwordcajero',
    ];
}
