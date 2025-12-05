# Backend Implementation Documentation

## Overview
A production-ready Node.js + Express REST API with PostgreSQL database, implementing JWT authentication and CRUD operations for a shoe collection management system.

---

## Tech Stack
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL (via Docker)
- **ORM**: Prisma
- **Authentication**: JWT (jsonwebtoken) + bcrypt
- **Validation**: Custom middleware
- **CORS**: Enabled for frontend origin

---

## Project Structure

```
backend/
├── src/
│   ├── server.ts                  # Entry point & server initialization
│   ├── app.ts                     # Express app configuration
│   ├── config/
│   │   └── database.ts            # Prisma client singleton
│   ├── middlewares/
│   │   ├── auth.middleware.ts     # JWT token verification
│   │   ├── error.middleware.ts    # Global error handler
│   │   └── validate.middleware.ts # Request validation
│   ├── routes/
│   │   ├── auth.routes.ts         # Authentication endpoints
│   │   └── shoes.routes.ts        # Shoes CRUD endpoints
│   ├── controllers/
│   │   ├── auth.controller.ts     # Auth request handlers
│   │   └── shoes.controller.ts    # Shoes request handlers
│   ├── services/
│   │   ├── auth.service.ts        # Authentication business logic
│   │   └── shoes.service.ts       # Shoes business logic
│   ├── types/
│   │   └── express.d.ts           # TypeScript type extensions
│   └── utils/
│       ├── jwt.util.ts            # JWT token generation/verification
│       └── password.util.ts       # Password hashing/comparison
├── prisma/
│   ├── schema.prisma              # Database schema
│   └── seed.ts                    # Seed script with demo data
├── docker-compose.yml             # PostgreSQL container
├── .env                           # Environment variables
├── .env.example                   # Environment template
├── package.json
└── tsconfig.json
```

---

## API Endpoints

### Authentication Endpoints

#### `POST /auth/register`
Create a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "status": "success",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "uuid",
      "email": "user@example.com"
    }
  }
}
```

**Validation:**
- Email must be valid format
- Password must be at least 6 characters
- Email must be unique

---

#### `POST /auth/login`
Authenticate an existing user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "uuid",
      "email": "user@example.com"
    }
  }
}
```

**Errors:**
- 401: Invalid email or password

---

### Shoes Endpoints (Protected - Requires JWT)

All shoes endpoints require the `Authorization: Bearer <token>` header.

#### `GET /shoes`
Get all shoes for the authenticated user.

**Response (200):**
```json
{
  "status": "success",
  "data": [
    {
      "id": "uuid",
      "name": "Air Jordan 1",
      "brand": "Nike",
      "createdAt": "2025-12-05T08:00:00.000Z"
    }
  ]
}
```

---

#### `POST /shoes`
Create a new shoe.

**Request Body:**
```json
{
  "name": "Yeezy Boost 350",
  "brand": "Adidas"
}
```

**Response (201):**
```json
{
  "status": "success",
  "data": {
    "id": "uuid",
    "name": "Yeezy Boost 350",
    "brand": "Adidas",
    "createdAt": "2025-12-05T08:00:00.000Z"
  }
}
```

**Validation:**
- Name and brand are required
- Both must be strings

---

#### `DELETE /shoes/:id`
Delete a shoe by ID.

**Response (200):**
```json
{
  "status": "success",
  "message": "Shoe deleted successfully"
}
```

**Errors:**
- 404: Shoe not found
- 403: Not authorized (shoe belongs to another user)

---

## Database Schema

### User Table
```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  shoes     Shoe[]

  @@map("users")
}
```

### Shoe Table
```prisma
model Shoe {
  id        String   @id @default(uuid())
  name      String
  brand     String
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("shoes")
}
```

---

## Architecture Patterns

### Clean Architecture Layers

1. **Routes Layer** (`routes/`): Defines API endpoints and applies middleware
2. **Controllers Layer** (`controllers/`): Handles HTTP requests/responses
3. **Services Layer** (`services/`): Contains business logic and database operations
4. **Middlewares Layer** (`middlewares/`): Authentication, validation, error handling
5. **Utils Layer** (`utils/`): Reusable helper functions

### Benefits:
- **Separation of Concerns**: Each layer has a single responsibility
- **Testability**: Business logic is isolated from HTTP layer
- **Maintainability**: Easy to modify or extend functionality
- **Scalability**: Clear structure for adding new features

---

## Security Features

### Password Security
- **Hashing**: bcrypt with 10 salt rounds
- **No Plain Text Storage**: Passwords are never stored in plain text
- **Hash Verification**: Constant-time comparison prevents timing attacks

### JWT Authentication
- **Token-Based**: Stateless authentication
- **Expiration**: 7-day default expiration
- **Secret Key**: Environment variable configuration
- **Bearer Token**: Standard Authorization header format

### Authorization
- **User Ownership**: Shoes can only be accessed/modified by their creator
- **Protected Routes**: All shoes endpoints require authentication
- **Token Verification**: Middleware validates JWT on every protected request

### Input Validation
- **Email Format**: Validates email syntax
- **Required Fields**: Checks for missing data
- **Type Checking**: Ensures correct data types
- **SQL Injection Prevention**: Prisma ORM parameterizes queries

---

## Environment Variables

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/shoes_ecommerce"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_EXPIRES_IN="7d"
PORT=5000
NODE_ENV="development"
CORS_ORIGIN="http://localhost:5173"
```

---

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Start PostgreSQL Database
```bash
npm run db:start
```

### 3. Run Prisma Migrations
```bash
npm run prisma:migrate
```

### 4. Seed Database (Optional)
```bash
npm run prisma:seed
```

**Demo credentials:**
- Email: demo@example.com
- Password: password123

### 5. Start Development Server
```bash
npm run dev
```

Server runs on: `http://localhost:5000`

---

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run production build
- `npm run db:start` - Start PostgreSQL container
- `npm run db:stop` - Stop PostgreSQL container
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:seed` - Seed database with demo data
- `npm run prisma:studio` - Open Prisma Studio GUI

---

## Error Handling

### Global Error Handler
Centralized error handling middleware catches all errors and formats responses.

**Error Response Format:**
```json
{
  "status": "error",
  "message": "Error description"
}
```

### Custom Error Class
```typescript
class AppError extends Error {
  statusCode: number;
  isOperational: boolean;
}
```

### Common Error Codes
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid/missing token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found (resource doesn't exist)
- `409` - Conflict (duplicate email)
- `500` - Internal Server Error

---

## CORS Configuration

Configured to accept requests from the frontend origin:
```typescript
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
}));
```

---

## Best Practices Implemented

✅ **TypeScript**: Full type safety across the codebase
✅ **Environment Variables**: Sensitive data in .env files
✅ **Docker**: Containerized PostgreSQL for consistency
✅ **Prisma Migrations**: Version-controlled database schema
✅ **Clean Architecture**: Separation of concerns
✅ **Error Handling**: Centralized and consistent
✅ **Validation**: Input validation on all endpoints
✅ **Security**: JWT + bcrypt + CORS + SQL injection prevention
✅ **Logging**: Database query logging in development
✅ **Graceful Shutdown**: Proper cleanup on SIGTERM/SIGINT

---

## Testing the API

### Using cURL

**Register:**
```bash
curl -X POST http://localhost:5000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

**Login:**
```bash
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

**Get Shoes:**
```bash
curl http://localhost:5000/shoes \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Create Shoe:**
```bash
curl -X POST http://localhost:5000/shoes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"name":"Air Max 90","brand":"Nike"}'
```

**Delete Shoe:**
```bash
curl -X DELETE http://localhost:5000/shoes/SHOE_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Production Considerations

1. **Environment Variables**: Use strong JWT secret in production
2. **Database**: Use managed PostgreSQL service (AWS RDS, Digital Ocean, etc.)
3. **HTTPS**: Enable SSL/TLS for encrypted communication
4. **Rate Limiting**: Add rate limiting middleware to prevent abuse
5. **Logging**: Implement proper logging (Winston, Morgan)
6. **Monitoring**: Add health checks and monitoring (Prometheus, DataDog)
7. **Database Backups**: Regular automated backups
8. **Environment Separation**: Separate dev/staging/production databases

---

## Future Enhancements

- Password reset functionality
- Email verification
- Refresh tokens for extended sessions
- Pagination for shoes list
- Search and filtering
- Shoe images upload
- User profile management
- Role-based access control (admin/user)
- API versioning
- Request rate limiting
- Comprehensive unit and integration tests
