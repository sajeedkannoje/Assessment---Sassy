# Assessment---Sassy

Build a RESTful API for a simple task management system.

# Task Management System API

This is a RESTful API for a simple task management system built using Node.js, Express.js, and MongoDB/MySQL. It allows
users to perform CRUD (Create, Read, Update, Delete) operations on tasks while providing user authentication using JSON
Web Tokens (JWT).

## Requirements

1. **Task Management API**:
    - Implement CRUD operations for tasks with the following properties:
        - Task title
        - Task description
        - Due date
        - Status (completed or not)

2. **User Authentication**:
    - Implement user authentication with JWT.
    - Users should be able to register, log in, and log out.
    - Only authenticated users can perform CRUD operations on tasks.

3. **Error Handling**:
    - Implement proper error handling with meaningful error messages.
    - Handle common error scenarios, such as invalid input, unauthorized access, and resources not found.

4. **Database Integration**:
    - Use MongoDB/MySQL to store task and user data.
    - Design the database schema efficiently for storing and retrieving tasks.

## Technologies Used

- Node.js
- Express.js
- MongoDB/MySQL
- JSON Web Tokens (JWT)

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/sajeedkannoje/Assessment---Sassy.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Assessment---Sassy
   ```

    3. Install dependencies:

       ```bash
       npm install
       ```
       run migration for mysql
       ```bash
        `npx typeorm-ts-node-commonjs migration:run  -d src/data-source.ts`
       ```

4. Set up your database:
    - For MongoDB: Make sure MongoDB is installed and running. Configure the database connection in the `.env` file.
    - For MySQL: Install MySQL and create a new database. Configure the database connection in the `.env` file.

5. Start the server:

   ```bash
   npm start
   ```

6. Use API endpoints to interact with the task management system.

## API Endpoints

- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Log in with credentials and receive a JWT token.
- `POST /api/auth/logout`: Log out and invalidate the JWT token.
- `GET /api/tasks`: Get all tasks.
- `GET /api/tasks/:id`: Get a task by ID.
- `POST /api/tasks`: Create a new task.
- `PUT /api/tasks/:id`: Update an existing task.
- `DELETE /api/tasks/:id`: Delete a task by ID.

## Error Handling

The API provides appropriate error messages and status codes for common error scenarios, such as invalid input,
unauthorized access, and resource not found.

## Contributors

- [Sajeed Kannoje](https://github.com/sajeedkannoje)

## License

This project is licensed under the [MIT License](LICENSE).
