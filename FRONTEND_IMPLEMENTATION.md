# Frontend Implementation Documentation

## Overview
A modern, responsive React + TypeScript application with JWT authentication, implementing a complete shoe collection management interface with real-time updates and professional UI/UX.

---

## Tech Stack
- **Framework**: React 19.2.0
- **Language**: TypeScript 5.9.3
- **Build Tool**: Vite 7.2.4
- **HTTP Client**: Axios 1.13.2
- **State Management**: React Context API
- **Styling**: Pure CSS with modern features
- **Package Manager**: pnpm

---

## Project Structure

```
frontend/vite-project/
├── src/
│   ├── main.tsx                      # Entry point with providers
│   ├── App.tsx                       # Main app component with routing logic
│   ├── App.css                       # Global app styles
│   ├── components/
│   │   ├── auth/
│   │   │   ├── LoginForm.tsx         # Login form component
│   │   │   ├── RegisterForm.tsx      # Registration form component
│   │   │   └── AuthForm.css          # Authentication styles
│   │   └── shoes/
│   │       ├── ShoeList.tsx          # Shoes list container
│   │       ├── ShoeItem.tsx          # Individual shoe card
│   │       ├── AddShoeForm.tsx       # Add shoe form
│   │       └── Shoes.css             # Shoes components styles
│   ├── services/
│   │   ├── api.ts                    # Axios instance with interceptors
│   │   ├── auth.service.ts           # Authentication API calls
│   │   └── shoes.service.ts          # Shoes CRUD API calls
│   ├── context/
│   │   └── AuthContext.tsx           # Authentication state management
│   ├── hooks/
│   │   ├── useAuth.ts                # Auth context hook
│   │   └── useShoes.ts               # Shoes data management hook
│   ├── types/
│   │   └── index.ts                  # TypeScript interfaces
│   ├── utils/
│   │   └── storage.ts                # LocalStorage helpers
│   └── index.css                     # Global CSS reset
├── .env                              # Environment variables
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Component Architecture

### Component Hierarchy

```
<AuthProvider>
  <App>
    {!authenticated ? (
      <LoginForm /> or <RegisterForm />
    ) : (
      <>
        <Header with Logout />
        <AddShoeForm />
        <ShoeList>
          <ShoeItem /> (multiple)
        </ShoeList>
      </>
    )}
  </App>
</AuthProvider>
```

---

## Component Specifications

### 1. Authentication Components

#### **LoginForm**
**Location**: `src/components/auth/LoginForm.tsx`

**Features**:
- Email and password input fields
- Form validation (required fields)
- Loading state during authentication
- Error message display
- Switch to registration
- Demo credentials display

**Props**:
```typescript
interface LoginFormProps {
  onSwitchToRegister: () => void;
}
```

**State Management**:
- Local state for form fields (email, password)
- Error messages
- Loading state
- Uses `useAuth()` hook for authentication

---

#### **RegisterForm**
**Location**: `src/components/auth/RegisterForm.tsx`

**Features**:
- Email, password, and confirm password fields
- Client-side validation:
  - All fields required
  - Password length (min 6 chars)
  - Password match confirmation
- Loading state
- Error display
- Switch to login

**Props**:
```typescript
interface RegisterFormProps {
  onSwitchToLogin: () => void;
}
```

---

### 2. Shoes Management Components

#### **AddShoeForm**
**Location**: `src/components/shoes/AddShoeForm.tsx`

**Features**:
- Inline form with name and brand inputs
- Form validation
- Optimistic UI (clears form on success)
- Loading state
- Error handling

**Props**:
```typescript
interface AddShoeFormProps {
  onAddShoe: (data: { name: string; brand: string }) => Promise<void>;
}
```

---

#### **ShoeList**
**Location**: `src/components/shoes/ShoeList.tsx`

**Features**:
- Grid layout for shoe cards
- Loading state with spinner
- Error state display
- Empty state message
- Responsive design

**Props**:
```typescript
interface ShoeListProps {
  shoes: Shoe[];
  loading: boolean;
  error: string | null;
  onDelete: (id: string) => Promise<void>;
}
```

**States**:
- **Loading**: Shows spinner and message
- **Error**: Displays error message
- **Empty**: Shows prompt to add first shoe
- **Populated**: Renders grid of shoe items

---

#### **ShoeItem**
**Location**: `src/components/shoes/ShoeItem.tsx`

**Features**:
- Displays shoe name, brand, and creation date
- Delete button with confirmation flow
- Loading state during deletion
- Hover effects
- Responsive card layout

**Props**:
```typescript
interface ShoeItemProps {
  shoe: Shoe;
  onDelete: (id: string) => Promise<void>;
}
```

**User Flow**:
1. User clicks "Delete" button
2. Confirmation prompt appears ("Delete? Yes / No")
3. User confirms → Deletion executes
4. User cancels → Returns to normal state

---

## State Management

### AuthContext
**Location**: `src/context/AuthContext.tsx`

**Provides**:
```typescript
interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
}
```

**Features**:
- Persistent authentication (localStorage)
- Automatic token restoration on page load
- Global authentication state
- Login/register/logout actions

**Storage**:
- Token stored in `localStorage` as `auth_token`
- User data stored as `auth_user`
- Automatic cleanup on logout

---

### Custom Hooks

#### **useAuth()**
**Location**: `src/hooks/useAuth.ts`

**Purpose**: Provides access to authentication context

**Returns**: `AuthContextType`

**Usage**:
```typescript
const { isAuthenticated, user, login, logout } = useAuth();
```

---

#### **useShoes()**
**Location**: `src/hooks/useShoes.ts`

**Purpose**: Manages shoes data and operations

**Returns**:
```typescript
{
  shoes: Shoe[];
  loading: boolean;
  error: string | null;
  fetchShoes: () => Promise<void>;
  addShoe: (data: CreateShoeData) => Promise<Shoe>;
  removeShoe: (id: string) => Promise<void>;
}
```

**Features**:
- Automatic data fetching on mount
- Optimistic UI updates
- Error handling
- Loading states

---

## API Integration

### Axios Configuration
**Location**: `src/services/api.ts`

**Features**:
- Base URL from environment variable
- Request interceptor: Attaches JWT token to all requests
- Response interceptor: Handles 401 errors (auto-logout)

**Interceptor Flow**:

**Request**:
```
Request → Get token from localStorage → Add Authorization header → Send
```

**Response**:
```
Response → Check status → If 401 → Clear storage → Redirect to login
```

---

### Authentication Service
**Location**: `src/services/auth.service.ts`

**Methods**:
- `login(credentials)` → POST `/auth/login`
- `register(credentials)` → POST `/auth/register`

---

### Shoes Service
**Location**: `src/services/shoes.service.ts`

**Methods**:
- `getShoes()` → GET `/shoes`
- `createShoe(data)` → POST `/shoes`
- `deleteShoe(id)` → DELETE `/shoes/:id`

---

## Type System

### Core Types
**Location**: `src/types/index.ts`

```typescript
interface User {
  id: string;
  email: string;
}

interface Shoe {
  id: string;
  name: string;
  brand: string;
  createdAt: string;
}

interface AuthResponse {
  status: string;
  data: {
    token: string;
    user: User;
  };
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface CreateShoeData {
  name: string;
  brand: string;
}
```

---

## Styling Architecture

### Design System

**Color Palette**:
- Primary Gradient: `#667eea` → `#764ba2` (Purple to violet)
- Success: `#27ae60`
- Error: `#e74c3c`
- Text: `#333` (dark), `#666` (medium), `#888` (light)
- Background: `#f5f7fa`

**Typography**:
- Headings: Bold, gradient text effect
- Body: 14-16px, regular weight
- Labels: 14px, medium weight

**Spacing System**:
- Small: 8px
- Medium: 16px
- Large: 24px
- XL: 40px

**Border Radius**:
- Small: 6px
- Medium: 8px
- Large: 12px

---

### CSS Modules

#### **AuthForm.css**
- Login/Register form styling
- Gradient background
- Card-based form design
- Input focus states
- Button hover effects
- Error message styling
- Demo credentials box

#### **Shoes.css**
- Add shoe form styling
- Shoe item cards with gradient backgrounds
- Grid layout (responsive)
- Loading spinner animation
- Empty/error states
- Delete confirmation UI
- Hover effects and transitions

#### **App.css**
- Global app container
- Header sticky positioning
- Main content layout
- Responsive breakpoints
- Logout button styling

---

## Responsive Design

### Breakpoints

**Desktop** (> 768px):
- Multi-column grid for shoes
- Horizontal form layout
- Full header with all elements

**Mobile** (≤ 768px):
- Single column grid
- Vertical form stacking
- Centered header
- Full-width buttons
- Simplified navigation

---

## User Experience Features

### Loading States
- **Initial Load**: Full-page spinner
- **Authentication**: Button text changes to "Logging in..." / "Creating account..."
- **Shoes List**: Spinner with message
- **Add Shoe**: Button disabled with "Adding..." text
- **Delete Shoe**: Button shows "Deleting..." during operation

### Error Handling
- **Network Errors**: Displayed inline with red background
- **Validation Errors**: Shown before form submission
- **API Errors**: Server messages displayed to user
- **401 Errors**: Automatic logout and redirect

### Optimistic UI
- **Add Shoe**: New shoe appears immediately in list
- **Delete Shoe**: Item removed from UI before server confirmation
- **Rollback**: On error, previous state is restored

### Form UX
- **Auto-clear**: Forms reset after successful submission
- **Disabled States**: Inputs disabled during loading
- **Validation Feedback**: Real-time error messages
- **Keyboard Support**: Enter key submits forms

---

## Environment Configuration

**.env file**:
```bash
VITE_API_URL=http://localhost:5000
```

**Usage**:
```typescript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
```

---

## Setup Instructions

### 1. Install Dependencies
```bash
cd frontend/vite-project
pnpm install
```

### 2. Configure Environment
Create `.env` file with API URL pointing to backend

### 3. Start Development Server
```bash
pnpm run dev
```

Application runs on: `http://localhost:5173`

---

## Available Scripts

- `pnpm run dev` - Start development server with HMR
- `pnpm run build` - Build for production
- `pnpm run preview` - Preview production build locally
- `pnpm run lint` - Run ESLint

---

## Best Practices Implemented

✅ **TypeScript**: Full type safety across components
✅ **Component Modularity**: Small, single-responsibility components
✅ **Custom Hooks**: Reusable logic extraction
✅ **Context API**: Global state without prop drilling
✅ **Error Boundaries**: Graceful error handling
✅ **Loading States**: User feedback during async operations
✅ **Optimistic Updates**: Better perceived performance
✅ **Form Validation**: Client-side validation before API calls
✅ **Responsive Design**: Mobile-first approach
✅ **Accessibility**: Semantic HTML, labels for inputs
✅ **Clean Code**: ESLint rules enforced
✅ **Environment Variables**: Configuration separated from code

---

## User Flows

### Authentication Flow
1. User lands on login page
2. Can switch to register or use demo credentials
3. Submits credentials
4. Token stored in localStorage
5. Redirected to shoes management page

### Add Shoe Flow
1. User fills in shoe name and brand
2. Clicks "Add Shoe"
3. Form validates inputs
4. API request sent
5. New shoe appears in list immediately
6. Form clears for next entry

### Delete Shoe Flow
1. User clicks "Delete" on a shoe
2. Confirmation prompt appears
3. User confirms deletion
4. Shoe removed from UI
5. API request sent
6. On error, shoe is restored

### Logout Flow
1. User clicks "Logout"
2. Token and user data cleared from localStorage
3. Auth state resets
4. User redirected to login page

---

## Performance Optimizations

### Code Splitting
- Vite automatically splits code at route boundaries
- Lazy loading for optimal bundle size

### Memoization Opportunities
- `useCallback` for `fetchShoes` in `useShoes` hook
- Prevents unnecessary re-renders

### Network Optimization
- Axios interceptors reduce code duplication
- Single API instance shared across services
- Request/response caching potential

### Bundle Size
- Tree-shaking enabled by Vite
- Minimal dependencies
- CSS is scoped and modular

---

## Security Considerations

### Token Storage
- **Current**: localStorage (simple, works across tabs)
- **Trade-off**: Vulnerable to XSS attacks
- **Mitigation**: Sanitize all user inputs, use Content Security Policy

### CORS
- Backend must whitelist frontend origin
- Credentials included in requests

### Input Sanitization
- All user inputs validated before submission
- TypeScript prevents type-related errors

---

## Testing Recommendations

### Unit Tests
- Component rendering tests (React Testing Library)
- Hook logic tests (renderHook)
- Service function tests (mock axios)

### Integration Tests
- Authentication flow
- CRUD operations
- Error handling scenarios

### E2E Tests
- Full user journeys (Playwright, Cypress)
- Login → Add shoe → Delete shoe → Logout

---

## Future Enhancements

- **Features**:
  - Shoe images upload
  - Search and filter functionality
  - Pagination for large collections
  - Shoe details modal/page
  - Edit shoe functionality
  - Sorting options (name, brand, date)
  - Dark mode toggle

- **Performance**:
  - React Query for data caching
  - Virtualized lists for large datasets
  - Image lazy loading
  - Service worker for offline support

- **UX**:
  - Toast notifications library
  - Skeleton screens instead of spinners
  - Drag-and-drop reordering
  - Keyboard shortcuts
  - Undo/redo functionality

- **Accessibility**:
  - ARIA labels
  - Screen reader support
  - Keyboard navigation
  - Focus management

---

## Troubleshooting

### Common Issues

**Issue**: "Network Error" when making API calls
- **Solution**: Check backend is running and CORS is configured

**Issue**: 401 Unauthorized errors
- **Solution**: Token expired or invalid, logout and login again

**Issue**: Blank screen after login
- **Solution**: Check browser console for errors, verify API responses

**Issue**: Styles not loading
- **Solution**: Ensure CSS files are imported correctly in components

---

## Development Tips

1. **Use React DevTools**: Inspect component hierarchy and state
2. **Use Vite Console**: Fast HMR feedback
3. **TypeScript Strict Mode**: Catches errors early
4. **ESLint**: Follow recommended rules
5. **Browser DevTools**: Network tab for API debugging
6. **Console Logs**: Remove before production

---

## Component Communication

```
App (Router Logic)
  ↓
AuthContext (Global Auth State)
  ↓
Components consume via useAuth()

useShoes Hook (Shoes State)
  ↓
ShoeList/AddShoeForm (Props)
  ↓
ShoeItem (Props)
```

---

## Deployment Considerations

1. **Build**: `pnpm run build` generates optimized production bundle
2. **Environment**: Update `.env` with production API URL
3. **Hosting**: Deploy to Vercel, Netlify, or similar
4. **CDN**: Static assets served from CDN
5. **HTTPS**: Required for production
6. **Error Tracking**: Add Sentry or similar service

---

## Production Checklist

- [ ] Update API URL to production backend
- [ ] Remove console.log statements
- [ ] Enable production error tracking
- [ ] Test all flows in production-like environment
- [ ] Optimize images and assets
- [ ] Enable GZIP compression
- [ ] Set up monitoring and analytics
- [ ] Add meta tags for SEO
- [ ] Test on multiple browsers and devices
- [ ] Verify HTTPS and security headers
