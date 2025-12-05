# 🚀 Shoes E-Commerce App - Complete Setup Guide

A fullstack TypeScript application with React frontend and Node.js backend, featuring JWT authentication and PostgreSQL database.

---

## 📋 Table of Contents
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Testing the Application](#testing-the-application)
- [Project Structure](#project-structure)
- [Documentation](#documentation)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **pnpm** (v8 or higher) - `npm install -g pnpm`
- **Docker** (for PostgreSQL) - [Download](https://www.docker.com/)
- **Git** (optional) - [Download](https://git-scm.com/)

Verify installations:
```bash
node --version    # Should be v18+
pnpm --version    # Should be v8+
docker --version  # Should be installed
```

---

## 🏃 Quick Start

### 1. Backend Setup (5 minutes)

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start PostgreSQL database
npm run db:start

# Wait ~10 seconds for DB to initialize, then run migrations
npm run prisma:migrate

# Seed database with demo data
npm run prisma:seed

# Start development server
npm run dev
```

**Backend will be running at**: `http://localhost:5000`

**Demo credentials**:
- Email: `demo@example.com`
- Password: `password123`

---

### 2. Frontend Setup (3 minutes)

Open a **new terminal window**:

```bash
# Navigate to frontend directory
cd frontend/vite-project

# Install dependencies
pnpm install

# Start development server
pnpm run dev
```

**Frontend will be running at**: `http://localhost:5173`

---

### 3. Access the Application

Open your browser and go to: **http://localhost:5173**

**Login with demo credentials**:
- Email: `demo@example.com`
- Password: `password123`

Or create a new account by clicking "Register"

---

## 🔧 Backend Setup (Detailed)

### Directory Structure
```
backend/
├── src/                    # Source code
├── prisma/                 # Database schema & migrations
├── docker-compose.yml      # PostgreSQL configuration
├── .env                    # Environment variables
└── package.json
```

### Step-by-Step Setup

#### 1. Install Dependencies
```bash
cd backend
npm install
```

#### 2. Configure Environment
The `.env` file is already configured with defaults:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/shoes_ecommerce"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_EXPIRES_IN="7d"
PORT=5000
NODE_ENV="development"
CORS_ORIGIN="http://localhost:5173"
```

**For production**: Change `JWT_SECRET` to a strong random string.

#### 3. Start PostgreSQL
```bash
npm run db:start
```

This starts a PostgreSQL container in the background. To verify:
```bash
docker ps
```

You should see a container named `shoes-ecommerce-db` running.

#### 4. Run Database Migrations
```bash
npm run prisma:migrate
```

This creates the database schema (users and shoes tables).

#### 5. Seed Database (Optional)
```bash
npm run prisma:seed
```

Creates a demo user and 3 sample shoes.

#### 6. Start Development Server
```bash
npm run dev
```

Server should start on port 5000.

### Available Backend Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Compile TypeScript |
| `npm start` | Run production build |
| `npm run db:start` | Start PostgreSQL container |
| `npm run db:stop` | Stop PostgreSQL container |
| `npm run prisma:migrate` | Run database migrations |
| `npm run prisma:seed` | Seed demo data |
| `npm run prisma:studio` | Open Prisma Studio (GUI) |

### Testing Backend API

#### Health Check
```bash
curl http://localhost:5000/health
```

Expected response:
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

#### Register New User
```bash
curl -X POST http://localhost:5000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

#### Login
```bash
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "demo@example.com",
    "password": "password123"
  }'
```

Copy the `token` from the response for the next requests.

#### Get Shoes (requires authentication)
```bash
curl http://localhost:5000/shoes \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 🎨 Frontend Setup (Detailed)

### Directory Structure
```
frontend/vite-project/
├── src/
│   ├── components/         # React components
│   ├── services/           # API services
│   ├── context/            # React Context
│   ├── hooks/              # Custom hooks
│   ├── types/              # TypeScript types
│   └── utils/              # Utilities
├── .env                    # Environment variables
└── package.json
```

### Step-by-Step Setup

#### 1. Install Dependencies
```bash
cd frontend/vite-project
pnpm install
```

#### 2. Configure Environment
The `.env` file is already configured:
```env
VITE_API_URL=http://localhost:5000
```

**For production**: Update this to your production API URL.

#### 3. Start Development Server
```bash
pnpm run dev
```

Application should open at `http://localhost:5173`

### Available Frontend Commands

| Command | Description |
|---------|-------------|
| `pnpm run dev` | Start dev server with HMR |
| `pnpm run build` | Build for production |
| `pnpm run preview` | Preview production build |
| `pnpm run lint` | Run ESLint |

---

## 🧪 Testing the Application

### User Flow Test

1. **Register a New Account**
   - Go to http://localhost:5173
   - Click "Register"
   - Enter email and password (min 6 chars)
   - Click "Register" button
   - You should be logged in automatically

2. **Add a Shoe**
   - Fill in shoe name (e.g., "Air Max 90")
   - Fill in brand (e.g., "Nike")
   - Click "Add Shoe"
   - Shoe should appear in the list below

3. **Delete a Shoe**
   - Click "Delete" on any shoe
   - Confirm deletion by clicking "Yes"
   - Shoe should disappear from the list

4. **Logout**
   - Click "Logout" in the header
   - You should be redirected to login page

5. **Login with Existing Account**
   - Enter your email and password
   - Click "Login"
   - You should see your shoe collection

---

## 📁 Project Structure

```
shoes-ecomerce/
├── backend/                          # Node.js + Express API
│   ├── src/
│   │   ├── server.ts                 # Entry point
│   │   ├── app.ts                    # Express config
│   │   ├── routes/                   # API routes
│   │   ├── controllers/              # Request handlers
│   │   ├── services/                 # Business logic
│   │   ├── middlewares/              # Auth, validation, errors
│   │   ├── config/                   # Database config
│   │   └── utils/                    # JWT, password utils
│   ├── prisma/
│   │   ├── schema.prisma             # DB schema
│   │   └── seed.ts                   # Demo data
│   └── docker-compose.yml            # PostgreSQL
│
├── frontend/vite-project/            # React + TypeScript
│   ├── src/
│   │   ├── App.tsx                   # Main component
│   │   ├── components/
│   │   │   ├── auth/                 # Login/Register
│   │   │   └── shoes/                # Shoes components
│   │   ├── services/                 # API integration
│   │   ├── context/                  # Global state
│   │   ├── hooks/                    # Custom hooks
│   │   └── types/                    # TypeScript interfaces
│   └── .env
│
├── README.md                         # Original requirements
├── SETUP_GUIDE.md                    # This file
├── BACKEND_IMPLEMENTATION.md         # Backend docs
└── FRONTEND_IMPLEMENTATION.md        # Frontend docs
```

---

## 📚 Documentation

- **[BACKEND_IMPLEMENTATION.md](./BACKEND_IMPLEMENTATION.md)** - Complete backend architecture, API endpoints, security
- **[FRONTEND_IMPLEMENTATION.md](./FRONTEND_IMPLEMENTATION.md)** - Component structure, state management, styling

---

## 🐛 Troubleshooting

### Backend Issues

#### Issue: "Port 5000 is already in use"
```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>

# Or change port in backend/.env
PORT=5001
```

#### Issue: "Database connection failed"
```bash
# Check if PostgreSQL is running
docker ps

# If not, start it
npm run db:start

# Check logs
docker logs shoes-ecommerce-db
```

#### Issue: "Prisma migration failed"
```bash
# Reset database
npm run db:stop
npm run db:start

# Wait 10 seconds, then migrate again
npm run prisma:migrate
```

---

### Frontend Issues

#### Issue: "Network Error" when making API calls
- **Check**: Is backend running on port 5000?
- **Check**: Is `VITE_API_URL` correct in `.env`?
- **Check**: CORS configuration in backend

```bash
# Verify backend is running
curl http://localhost:5000/health
```

#### Issue: "401 Unauthorized" errors
- Token expired or invalid
- **Solution**: Logout and login again

#### Issue: Blank screen after login
- **Check**: Browser console for errors
- **Check**: Network tab for failed API calls
- **Solution**: Verify API responses are correct format

#### Issue: Styles not loading
- **Check**: CSS files are imported in components
- **Solution**: Restart Vite dev server

```bash
# Stop server (Ctrl+C), then restart
pnpm run dev
```

---

### Docker Issues

#### Issue: Docker not running
```bash
# Start Docker Desktop application
# Or on Linux:
sudo systemctl start docker
```

#### Issue: Port 5432 already in use
```bash
# Another PostgreSQL instance is running
# Option 1: Stop other PostgreSQL
brew services stop postgresql  # macOS
sudo systemctl stop postgresql # Linux

# Option 2: Change port in docker-compose.yml and .env
```

---

## 🔒 Security Notes

### Development
- Default credentials are for **development only**
- JWT secret should be changed in production
- PostgreSQL uses default credentials (postgres/postgres)

### Production Checklist
- [ ] Change `JWT_SECRET` to strong random string
- [ ] Use environment-specific database credentials
- [ ] Enable HTTPS
- [ ] Use managed PostgreSQL service (not Docker)
- [ ] Add rate limiting
- [ ] Implement proper logging
- [ ] Set up monitoring

---

## 🚀 Production Deployment

### Backend
1. Build TypeScript: `npm run build`
2. Deploy to server (Heroku, Railway, DigitalOcean)
3. Use managed PostgreSQL (AWS RDS, DigitalOcean)
4. Set environment variables on platform
5. Run migrations: `npm run prisma:migrate`

### Frontend
1. Build: `pnpm run build`
2. Deploy to Vercel/Netlify
3. Update `VITE_API_URL` to production backend URL

---

## 📝 Next Steps

After successfully running the app:

1. **Read the documentation**:
   - [BACKEND_IMPLEMENTATION.md](./BACKEND_IMPLEMENTATION.md)
   - [FRONTEND_IMPLEMENTATION.md](./FRONTEND_IMPLEMENTATION.md)

2. **Explore the codebase**:
   - Backend architecture (routes → controllers → services)
   - Frontend component structure
   - Authentication flow

3. **Extend functionality**:
   - Add shoe images
   - Implement search/filter
   - Add pagination
   - Create shoe details page

4. **Run tests** (recommended to add):
   - Backend: API endpoint tests
   - Frontend: Component tests
   - E2E: Full user flows

---

## 🆘 Getting Help

If you encounter issues:

1. Check this troubleshooting section
2. Review error messages in terminal/console
3. Check browser DevTools Network tab
4. Verify all services are running
5. Check documentation files

---

## ✅ Verification Checklist

After setup, verify everything works:

- [ ] Backend server starts on port 5000
- [ ] PostgreSQL container is running
- [ ] Database migrations applied successfully
- [ ] Frontend server starts on port 5173
- [ ] Can register a new user
- [ ] Can login with credentials
- [ ] Can add a shoe
- [ ] Can delete a shoe
- [ ] Can logout
- [ ] Demo credentials work

---

**🎉 Congratulations! Your fullstack app is now running!**

Happy coding! 🚀
