# Expense Tracker API

A backend REST API for tracking personal expenses, built with **Node.js**, **Express.js**, **PostgreSQL**, **JavaScript**, and **JWT authentication**.

This project is a learning-focused backend implementation that demonstrates core API development concepts such as authentication, CRUD operations, layered architecture, repository/service separation, and centralized error handling.

## Overview

The **Expense Tracker API** allows users to register, log in, and manage their expenses through secure REST endpoints. It is designed as a clean backend project with a modular folder structure and separation of concerns across routes, controllers, services, repositories, middleware, and utility helpers.

The repository is currently a public JavaScript backend project with a small but evolving codebase. 

## Features

- User registration
- User login
- JWT-based authentication
- Protected expense routes
- Create, read, and delete expenses
- Layered backend architecture
- Repository pattern for database access
- Global error handling middleware

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/gattiktyagi/expense_tracker_api.git
cd expense_tracker_api
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
PORT=3000
DB_HOST=localhost
DB_USER=postgres
DB_PORT=5432
DB_PASS=password
DB_NAME=database_name
JWT_SECRET=your_secret_key
TOKEN_EXPIRES_IN=1d
NODE_ENV=dev
```

### 4. Run database setup
Make sure PostgreSQL is running and the required tables exist.
```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE expenses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    expense_value BIGINT NOT NULL,
    transaction_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    description TEXT,
    user_id INT NOT NULL,
    transaction_type ENUM('debit', 'credit') NOT NULL DEFAULT 'debit',

    CONSTRAINT fk_expenses_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

CREATE INDEX idx_expenses_user_id
ON expenses(user_id);
```

### 5. Start the server
```bash
npm start
```

For development:
```bash
npm run dev
```


## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL
- **Language:** JavaScript
- **Authentication:** JSON Web Tokens (JWT)
- **Data Access Pattern:** Manual SQL queries with repository layer
- **Error Handling:** Centralized error middleware + custom `AppError`

## Folder Structure

```bash
src/
├── auth/
│   ├── auth.routes.js
│   ├── auth.controller.js
│   └── auth.service.js
├── config/
│   └── db.js
├── expenses/
│   ├── expenses.controller.js
│   ├── expenses.routes.js
│   ├── expenses.service.js
│   └── expenses.repository.js
├── middlewares/
│   ├── auth.middleware.js
│   └── error.middleware.js
├── user/
│   └── user.repository.js
├── utils/
│   ├── AppError.js
│   └── asyncHandler.js
├── app.js
└── server.js
```

## Architecture

The codebase follows a simple but professional backend structure:

- **Routes** handle HTTP endpoint definitions.
- **Controllers** receive requests and send responses.
- **Services** contain business logic.
- **Repositories** handle database queries.
- **Middleware** handles cross-cutting concerns like auth and error handling.
- **Utils** contain reusable helpers such as custom error classes and async wrappers.

This separation keeps the code maintainable and makes it easier to add features later.

## API Endpoints

### Authentication

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/auth/register` | Register a new user | No |
| POST | `/api/auth/login` | Log in and receive a JWT token | No |

### Expenses

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/expenses` | Get all expenses for the authenticated user | Yes |
| GET | `/api/expenses/:id` | Get a single expense by ID | Yes |
| POST | `/api/expenses` | Create a new expense | Yes |
| DELETE | `/api/expenses/:id` | Delete an expense by ID | Yes |

## Authentication Flow

1. User registers with a username, email and password.
2. Password is stored securely in the database using password hashing with `bcrypt`.
3. User logs in with valid credentials.
4. Server returns a JWT token.
5. The token is sent in the `Authorization` header for protected routes.
6. `auth.middleware.js` verifies the token before allowing access.

## API Usage

### Register

**Request**
```http
POST /api/auth/register
Content-Type: application/json
```

```json
{
  "user": "Gattik",
  "email": "gattik@example.com",
  "password": "secret123"
}
```

**Response**
```json
{
    "message": "User created successfully",
    "userId": 1
}
```

### Login

**Request**
```http
POST /api/auth/login
Content-Type: application/json
```

```json
{
  "email": "gattik@example.com",
  "password": "secret123"
}
```

**Response**
```json
{
  "message": "Login successful",
  "token": "<JWT_TOKEN>",
  "user": {
    "id": 1,
    "email": "gattik@example.com"
  }
}
```

### Create Expense

**Request**
```http
POST /api/expenses
Authorization: Bearer <token>
Content-Type: application/json
```

```json
{
  "expenseValue": 15000,
  "description": "description",
  "transactionType": "credit"
}
```

**Response**
```json
{
    "message": "New Expense Created",
    "expense": {
      "id": 1,
      "expense_value": "15000",
      "description": "description",
      "transaction_type": "credit",
      "transaction_at": "2026-01-01T00:00:00.000Z"
    }
}
```

### Get All Expenses

**Request**
```http
GET /api/expenses
Authorization: Bearer <token>
```

**Response**
```json
{
    "message": "Expenses fetched successfully",
    "expenses": [
      {
        "id": 1,
        "expense_value": "15000",
        "description": "description",
        "transaction_type": "credit",
        "transaction_at": "2026-01-01T00:00:00.000Z"
      },
      {
        "id": 2,
        "expense_value": "10000",
        "description": "description",
        "transaction_type": "debit",
        "transaction_at": "2026-01-01T00:00:00.000Z"
      }
    ]
}
```

### Get Expense by ID

**Request**
```http
GET /api/expenses/1
Authorization: Bearer <token>
```

**Response**
```json
{
    "message": "Expense fetched successfully",
    "expense": {
        "id": 1,
        "expense_value": "15000",
        "description": "description",
        "transaction_type": "credit",
        "transaction_at": "2026-01-01T00:00:00.000Z"
    }
}
```

### Delete Expense

**Request**
```http
DELETE /api/expenses/1
Authorization: Bearer <token>
```

**Response**
```json
{
    "message": "Expense deleted successfully",
    "deletedExpense": {
        "id": 1,
        "expense_value": "15000",
        "description": "description",
        "transaction_type": "credit",
        "transaction_at": "2026-01-01T00:00:00.000Z"
    }
}
```

## Error Response Format

The API uses centralized error handling with a consistent response structure.

```json
{
  "success": false,
  "message": "Expense not found"
}
```

Example cases handled by the global error middleware:

- Invalid JWT token
- Missing authorization header
- Database errors
- Resource not found
- Unexpected server errors

## Database Notes

This project uses PostgreSQL directly without an ORM, which is a good way to understand raw SQL, query design, and data access control.

Typical entities used in this app:

- **users**
- **expenses**

A user owns multiple expenses, and expense queries should always be scoped to the authenticated user.

## Learning Focus

This project shows practice in:

- Building REST APIs with Express
- Organizing backend code into layers
- Writing SQL queries directly
- Implementing JWT authentication
- Password hashing with `bcrypt`
- Protecting routes with middleware
- Handling errors consistently
- Structuring a backend application for growth

## Future Improvements

These are the next concepts worth adding as you keep learning:

- Input validation using `express-validator`, `zod`, or `joi`
- Update expense endpoint: `PUT /api/expenses/:id`
- Pagination for `GET /api/expenses`
- Filtering by date range
- Search by title or category
- Categories table with normalized relationships
- Refresh tokens and token rotation
- Role-based access control
- Request logging with `morgan` or `winston`
- Rate limiting and brute-force protection
- Better SQL constraints and indexing
- Swagger / OpenAPI documentation
- Unit and integration tests
- Database migrations and seed scripts
- Docker support
- CI pipeline with GitHub Actions
- Better error codes and typed error responses
- Soft delete for expenses
- Audit fields like `created_at` and `updated_at`
- User profile endpoints

## Project Status

This repository is an actively improving backend learning project. The current focus is on solid fundamentals: authentication, CRUD, manual PostgreSQL access, and maintainable structure.

## License

This project is currently maintained as a personal learning repository. Add a license if you plan to share or reuse it publicly.
