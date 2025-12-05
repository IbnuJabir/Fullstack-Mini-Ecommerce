export interface User {
  id: string;
  email: string;
}

export interface Shoe {
  id: string;
  name: string;
  brand: string;
  createdAt: string;
}

export interface AuthResponse {
  status: string;
  data: {
    token: string;
    user: User;
  };
}

export interface ShoesResponse {
  status: string;
  data: Shoe[];
}

export interface ShoeResponse {
  status: string;
  data: Shoe;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
}

export interface CreateShoeData {
  name: string;
  brand: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
}
