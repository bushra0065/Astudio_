Project Overview
This Laravel-based timesheet application allows users to manage projects and track time spent on various tasks. It features user authentication, project management, and timesheet logging functionalities.
Key Features

User authentication and management
Project creation and management
Timesheet logging and tracking
Multi-user support with project assignments


Installation

Clone the repository:
Create a copy of the .env.example file and rename it to .env:
Configure the database in the .env file:
DB_DATABASE=/absolute/path/to/your/project/database/database.sqlite
Replace /absolute/path/to/your/project with the actual path to your project directory.



Start the development server:
php artisan serve


Usage

Register a new user account or log in with existing credentials.
email:  astudio@test.com
password:  password123


User API Documentation
=======================

This API provides user management functionalities including registration, login, viewing, updating, and deleting user data. The API uses Sanctum for authentication, and certain endpoints require a valid Bearer token to access.

Base URL:
---------
https://your-api-url.com/api

Authentication:
---------------
The API uses token-based authentication. After a successful login or registration, an `access_token` will be returned. You must include this token in the `Authorization` header for all authenticated requests.

Authorization Header Format:
----------------------------
Authorization: Bearer your_access_token_here

Endpoints:
----------

1. User Registration
---------------------
URL: /register
Method: POST
Description: Register a new user.

Request Body:
- first_name (string, required)
- last_name (string, required)
- email (string, required, must be unique)
- password (string, required, minimum 8 characters)
- date_of_birth (string, required)
- gender (string, required)

Response:
- access_token (string): The Bearer token for authenticated access.

Example Request:

POST /register { "first_name": "John", "last_name": "Doe", "email": "johndoe@example.com", "password": "yourpassword", "date_of_birth": "1990-01-01", "gender": "male" }

Example Response:

{ "access_token": "your_access_token_here" }




2. User Login
--------------
URL: /login
Method: POST
Description: Log in an existing user.

Request Body:
- email (string, required)
- password (string, required)

Response:
- access_token (string): The Bearer token for authenticated access.

Example Request:

POST /login { "email": "johndoe@example.com", "password": "yourpassword" }

Example Response:

{ "access_token": "your_access_token_here" }



3. View User Details
---------------------
URL: /users/{id}
Method: GET
Description: Retrieve details of a specific user. Requires authentication.

Response:
- user (object): The user's details.

Example Request:

GET /users/1 Authorization: Bearer your_access_token_here


Example Response:

{ "message": "User retrieved successfully", "user": { "id": 1, "first_name": "John", "last_name": "Doe", "email": "johndoe@example.com", "date_of_birth": "1990-01-01", "gender": "male" } }



4. Update User Details
-----------------------
URL: /users/update/{id}
Method: POST
Description: Update user information. Requires authentication.

Request Body (any of the following fields can be updated):
- first_name (string)
- last_name (string)
- email (string, must be unique)
- password (string, minimum 8 characters)
- date_of_birth (string)
- gender (string)

Response:
- message (string): Success message.
- user (object): Updated user details.

Example Request:

POST /users/update/1 Authorization: Bearer your_access_token_here { "first_name": "Jane", "email": "janedoe@example.com" }


Example Response:

{ "message": "User updated successfully", "user": { "id": 1, "first_name": "Jane", "last_name": "Doe", "email": "janedoe@example.com", "date_of_birth": "1990-01-01", "gender": "female" } }



5. Delete User
---------------
URL: /users/delete
Method: POST
Description: Delete a user by their ID. Requires authentication.

Request Body:
- id (integer, required)

Response:
- message (string): Success message.

Example Request:

POST /users/delete Authorization: Bearer your_access_token_here { "id": 1 }


Example Response:

{ "message": "User deleted successfully" }



6. List Users
--------------
URL: /users
Method: GET
Description: Retrieve a list of users. Requires authentication. Supports filtering by `first_name`, `gender`, and `date_of_birth`.

Request Query Parameters (optional):
- first_name (string)
- gender (string)
- date_of_birth (string, format: YYYY-MM-DD)

Response:
- users (array): List of users with associated client details.

Example Request:

GET /users?first_name=John&gender=male Authorization: Bearer your_access_token_here


Example Response:

[ { "id": 1, "first_name": "John", "last_name": "Doe", "email": "johndoe@example.com", "date_of_birth": "1990-01-01", "gender": "male", "client": { "id": 1, "name": "Client A" } } ]



7. User Logout
---------------
URL: /logout
Method: POST
Description: Log out the authenticated user by revoking their access token.

Response:
- message (string): Success message.

Example Request:

POST /logout Authorization: Bearer your_access_token_here



Example Response:

{ "message": "Logged out successfully" }


8. Get User Timesheets
-----------------------
URL: /users/{id}/timesheets
Method: GET
Description: Retrieve the timesheets associated with a specific user, including the related project data.

Parameters:
- id (integer, required): The ID of the user whose timesheets are to be retrieved.

Response:
- timesheets (array): List of the user's timesheets, each containing associated project details.

Example Request:

GET /users/1/timesheets

Example Response:

[ { "id": 101, "user_id": 1, "hours": 8, "date": "2024-09-20", "project": { "id": 10, "name": "Project A", "description": "This is a sample project." } }, { "id": 102, "user_id": 1, "hours": 6, "date": "2024-09-21", "project": { "id": 11, "name": "Project B", "description": "This is another sample project." } } ]



This function uses `GET` to retrieve all timesheets for a given user, with each timesheet linked to a specific project.



### Project Management Endpoints
These endpoints allow for the creation, retrieval, updating, and deletion of projects in the system.

1. Create a New Project
-----------------------
**URL:** `/projects/create`  
**Method:** POST  
**Description:** Create a new project by providing the necessary details.

**Request Body Parameters:**
- `name` (string, required): The name of the project.
- `department` (string, required): The department responsible for the project.
- `start_date` (string, required): The start date of the project.
- `end_date` (string, required): The end date of the project.
- `status` (string, required): The current status of the project.

**Response:**
- `message`: A success message.
- `project`: The created project object.

**Example Request:**
POST /projects/create { "name": "Project Alpha", "department": "Development", "start_date": "2024-09-01", "end_date": "2024-12-31", "status": "Ongoing" }


**Example Response:**
{ "message": "User retrieved successfully", "project": { "id": 1, "name": "Project Alpha", "department": "Development", "start_date": "2024-09-01", "end_date": "2024-12-31", "status": "Ongoing", "created_at": "2024-09-22T10:00:00.000Z", "updated_at": "2024-09-22T10:00:00.000Z" } }




2. Get a Single Project
-----------------------
**URL:** `/projects/{id}`  
**Method:** GET  
**Description:** Retrieve details of a specific project by its ID.

**Parameters:**
- `id` (integer, required): The ID of the project.

**Response:**
- The project object.

**Example Request:**
GET /projects/1


**Example Response:**
{ "id": 1, "name": "Project Alpha", "department": "Development", "start_date": "2024-09-01", "end_date": "2024-12-31", "status": "Ongoing", "created_at": "2024-09-22T10:00:00.000Z", "updated_at": "2024-09-22T10:00:00.000Z" }



3. Get All Projects
-------------------
**URL:** `/projects`  
**Method:** GET  
**Description:** Retrieve a list of all projects in the system.

**Response:**
- An array of all project objects.

**Example Request:**
GET /projects


**Example Response:**
[ { "id": 1, "name": "Project Alpha", "department": "Development", "start_date": "2024-09-01", "end_date": "2024-12-31", "status": "Ongoing" }, { "id": 2, "name": "Project Beta", "department": "Marketing", "start_date": "2024-10-01", "end_date": "2025-01-31", "status": "Planned" } ]



4. Update a Project
-------------------
**URL:** `/projects/update/{id}`  
**Method:** POST  
**Description:** Update the details of a specific project.

**Parameters:**
- `id` (integer, required): The ID of the project to be updated.

**Request Body Parameters:**
- `name` (string, optional): The updated name of the project.
- `department` (string, optional): The updated department.
- `start_date` (date, optional): The updated start date.
- `end_date` (date, optional): The updated end date.
- `status` (string, optional): The updated status.

**Response:**
- The updated project object.

**Example Request:**
POST /projects/update/1 { "name": "Updated Project Alpha", "status": "Completed" }


**Example Response:**
{ "id": 1, "name": "Updated Project Alpha", "department": "Development", "start_date": "2024-09-01", "end_date": "2024-12-31", "status": "Completed", "created_at": "2024-09-22T10:00:00.000Z", "updated_at": "2024-09-23T12:00:00.000Z" }



5. Delete a Project (and Related Timesheets)
--------------------------------------------
**URL:** `/projects/delete/{id}`  
**Method:** GET  
**Description:** Delete a specific project and all related timesheets.

**Parameters:**
- `id` (integer, required): The ID of the project to be deleted.

**Response:**
- `message`: A success message indicating the project and related timesheets were deleted.

**Example Request:**
GET /projects/delete/1


**Example Response:**
{ "message": "Project and related timesheets deleted successfully" }


### Timesheet Management Endpoints
These endpoints allow for the creation, retrieval, updating, and deletion of timesheets in the system.

1. Create a New Timesheet
-------------------------
**URL:** `/timesheets/create`  
**Method:** POST  
**Description:** Create a new timesheet by providing the necessary details.

**Request Body Parameters:**
- `task_name` (string, required): The name of the task performed.
- `date` (date, required): The date the task was performed.
- `hours` (numeric, required): The number of hours spent on the task.
- `user_id` (integer, required): The ID of the user who performed the task.
- `project_id` (integer, required): The ID of the project related to the task.

**Response:**
- The created timesheet object.

**Example Request:**
POST /timesheets/create { "task_name": "Task A", "date": "2024-09-22", "hours": 8, "user_id": 1, "project_id": 2 }


**Example Response:**
{ "id": 1, "task_name": "Task A", "date": "2024-09-22", "hours": 8, "user_id": 1, "project_id": 2, "created_at": "2024-09-22T12:00:00.000Z", "updated_at": "2024-09-22T12:00:00.000Z" }



2. Get a Single Timesheet
-------------------------
**URL:** `/timesheets/{id}`  
**Method:** GET  
**Description:** Retrieve details of a specific timesheet by its ID.

**Parameters:**
- `id` (integer, required): The ID of the timesheet.

**Response:**
- The timesheet object.

**Example Request:**
GET /timesheets/1


**Example Response:**
{ "id": 1, "task_name": "Task A", "date": "2024-09-22", "hours": 8, "user_id": 1, "project_id": 2, "created_at": "2024-09-22T12:00:00.000Z", "updated_at": "2024-09-22T12:00:00.000Z" }



3. Get All Timesheets
---------------------
**URL:** `/timesheets`  
**Method:** GET  
**Description:** Retrieve a list of all timesheets in the system.

**Response:**
- An array of all timesheet objects.

**Example Request:**
GET /timesheets


**Example Response:**
[ { "id": 1, "task_name": "Task A", "date": "2024-09-22", "hours": 8, "user_id": 1, "project_id": 2, "created_at": "2024-09-22T12:00:00.000Z", "updated_at": "2024-09-22T12:00:00.000Z" }, { "id": 2, "task_name": "Task B", "date": "2024-09-23", "hours": 6, "user_id": 2, "project_id": 1, "created_at": "2024-09-23T14:00:00.000Z", "updated_at": "2024-09-23T14:00:00.000Z" } ]




4. Update a Timesheet
---------------------
**URL:** `/timesheets/update/{id}`  
**Method:** POST  
**Description:** Update the details of a specific timesheet.

**Parameters:**
- `id` (integer, required): The ID of the timesheet to be updated.

**Request Body Parameters:**
- `task_name` (string, optional): The updated name of the task.
- `date` (date, optional): The updated date of the task.
- `hours` (numeric, optional): The updated number of hours spent on the task.
- `user_id` (integer, optional): The updated user ID.
- `project_id` (integer, optional): The updated project ID.

**Response:**
- The updated timesheet object.

**Example Request:**
POST /timesheets/update/1 { "task_name": "Updated Task A", "hours": 9 }


**Example Response:**
{ "id": 1, "task_name": "Updated Task A", "date": "2024-09-22", "hours": 9, "user_id": 1, "project_id": 2, "created_at": "2024-09-22T12:00:00.000Z", "updated_at": "2024-09-23T12:00:00.000Z" }



5. Delete a Timesheet
---------------------
**URL:** `/timesheets/delete/{id}`  
**Method:** GET  
**Description:** Delete a specific timesheet from the system.

**Parameters:**
- `id` (integer, required): The ID of the timesheet to be deleted.

**Response:**
- `message`: A success message indicating the timesheet was deleted.

**Example Request:**
GET /timesheets/delete/1


**Example Response:**
{ "message": "Timesheet deleted successfully" }





Project Structure

app/Models: Contains the User, Project, and Timesheet models.
app/Http/Controllers: Houses the controllers for handling various actions.
database/migrations: Includes database migration files for setting up the schema.
resources/views: Contains the Blade template files for the application's views.


