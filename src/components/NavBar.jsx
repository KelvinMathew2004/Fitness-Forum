import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    FitnessForum
                </Link>
                <div className="nav-links">
                    <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                        Home
                    </NavLink>
                    <NavLink to="/new" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                        Create New Post
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;