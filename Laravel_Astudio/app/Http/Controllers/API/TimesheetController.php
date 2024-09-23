<?php

namespace App\Http\Controllers\API;

use App\Models\Timesheet;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class TimesheetController extends Controller
{
    // Create a new timesheet
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'task_name' => 'required|string|max:255',
            'date' => 'required|date',
            'hours' => 'required|numeric',
            'user_id' => 'required|exists:users,id',
            'project_id' => 'required|exists:projects,id',
        ]);

        $timesheet = Timesheet::create($validatedData);

        return response()->json($timesheet, 201);
    }

    // Read a single timesheet
    public function show($id)
    {
        $timesheet = Timesheet::findOrFail($id);
        return response()->json($timesheet);
    }

    // Read all timesheets
    public function index()
    {
        $timesheets = Timesheet::all();
        return response()->json($timesheets);
    }

    // Update a timesheet
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'task_name' => 'sometimes|required|string|max:255',
            'date' => 'sometimes|required|date',
            'hours' => 'sometimes|required|numeric',
            'user_id' => 'sometimes|required|exists:users,id',
            'project_id' => 'sometimes|required|exists:projects,id',
        ]);

        $timesheet = Timesheet::findOrFail($id);
        $timesheet->update($validatedData);

        return response()->json($timesheet);
    }

    // Delete a timesheet
    public function delete($id)
    {
        $timesheet = Timesheet::findOrFail($id);
        $timesheet->delete();

        return response()->json(['message' => 'Timesheet deleted successfully']);
    }
}
