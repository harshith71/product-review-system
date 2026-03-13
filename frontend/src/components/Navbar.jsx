import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import './Navbar.css';

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAdmin, isLoggedIn } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">★</span>
          ReviewHub
        </Link>

        <div className="navbar-links">
          <Link to="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>Products</Link>

          {isLoggedIn ? (
            <>
              {isAdmin && (
                <Link to="/admin" className={`nav-link ${pathname === '/admin' ? 'active' : ''}`}>
                  ⊞ Admin
                </Link>
              )}
              {isAdmin && (
                <Link to="/add-product" className={`nav-link ${pathname === '/add-product' ? 'active' : ''}`}>
                  + Add Product
                </Link>
              )}
              <div className="nav-user">
                <div className="nav-avatar">{user.username[0].toUpperCase()}</div>
                <span className="nav-username">{user.username}</span>
                {isAdmin && <span className="nav-role-tag">Admin</span>}
              </div>
              <button className="btn btn-secondary btn-sm" onClick={handleLogout}>Sign out</button>
            </>
          ) : (
            <>
              <Link to="/login" className={`nav-link ${pathname === '/login' ? 'active' : ''}`}>Sign in</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
