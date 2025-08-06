import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <i 
                        className='fas fa-dumbbell' 
                        style={{ 
                            fontSize: '24px', 
                            color: 'white', 
                            marginRight: '0.5rem', 
                            verticalAlign: 'middle' 
                        }}
                        aria-hidden="true"
                    ></i>
                    FitnessFirst
                </Link>
                <div className="nav-links">
                    <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                        Locker Room
                    </NavLink>
                    <NavLink to="/new" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                        Create New Entry
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;