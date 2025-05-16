<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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
