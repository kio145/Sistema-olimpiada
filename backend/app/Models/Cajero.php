<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Cajero extends Model
{
    use HasFactory;

    protected $table = 'cajero';
    protected $primaryKey = 'idcajero';
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        'user_id',
        'nombrecajero',
        'apellidocajero',
        'imagencajero',
        'emailcajero',
    ];
    protected $hidden = [
        'passwordcajero',
    ];
}
