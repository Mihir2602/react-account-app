import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Navbar = () => {
   // extracting logged-in user data and logout function.
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

 return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-semibold" to="/">
          <span className="text-primary">Account</span>App
        </Link>

        <div className="ms-auto d-flex align-items-center gap-3">
            {/* For a complete New user */}
          {!currentUser && (
            <>
              <Link className="nav-link" to="/register">
                Register
              </Link>
              <Link className="btn btn-primary btn-sm" to="/login">
                Login
              </Link>
            </>
          )}
      {/* For a Member User */}
          {currentUser && (
            <>
              <span className="text-muted d-none d-sm-inline">
                Hi, <strong>{currentUser.name.split(' ')[0]}</strong>
              </span>
              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
