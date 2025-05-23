<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use App\Models\Administrador;
use App\Models\Competidor;
use App\Models\RequisitoCompetencia;
use App\Models\Fecha;
class Competencia extends Model
{
    use HasFactory;

    protected $table = 'competencia';
    protected $primaryKey = 'idcompetencia';
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        'idadmi',
        'areacompetencia',
        'nivelcompetencia',
        'preciocompetencia',
        'descripcion',
        'imagencompetencia',
    ];

    /**
     * Scope para filtrar por área exacta
     */
    public function scopeArea(Builder $query, $area)
    {
        return $query->when($area, fn(Builder $q) => $q->where('areacompetencia', $area));
    }

    

    /**
     * Scope para filtrar por nivel exacto
     */
    public function scopeNivel(Builder $query, $nivel)
    {
        return $query->when($nivel, fn(Builder $q) => $q->where('nivelcompetencia', $nivel));
    }

    /**
     * Scope para rango de precio (min y/o max)
     */
    public function scopePrecioBetween(Builder $query, $min, $max)
    {
        return $query
            ->when($min, fn(Builder $q) => $q->where('preciocompetencia', '>=', $min))
            ->when($max, fn(Builder $q) => $q->where('preciocompetencia', '<=', $max));
    }

    /**
     * Scope para búsqueda en descripción (LIKE %texto%)
     */
    public function scopeDescripcionLike(Builder $query, $texto)
    {
        return $query->when($texto, fn(Builder $q) => $q->where('descripcion', 'like', "%{$texto}%"));
    }

    /**
     * Relación con Administrador
     */
    public function administrador()
    {
        return $this->belongsTo(Administrador::class, 'idadmi');
    }

    /**
     * Relación muchos a muchos con Competidor (a través de competidor_tutores)
     */
    public function competidores()
    {
        return $this->belongsToMany(
            Competidor::class,
            'competidor_tutores',
            'idcompetencia',
            'idcompetidor'
        )->withPivot('idtutor', 'tipo_tutor');
    }

    /**
     * Relación uno a muchos con RequisitoCompetencia
     */
    public function requisitos()
    {
        return $this->hasMany(RequisitoCompetencia::class, 'idcompetencia');
    }
     public function fechas()
    {
        return $this->hasOne(Fecha::class, 'idcompetencia');
    }

}
