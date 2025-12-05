# 👟 Shoes E-Commerce Fullstack Application

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.21.2-000000?logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-6.2.0-2D3748?logo=prisma&logoColor=white)

A production-ready fullstack TypeScript application for managing a personal shoe collection, featuring JWT authentication, PostgreSQL database, and modern React UI.

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features--functionalities)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start-5-minute-setup)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-endpoints)
- [Database Schema](#-database-schema)
- [Environment Variables](#-environment-variables)
- [Available Scripts](#-available-scripts)
- [Testing](#-testing-the-application)
- [Troubleshooting](#-common-issues--troubleshooting)
- [Documentation](#-detailed-documentation)
- [Production Deployment](#-production-deployment)
- [License](#-license)

---

## 🎯 Overview

This is a complete CRUD application that allows users to:
- **Register and login** securely with JWT authentication
- **Manage their shoe collection** (add, view, delete shoes)
- **Access their data** from any device with persistent sessions
- **Experience modern UI/UX** with responsive design and optimistic updates

**Built with enterprise-level best practices:**
- Clean Architecture pattern
- TypeScript for type safety
- Docker for database containerization
- Comprehensive error handling
- Security-first approach

---

## ✨ Features & Functionalities

### 🔐 Authentication
- **User Registration**: Email/password with validation (min 6 characters)
- **Secure Login**: JWT token-based authentication
- **Password Security**: bcrypt hashing with 10 salt rounds
- **Session Persistence**: Auto-login on page refresh via localStorage
- **Auto-logout**: Invalid/expired tokens trigger re-authentication

### 👟 Shoe Management
- **View Collection**: Grid layout with responsive design
- **Add Shoes**: Quick form with name and brand fields
- **Delete Shoes**: Confirmation dialog to prevent accidental removal
- **User Isolation**: Each user sees only their own shoes
- **Real-time Updates**: Optimistic UI for instant feedback

### 🎨 User Experience
- **Loading States**: Spinners during async operations
- **Error Handling**: User-friendly error messages
- **Form Validation**: Client-side and server-side validation
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Empty States**: Helpful prompts when no data exists

### 🔒 Security Features
- JWT authentication with 7-day expiration
- Password hashing (bcrypt)
- CORS protection
- SQL injection prevention (Prisma ORM)
- Input validation and sanitization
- User ownership verification for all operations

### 🏗️ Architecture
- **Backend**: Clean Architecture (Routes → Controllers → Services)
- **Frontend**: Component-based with Context API for state management
- **Database**: PostgreSQL with Prisma migrations
- **API**: RESTful design with standardized responses

---

## 🛠 Tech Stack

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 18+ | JavaScript runtime |
| TypeScript | 5.7.2 | Type safety |
| Express | 4.21.2 | Web framework |
| PostgreSQL | 16 | Database |
| Prisma | 6.2.0 | ORM & migrations |
| jsonwebtoken | 9.0.2 | JWT auth |
| bcryptjs | 2.4.3 | Password hashing |
| cors | 2.8.5 | Cross-origin requests |
| nodemon | 3.1.9 | Hot reload |

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2.0 | UI library |
| TypeScript | 5.9.3 | Type safety |
| Vite | 7.2.4 | Build tool & dev server |
| Axios | 1.13.2 | HTTP client |
| Context API | Built-in | State management |
| CSS | Pure CSS | Styling (no frameworks) |
| ESLint | 9.39.1 | Code quality |
| pnpm | 8+ | Package manager |

### Infrastructure
- **Docker Compose**: PostgreSQL containerization
- **CORS**: Frontend (5173) ↔ Backend (5000)

---

## 🚀 Quick Start (5-Minute Setup)

### Prerequisites

Ensure you have these installed:
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **pnpm** - `npm install -g pnpm`
- **Docker** - [Download](https://www.docker.com/)

Verify installations:
```bash
node --version  # Should be v18+
pnpm --version  # Should be v8+
docker --version
```

### Backend Setup (2 minutes)

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Start PostgreSQL container
npm run db:start

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed demo data (optional)
npm run prisma:seed

# Start development server
npm run dev
```

✅ **Backend running at**: `http://localhost:5000`

### Frontend Setup (1 minute)

Open a **new terminal**:

```bash
# Navigate to frontend
cd frontend/vite-project

# Install dependencies
pnpm install

# Start development server
pnpm run dev
```

✅ **Frontend running at**: `http://localhost:5173`

### 🎉 Access the Application

Open your browser: **http://localhost:5173**

**Demo Credentials:**
- Email: `demo@example.com`
- Password: `password123`

Or create a new account by clicking "Register"!

---

## 📁 Project Structure

```
shoes-ecomerce/
├── backend/                              # Node.js + Express API
│   ├── src/
│   │   ├── server.ts                     # Entry point
│   │   ├── app.ts                        # Express configuration
│   │   ├── routes/
│   │   │   ├── auth.routes.ts            # POST /auth/register, /auth/login
│   │   │   └── shoes.routes.ts           # GET/POST/DELETE /shoes
│   │   ├── controllers/
│   │   │   ├── auth.controller.ts        # Auth request handlers
│   │   │   └── shoes.controller.ts       # Shoes request handlers
│   │   ├── services/
│   │   │   ├── auth.service.ts           # Auth business logic
│   │   │   └── shoes.service.ts          # Shoes business logic
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.ts        # JWT verification
│   │   │   ├── validate.middleware.ts    # Input validation
│   │   │   └── error.middleware.ts       # Global error handler
│   │   ├── utils/
│   │   │   ├── jwt.util.ts               # Token generation/verification
│   │   │   └── password.util.ts          # Password hashing
│   │   ├── config/
│   │   │   └── database.ts               # Prisma client
│   │   └── types/
│   │       └── index.d.ts                # TypeScript type extensions
│   ├── prisma/
│   │   ├── schema.prisma                 # Database schema
│   │   └── seed.ts                       # Demo data seed script
│   ├── docker-compose.yml                # PostgreSQL container config
│   ├── .env                              # Environment variables
│   ├── .env.example                      # Environment template
│   ├── package.json                      # Dependencies
│   └── tsconfig.json                     # TypeScript config
│
├── frontend/vite-project/                # React + TypeScript
│   ├── src/
│   │   ├── main.tsx                      # Entry point
│   │   ├── App.tsx                       # Main app component
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   │   ├── LoginForm.tsx         # Login component
│   │   │   │   ├── RegisterForm.tsx      # Registration component
│   │   │   │   └── AuthForm.css          # Auth styling
│   │   │   └── shoes/
│   │   │       ├── ShoeList.tsx          # Shoes grid container
│   │   │       ├── ShoeItem.tsx          # Individual shoe card
│   │   │       ├── AddShoeForm.tsx       # Add shoe form
│   │   │       └── Shoes.css             # Shoes styling
│   │   ├── services/
│   │   │   ├── api.ts                    # Axios instance with interceptors
│   │   │   ├── auth.service.ts           # Auth API calls
│   │   │   └── shoes.service.ts          # Shoes API calls
│   │   ├── context/
│   │   │   └── AuthContext.tsx           # Global auth state
│   │   ├── hooks/
│   │   │   ├── useAuth.ts                # Auth context hook
│   │   │   └── useShoes.ts               # Shoes data management hook
│   │   ├── types/
│   │   │   └── index.ts                  # TypeScript interfaces
│   │   ├── utils/
│   │   │   └── storage.ts                # localStorage helpers
│   │   ├── App.css                       # App-level styling
│   │   └── index.css                     # Global CSS reset
│   ├── .env                              # API URL configuration
│   ├── package.json                      # Dependencies
│   ├── tsconfig.json                     # TypeScript config
│   └── vite.config.ts                    # Vite configuration
│
├── README.md                             # This file
├── SETUP_GUIDE.md                        # Detailed setup instructions
├── BACKEND_IMPLEMENTATION.md             # Backend architecture docs
├── FRONTEND_IMPLEMENTATION.md            # Frontend architecture docs
└── PROJECT_README.md                     # Project overview
```

---

## 📡 API Endpoints

### Authentication Endpoints (Public)

#### `POST /auth/register`
Create a new user account.

**Request:**
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
- Email must be valid format and unique
- Password must be at least 6 characters

---

#### `POST /auth/login`
Authenticate existing user.

**Request:**
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

### Shoes Endpoints (Protected - JWT Required)

All shoes endpoints require `Authorization: Bearer <token>` header.

#### `GET /shoes`
Get all shoes for authenticated user.

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

**Request:**
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
- Both must be non-empty strings

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

#### `GET /health`
Health check endpoint.

**Response (200):**
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

---

## 🗄 Database Schema

### Users Table
```sql
CREATE TABLE users (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email      VARCHAR(255) UNIQUE NOT NULL,
  password   VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Shoes Table
```sql
CREATE TABLE shoes (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name       VARCHAR(255) NOT NULL,
  brand      VARCHAR(255) NOT NULL,
  user_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**Relationship:** One User has Many Shoes (1:N)

---

## 🔧 Environment Variables

### Backend (`.env`)

```env
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/shoes_ecommerce"

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_EXPIRES_IN="7d"

# Server
PORT=5000
NODE_ENV="development"

# CORS
CORS_ORIGIN="http://localhost:5173"
```

### Frontend (`.env`)

```env
# API Configuration
VITE_API_URL=http://localhost:5000
```

⚠️ **Security Note:** Change `JWT_SECRET` in production to a strong random string!

---

## 📜 Available Scripts

### Backend Commands

```bash
# Development
npm run dev              # Start dev server with hot reload (port 5000)
npm run build            # Compile TypeScript to JavaScript
npm start                # Run production build

# Database
npm run db:start         # Start PostgreSQL Docker container
npm run db:stop          # Stop PostgreSQL container
npx prisma generate      # Generate Prisma client
npm run prisma:migrate   # Run database migrations
npm run prisma:seed      # Seed database with demo data
npm run prisma:studio    # Open Prisma Studio (DB GUI)
```

### Frontend Commands

```bash
# Development
pnpm run dev             # Start dev server with HMR (port 5173)
pnpm run build           # Build for production
pnpm run preview         # Preview production build locally
pnpm run lint            # Run ESLint
```

---

## 🧪 Testing the Application

### Manual Testing Checklist

- [ ] Register a new user
- [ ] Login with credentials
- [ ] Add a shoe
- [ ] View shoes list
- [ ] Delete a shoe (with confirmation)
- [ ] Logout
- [ ] Login again (session persisted)

### API Testing with cURL

**Register:**
```bash
curl -X POST http://localhost:5000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'
```

**Login:**
```bash
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'
```

**Get Shoes (replace YOUR_TOKEN):**
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

## 🐛 Common Issues & Troubleshooting

### Backend Issues

**Port 5000 already in use:**
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or change port in backend/.env
PORT=5001
```

**Database connection failed:**
```bash
# Check if PostgreSQL container is running
docker ps

# Start container
npm run db:start

# Check logs
docker logs shoes-ecommerce-db
```

**Prisma Client not generated:**
```bash
cd backend
npx prisma generate
npx prisma migrate dev
```

### Frontend Issues

**Network Error when calling API:**
- ✅ Check backend is running on port 5000
- ✅ Verify `VITE_API_URL` in frontend/.env
- ✅ Check CORS configuration in backend

**401 Unauthorized errors:**
- Token expired or invalid
- Solution: Logout and login again

**Blank screen after login:**
- Check browser console for errors
- Verify API responses in Network tab

**PostCSS/Tailwind errors:**
```bash
# Clear Vite cache
cd frontend/vite-project
rm -rf node_modules/.vite
pnpm run dev
```

### Docker Issues

**Docker not running:**
```bash
# Start Docker Desktop app
# Or on Linux:
sudo systemctl start docker
```

**Port 5432 already in use:**
```bash
# Stop other PostgreSQL instances
brew services stop postgresql  # macOS
sudo systemctl stop postgresql # Linux
```

---

## 📚 Detailed Documentation

For in-depth information, refer to these comprehensive guides:

- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Complete installation instructions, troubleshooting, and verification
- **[BACKEND_IMPLEMENTATION.md](./BACKEND_IMPLEMENTATION.md)** - Backend architecture, security features, and best practices
- **[FRONTEND_IMPLEMENTATION.md](./FRONTEND_IMPLEMENTATION.md)** - Component structure, state management, and styling guide
- **[PROJECT_README.md](./PROJECT_README.md)** - High-level project overview and features

---

## 🚀 Production Deployment

### Backend

1. **Environment Variables:**
   - Set strong `JWT_SECRET`
   - Use managed PostgreSQL (AWS RDS, DigitalOcean, etc.)
   - Enable HTTPS

2. **Build & Deploy:**
   ```bash
   npm run build
   npm start
   ```

3. **Platforms:** Heroku, Railway, DigitalOcean, AWS

### Frontend

1. **Update API URL:**
   ```env
   VITE_API_URL=https://your-backend-domain.com
   ```

2. **Build:**
   ```bash
   pnpm run build
   ```

3. **Deploy `dist/` folder to:** Vercel, Netlify, Cloudflare Pages

---

## 🔒 Security Best Practices

✅ **Passwords** - Hashed with bcrypt (10 salt rounds)
✅ **Authentication** - JWT with expiration (7 days)
✅ **CORS** - Origin whitelist configured
✅ **SQL Injection** - Prevented via Prisma parameterized queries
✅ **Input Validation** - Server-side and client-side
✅ **Authorization** - User ownership verified for all resources

⚠️ **Production Checklist:**
- Change `JWT_SECRET` to cryptographically strong value
- Use HTTPS for all communication
- Enable rate limiting on API endpoints
- Set up monitoring and logging
- Regular security updates for dependencies

---

## 👥 Contributing

Contributions are welcome! If you'd like to improve this project:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 🆘 Support

If you encounter any issues:

1. Check the [Troubleshooting](#-common-issues--troubleshooting) section
2. Review the [detailed documentation](#-detailed-documentation)
3. Check browser DevTools console and Network tab
4. Verify all services are running
5. Open an issue on GitHub

---

## 🎉 Acknowledgments

Built with:
- [React](https://react.dev/)
- [Express](https://expressjs.com/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)

---

**Made with ❤️ By Kedir Jabir**

🚀 **Happy Coding!** :XD
