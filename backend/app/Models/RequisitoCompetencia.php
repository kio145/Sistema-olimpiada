<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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
