<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
/* use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory; */

class Tutor extends Model 
{
    use HasFactory;

    protected $table = 'tutor';
    protected $primaryKey = 'idtutor';
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        'user_id',
        'nombretutor',
        'apellidotutor',
        'area',
        'telefonotutor',
        'correotutor',
        'citutor',
        'imagentutor',
    ];

    protected $hidden = [
        'passwordtutor',
    ];

    public function competidores()
    {
        return $this->belongsToMany(
            Competidor::class,
            'competidor_tutores',
            'idtutor',
            'idcompetidor'
        )->withPivot('idcompetencia', 'tipo_tutor');
    }

    public function validaciones()
    {
        return $this->hasMany(ValidacionTutor::class, 'idtutor');
    }
}
