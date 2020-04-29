import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
      <ul className="navbar-nav">
        <li className="nav-item active">
          <a className="nav-link" href="#">
            [Listen-developerS]
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Admin Login
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
