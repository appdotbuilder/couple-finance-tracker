<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\WeeklyIncome
 *
 * @property int $id
 * @property int $user_id
 * @property string $amount
 * @property string $income_date
 * @property string|null $source
 * @property string|null $notes
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|WeeklyIncome newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|WeeklyIncome newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|WeeklyIncome query()
 * @method static \Illuminate\Database\Eloquent\Builder|WeeklyIncome whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WeeklyIncome whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WeeklyIncome whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WeeklyIncome whereIncomeDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WeeklyIncome whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WeeklyIncome whereSource($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WeeklyIncome whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WeeklyIncome whereUserId($value)
 * @method static \Database\Factories\WeeklyIncomeFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class WeeklyIncome extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'amount',
        'income_date',
        'source',
        'notes',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'amount' => 'decimal:2',
        'income_date' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the user that owns the weekly income.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}