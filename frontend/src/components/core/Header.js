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
    <Fragment>
      <nav className="navbar navbar-icon-top navbar-expand-lg navbar-dark bg-dark">
        <SigninModal open={open} handleClose={handleClose} />
        <Link to="/" className="navbar-brand">
          <img alt="Logo" src={require('./logo.png')} style={{borderRadius:'5px'}} />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">
                <span className="badge badge-danger">
                  <i className="fa fa-home" /> Home
                </span>
              </a>
            </li>
            <li className="nav-item active">
              <Link to="/admin/company" className="nav-link">
                <span className="badge badge-warning">
                  <i className="far fa-building"></i> Company
                </span>
              </Link>
            </li>
            <li className="nav-item active">
              <Link to="/admin/comment" className="nav-link">
                <span className="badge badge-primary">
                  <i className="fas fa-comments"></i> Comment
                </span>
              </Link>
            </li>
              <li className="nav-item active">
              <a className="nav-link" href="#">
                <span className="badge badge-info">
                  <i className="fa fa-home" /> Request Box
                </span>
              </a>
            </li>
          </ul>
          <ul className="navbar-nav ">
            <li className="nav-item">
              <a className="nav-link" href="#">
                <i className="fa fa-bell">
                  <span className="badge badge-info">11</span>
                </i>{' '}
                Notifications
              </a>
            </li>
            
          </ul>
 <button
            className="btn btn-outline-warning my-2 my-sm-0"
            type="submit"
            
          >
            <i className="fas fa-user"></i> Send Request
          </button>
          &nbsp;&nbsp;&nbsp;
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
            onClick={handleClickOpen}
          >
            <i className="fas fa-user"></i> Login
          </button>
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;
