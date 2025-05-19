<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Relations\MorphOne;

/**
 * 
 *
 * @property int $idadmi
 * @property string|null $nombreadmi
 * @property string|null $apellidoadmi
 * @property string|null $correoadmi
 * @property string|null $passwordadmi
 * @property string|null $imagenadmi
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection<int, \Illuminate\Notifications\DatabaseNotification> $notifications
 * @property-read int|null $notifications_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \Laravel\Sanctum\PersonalAccessToken> $tokens
 * @property-read int|null $tokens_count
 * @property-read \App\Models\User|null $user
 * @method static \Illuminate\Database\Eloquent\Builder|Administrador newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Administrador newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Administrador query()
 * @method static \Illuminate\Database\Eloquent\Builder|Administrador whereApellidoadmi($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Administrador whereCorreoadmi($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Administrador whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Administrador whereIdadmi($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Administrador whereImagenadmi($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Administrador whereNombreadmi($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Administrador wherePasswordadmi($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Administrador whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Administrador extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $table = 'administrador';
    protected $primaryKey = 'idadmi';
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        'idadmi',
        'nombreadmi',
        'apellidoadmi',
        'correoadmi',
        'passwordadmi',  
        'imagenadmi',
    ];

    protected $hidden = [
        'passwordadmi',
        'remember_token',
    ];

    public function user(): MorphOne
    {
        // el “usuario” que tiene este perfil
        return $this->morphOne(User::class, 'profile');
    }
}
