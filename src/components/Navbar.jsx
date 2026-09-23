import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="app-navbar">
            <Link to="/" className="brand">📦 InvenTrack</Link>

            {user && (
                <div className="nav-links">
                    <Link to="/">Dashboard</Link>
                    <Link to="/products">Products</Link>
                    <Link to="/categories">Categories</Link>
                    <Link to="/stock">Stock Log</Link>
                    <span className="nav-user">Hi, {user.username}</span>
                    <button className="nav-btn" onClick={handleLogout}>Logout</button>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
