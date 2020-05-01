import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SigninModal from './SigninModal';

const Header = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
      <SigninModal open={open} handleClose={handleClose} />
      <ul className="navbar-nav">
        <li className="nav-item active">
          <a className="nav-link" href="#">
            [Listen-developerS]
          </a>
        </li>
        <li className="nav-item">
          <button
            type="button"
            class="btn btn-primary"
            onClick={handleClickOpen}
          >
            <i class="fas fa-user"></i> Login
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
