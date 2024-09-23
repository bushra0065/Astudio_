<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TimeSheet extends Model
{
    use HasFactory;

    // Specify the correct table name
    protected $table = 'timesheets';

    protected $fillable = [
        'task_name',
        'date',
        'hours',
        'user_id',
        'project_id',
    ];

    protected $casts = [
        'date' => 'date',
        'hours' => 'float',
    ];

    // A timesheet belongs to one user (Many-to-One)
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // A timesheet belongs to one project (Many-to-One)
    public function project()
    {
        return $this->belongsTo(Project::class);
    }
}
