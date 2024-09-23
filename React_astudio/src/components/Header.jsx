import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item">
            <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              Users
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/products" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              Products
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;