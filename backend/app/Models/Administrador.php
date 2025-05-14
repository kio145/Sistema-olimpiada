<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Administrador extends Model
{
    use HasFactory;

    protected $table = 'administrador';
    protected $primaryKey = 'idadmi';
    public $incrementing = false;
    protected $keyType = 'int';
    public $timestamps = true;

    protected $fillable = [
        'idadmi',
        'nombreadmi',
        'apellidoadmi',
        'correoadmi',
        'passwordadmi',
        'imagenadmi',
    ];

    public function competencias(): HasMany
    {
        return $this->hasMany(Competencia::class, 'idadmi', 'idadmi');
    }

    public function reportes(): HasMany
    {
        return $this->hasMany(Reporte::class, 'idadmi', 'idadmi');
    }
}
