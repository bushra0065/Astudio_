<?php

namespace App\Http\Controllers\API;

use App\Models\Project;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ProjectController extends Controller
{
    // Create a new project
    public function store(Request $request)
    {
        
       

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'department' => 'required|string|max:255',
            'start_date' => 'required|string',
            'end_date' => 'required|string',
            'status' => 'required|string|max:255',
        ]);
       
        $project = Project::create($validatedData);
        return response()->json([
            'message' => 'User retrieved successfully',
            'project' => $project,
        ]);
         
    }

    // Read a single project
    public function show($id)
    {
        $project = Project::findOrFail($id);
        return response()->json($project);
    }

    // Read all projects
    public function index()
    {
        $projects = Project::all();
        return response()->json($projects);
    }

    // Update a project
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'department' => 'sometimes|required|string|max:255',
            'start_date' => 'sometimes|required|date',
            'end_date' => 'nullable|date',
            'status' => 'sometimes|required|string|max:255',
        ]);

        $project = Project::findOrFail($id);
        $project->update($validatedData);

        return response()->json($project);
    }

    // Delete a project (and related timesheets)
    public function delete($id)
    {
        $project = Project::findOrFail($id);
        
        // Delete related timesheets
        $project->timesheets()->delete();

        $project->delete();

        return response()->json(['message' => 'Project and related timesheets deleted successfully']);
    }
}
