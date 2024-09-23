<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'department',
        'start_date',
        'end_date',
        'status',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
    ];

    // A project can have many users (Many-to-Many)
    public function users()
    {
        return $this->belongsToMany(User::class, 'project_user'); // Assuming 'project_user' is the pivot table name
    }

    // A project can have many timesheets (One-to-Many)
    public function timesheets()
    {
        return $this->hasMany(Timesheet::class);
    }
}
