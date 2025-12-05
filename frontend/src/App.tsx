import { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import { useShoes } from './hooks/useShoes';
import { LoginForm } from './components/auth/LoginForm';
import { RegisterForm } from './components/auth/RegisterForm';
import { AddShoeForm } from './components/shoes/AddShoeForm';
import { ShoeList } from './components/shoes/ShoeList';
import './App.css';

function App() {
  const { isAuthenticated, loading: authLoading, user, logout } = useAuth();
  const [showRegister, setShowRegister] = useState(false);
  const { shoes, loading, error, addShoe, removeShoe } = useShoes();

  if (authLoading) {
    return (
      <div className="app-loading">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="app">
        {showRegister ? (
          <RegisterForm onSwitchToLogin={() => setShowRegister(false)} />
        ) : (
          <LoginForm onSwitchToRegister={() => setShowRegister(true)} />
        )}
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>Shoe Collection Manager</h1>
          <div className="header-actions">
            <span className="user-email">Welcome, {user?.email}</span>
            <button onClick={logout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          <AddShoeForm onAddShoe={addShoe} />
          <ShoeList shoes={shoes} loading={loading} error={error} onDelete={removeShoe} />
        </div>
      </main>
    </div>
  );
}

export default App;
