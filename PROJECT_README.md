# 👟 Shoes E-Commerce Fullstack Application

A production-ready fullstack TypeScript application featuring React frontend, Node.js/Express backend, PostgreSQL database, and JWT authentication.

![Tech Stack](https://img.shields.io/badge/React-19.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue)
![Prisma](https://img.shields.io/badge/Prisma-6.2.0-brightgreen)

---

## 📋 Overview

This application is a complete shoe collection management system with:
- **JWT-based authentication** (register, login, logout)
- **CRUD operations** for shoes (create, read, delete)
- **Clean architecture** following best practices
- **TypeScript** throughout the stack
- **PostgreSQL** database with Prisma ORM
- **Responsive UI** with modern CSS
- **Professional error handling** and validation

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- pnpm
- Docker (for PostgreSQL)

### Installation & Running

```bash
# 1. Start Backend
cd backend
npm install
npm run db:start          # Start PostgreSQL
npm run prisma:migrate    # Run migrations
npm run prisma:seed       # Seed demo data
npm run dev               # Start server on port 5000

# 2. Start Frontend (in new terminal)
cd frontend/vite-project
pnpm install
pnpm run dev             # Start on port 5173
```

**Access the app**: http://localhost:5173

**Demo credentials**:
- Email: `demo@example.com`
- Password: `password123`

---

## 📁 Project Structure

```
shoes-ecomerce/
├── backend/                      # Node.js + Express API
│   ├── src/
│   │   ├── routes/               # API routes
│   │   ├── controllers/          # Request handlers
│   │   ├── services/             # Business logic
│   │   ├── middlewares/          # Auth, validation, errors
│   │   └── utils/                # JWT, password utils
│   └── prisma/                   # Database schema & seeds
│
├── frontend/vite-project/        # React + TypeScript
│   ├── src/
│   │   ├── components/           # React components
│   │   ├── services/             # API integration
│   │   ├── context/              # Global state (Auth)
│   │   ├── hooks/                # Custom hooks
│   │   └── types/                # TypeScript interfaces
│
├── SETUP_GUIDE.md               # Detailed setup instructions
├── BACKEND_IMPLEMENTATION.md    # Backend architecture docs
└── FRONTEND_IMPLEMENTATION.md   # Frontend architecture docs
```

---

## 🛠 Tech Stack

### Backend
- **Runtime**: Node.js + TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL (Docker)
- **ORM**: Prisma
- **Authentication**: JWT + bcrypt
- **Validation**: Custom middleware

### Frontend
- **Framework**: React 19.2.0
- **Language**: TypeScript 5.9.3
- **Build Tool**: Vite 7.2.4
- **HTTP Client**: Axios
- **State Management**: React Context API
- **Styling**: Modern CSS (no frameworks)

---

## 🔑 Key Features

### Authentication
- User registration with email validation
- Secure login with JWT tokens
- Password hashing (bcrypt)
- Token persistence (localStorage)
- Auto-logout on token expiration

### Shoes Management
- View all shoes in a responsive grid
- Add new shoes with name and brand
- Delete shoes with confirmation
- Real-time updates (optimistic UI)
- Loading states and error handling

### Architecture
- **Clean Architecture**: Routes → Controllers → Services
- **TypeScript**: Full type safety
- **Modular Components**: Single responsibility
- **Custom Hooks**: Reusable logic
- **Error Boundaries**: Graceful error handling
- **Responsive Design**: Mobile-first approach

---

## 📡 API Endpoints

### Authentication
- `POST /auth/register` - Create account
- `POST /auth/login` - Login

### Shoes (Protected)
- `GET /shoes` - Get all shoes
- `POST /shoes` - Add new shoe
- `DELETE /shoes/:id` - Delete shoe

**Authentication**: All shoes endpoints require `Authorization: Bearer <token>` header.

---

## 🎨 UI Features

- **Gradient Design**: Modern purple gradient theme
- **Loading States**: Spinners during async operations
- **Error Messages**: User-friendly error displays
- **Confirmation Dialogs**: Delete confirmation flow
- **Responsive Layout**: Works on mobile and desktop
- **Smooth Animations**: Hover effects and transitions
- **Empty States**: Helpful messages when no data

---

## 🔒 Security

- **Password Hashing**: bcrypt with 10 salt rounds
- **JWT Authentication**: Stateless token-based auth
- **CORS Protection**: Configured for specific origins
- **SQL Injection Prevention**: Prisma parameterized queries
- **Input Validation**: Server-side and client-side
- **Authorization**: User-specific data access

---

## 📖 Documentation

Comprehensive documentation available:

1. **[SETUP_GUIDE.md](./SETUP_GUIDE.md)**
   - Complete installation instructions
   - Troubleshooting guide
   - Testing procedures

2. **[BACKEND_IMPLEMENTATION.md](./BACKEND_IMPLEMENTATION.md)**
   - Architecture overview
   - API documentation
   - Database schema
   - Security features

3. **[FRONTEND_IMPLEMENTATION.md](./FRONTEND_IMPLEMENTATION.md)**
   - Component structure
   - State management
   - Styling guide
   - User flows

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] Register new user
- [ ] Login with credentials
- [ ] Add a shoe
- [ ] View shoes list
- [ ] Delete a shoe
- [ ] Logout
- [ ] Login again (persistent session)

### API Testing

```bash
# Health check
curl http://localhost:5000/health

# Register
curl -X POST http://localhost:5000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'

# Get shoes (with token)
curl http://localhost:5000/shoes \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 🚧 Database Schema

### Users Table
```sql
id         UUID PRIMARY KEY
email      VARCHAR UNIQUE NOT NULL
password   VARCHAR NOT NULL
createdAt  TIMESTAMP
updatedAt  TIMESTAMP
```

### Shoes Table
```sql
id         UUID PRIMARY KEY
name       VARCHAR NOT NULL
brand      VARCHAR NOT NULL
userId     UUID FOREIGN KEY → users(id)
createdAt  TIMESTAMP
updatedAt  TIMESTAMP
```

---

## 🌱 Seeded Data

After running `npm run prisma:seed`, you get:

**User**:
- Email: demo@example.com
- Password: password123

**Shoes**:
- Air Jordan 1 (Nike)
- Yeezy Boost 350 (Adidas)
- Chuck Taylor All Star (Converse)

---

## 🛠 Development Workflow

### Backend Development
```bash
cd backend

# Start PostgreSQL
npm run db:start

# Run migrations
npm run prisma:migrate

# Start dev server (hot reload)
npm run dev

# Open Prisma Studio (DB GUI)
npm run prisma:studio
```

### Frontend Development
```bash
cd frontend/vite-project

# Start dev server (HMR)
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview
```

---

## 📦 Environment Variables

### Backend (.env)
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/shoes_ecommerce"
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="7d"
PORT=5000
NODE_ENV="development"
CORS_ORIGIN="http://localhost:5173"
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000
```

---

## 🐛 Common Issues & Solutions

### Backend won't start
- **Check**: Is PostgreSQL running? → `docker ps`
- **Fix**: `npm run db:start`

### Database migration fails
- **Fix**: Reset DB → `npm run db:stop && npm run db:start`, wait 10s, then `npm run prisma:migrate`

### Frontend shows network errors
- **Check**: Is backend running on port 5000?
- **Check**: CORS origin configured correctly?

### 401 Unauthorized
- **Fix**: Logout and login again (token expired)

---

## 🚀 Production Deployment

### Backend
1. Use managed PostgreSQL (AWS RDS, DigitalOcean)
2. Set strong JWT_SECRET
3. Enable HTTPS
4. Deploy to Heroku/Railway/DigitalOcean
5. Run migrations on production DB

### Frontend
1. Update `VITE_API_URL` to production backend
2. Build: `pnpm run build`
3. Deploy to Vercel/Netlify
4. Enable HTTPS

---

## 🎯 Project Requirements Met

✅ **Backend**:
- GET /shoes endpoint
- POST /shoes endpoint
- DELETE /shoes/:id endpoint
- PostgreSQL database with Prisma ORM
- Clean structure (routes/controllers/services)
- JWT authentication
- CORS handling

✅ **Frontend**:
- ShoeList component
- AddShoeForm component
- ShoeItem component
- Axios for API calls
- Error handling
- Clean, professional UI

✅ **Additional**:
- TypeScript throughout
- Environment variables
- Self-contained (Docker PostgreSQL)
- Modular architecture
- Security best practices

---

## 🔮 Future Enhancements

### Features
- [ ] Shoe images upload
- [ ] Search and filter
- [ ] Pagination
- [ ] Edit shoe functionality
- [ ] User profile page
- [ ] Password reset
- [ ] Email verification

### Technical
- [ ] Unit tests (Jest, React Testing Library)
- [ ] E2E tests (Playwright, Cypress)
- [ ] CI/CD pipeline
- [ ] Docker Compose for full stack
- [ ] API rate limiting
- [ ] Logging (Winston)
- [ ] Monitoring (Prometheus)

---

## 📝 Scripts Reference

### Backend Scripts
| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Compile TypeScript |
| `npm start` | Run production build |
| `npm run db:start` | Start PostgreSQL |
| `npm run db:stop` | Stop PostgreSQL |
| `npm run prisma:migrate` | Run migrations |
| `npm run prisma:seed` | Seed demo data |
| `npm run prisma:studio` | Open DB GUI |

### Frontend Scripts
| Command | Description |
|---------|-------------|
| `pnpm run dev` | Start dev server |
| `pnpm run build` | Build for production |
| `pnpm run preview` | Preview production build |
| `pnpm run lint` | Run ESLint |

---

## 🤝 Contributing

If extending this project:

1. Follow existing code style
2. Maintain TypeScript types
3. Add error handling
4. Update documentation
5. Test thoroughly

---

## 📄 License

MIT License - Feel free to use for learning and projects.

---

## 🙏 Acknowledgments

Built with:
- React, TypeScript, Vite
- Express, Prisma, PostgreSQL
- JWT, bcrypt, axios

---

## 📞 Support

For issues:
1. Check [SETUP_GUIDE.md](./SETUP_GUIDE.md) troubleshooting section
2. Review documentation files
3. Check browser console and server logs
4. Verify all services are running

---

**Made with ❤️ for learning fullstack development**

🚀 Happy coding!
