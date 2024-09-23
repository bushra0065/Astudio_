<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->except(['register', 'login']);
    }

    // ... (previous methods remain the same)

    public function index(Request $request)
    {
        $query = User::query();

        if ($request->has('first_name')) {
            $query->where('first_name', 'like', '%' . $request->first_name . '%');
        }

        if ($request->has('gender')) {
            $query->where('gender', $request->gender);
        }

        if ($request->has('date_of_birth')) {
            $query->whereDate('date_of_birth', $request->date_of_birth);
        }

        $users = $query->with('client')->get();
        return response()->json($users);
    }

    public function register(Request $request)
    {
       
        $validatedData = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'date_of_birth' => 'required|string', // Add this line
            'gender' => 'required|string', // Add this line
        ]);

         
        $user = User::create([
            'first_name' => $validatedData['first_name'],
            'last_name' => $validatedData['last_name'],
            'email' => $validatedData['email'],
            'date_of_birth' => $validatedData['date_of_birth'],
            'gender' => $validatedData['gender'],
            'password' => Hash::make($validatedData['password']),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
        ]);
    }

    public function login(Request $request)
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'message' => 'Invalid login details'
            ], 401);
        }

        $user = User::where('email', $request['email'])->firstOrFail();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out successfully'
        ]);
    }


    public function update(Request $request, $id)
{
    // Find the user by ID
    $user = User::findOrFail($id);

    // Validate the input data
    $validatedData = $request->validate([
        'first_name' => 'sometimes|required|string|max:255',
        'last_name' => 'sometimes|required|string|max:255',
        'email' => 'sometimes|required|string|email|max:255|unique:users,email,' . $user->id,
        'password' => 'sometimes|nullable|string|min:8',
        'date_of_birth' => 'sometimes|required|date',
        'gender' => 'sometimes|nullable|string',
    ]);

    // Update user details
    $user->first_name = $validatedData['first_name'] ?? $user->first_name;
    $user->last_name = $validatedData['last_name'] ?? $user->last_name;
    $user->email = $validatedData['email'] ?? $user->email;
    $user->date_of_birth = $validatedData['date_of_birth'] ?? $user->date_of_birth;
    $user->gender = $validatedData['gender'] ?? $user->gender;

    // Only update the password if provided
    if (!empty($validatedData['password'])) {
        $user->password = Hash::make($validatedData['password']);
    }

    // Save the updated user
    $user->save();

    return response()->json([
        'message' => 'User updated successfully',
        'user' => $user,
    ]);
}



public function delete(Request $request)
{
    $request->validate([
        'id' => 'required|integer|exists:users,id',
    ]);

    $user = User::findOrFail($request->id);

    $user->delete();

    return response()->json([
        'message' => 'User deleted successfully',
    ]);
}


public function show($id)
{
    $user = User::findOrFail($id);

    return response()->json([
        'message' => 'User retrieved successfully',
        'user' => $user,
    ]);
}


public function getUserTimesheets($userId)
{
    // Find the user by ID and get their timesheets
    $user = User::findOrFail($userId);
    $timesheets = $user->timesheets()->with('project')->get(); // Include the related project data
    
    return response()->json($timesheets, 200);
}


}