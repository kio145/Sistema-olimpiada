<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class CompetidorTutor extends Pivot
{
    protected $table = 'competidor_tutores';
    public $timestamps = false;

    protected $fillable = [
        'idcompetencia',
        'idcompetidor',
        'idtutor',
        'tipo_tutor',
    ];
}
