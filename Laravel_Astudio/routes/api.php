<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\ProjectController;
use App\Http\Controllers\API\TimesheetController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Routes that don't require authentication
Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);


// Routes that require a Bearer token (auth:sanctum)
Route::middleware('auth:sanctum')->group(function () {
    // User Routes
    Route::get('/users/{id}', [UserController::class, 'show']);
 
    
    Route::get('/users', [UserController::class, 'index']);
    Route::post('/users/update/{id}', [UserController::class, 'update']);
    Route::post('/users/delete', [UserController::class, 'delete']);
    Route::get('/users/projects', [UserController::class, 'getUserProjects']);  // Get projects of authenticated user
    Route::get('/users/{id}/timesheets', [UserController::class, 'getUserTimesheets']);
    
    Route::post('/projects/create', [ProjectController::class, 'store']);
    Route::get('/projects/{id}', [ProjectController::class, 'show']);
    Route::get('/projects', [ProjectController::class, 'index']);
    Route::post('/projects/update/{id}', [ProjectController::class, 'update']);
    Route::get('/projects/delete/{id}', [ProjectController::class, 'delete']);

    // Timesheet Routes
    Route::post('/timesheets/create', [TimesheetController::class, 'store']);
    Route::get('/timesheets/{id}', [TimesheetController::class, 'show']);
    Route::get('/timesheets', [TimesheetController::class, 'index']);
    Route::post('/timesheets/update/{id}', [TimesheetController::class, 'update']);
    Route::get('/timesheets/delete/{id}', [TimesheetController::class, 'delete']);

    // User Info Route (Protected)
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});
