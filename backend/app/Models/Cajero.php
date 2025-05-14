<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Cajero extends Model
{
    use HasFactory;

    protected $table = 'cajero';
    protected $primaryKey = 'idcajero';
    public $incrementing = false;
    protected $keyType = 'int';
    public $timestamps = true;

    protected $fillable = [
        'idcajero',
        'nombrecajero',
        'apellidocajero',
        'imagencajero',
        'passwordcajero',
    ];

    public function boletasPago(): HasMany
    {
        return $this->hasMany(BoletaPago::class, 'idcajero', 'idcajero');
    }
}