import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import SigninModal from './SigninModal';
import SendRequest from './SendRequest';
import { isAuthenticated, signout } from '../actions/apiAuth';

const Header = ({ history }) => {
  const [open, setOpen] = useState(false);
  const [openSendRequest, setOpenSendRequest] = useState(false);

  const handleClickOpenSendRequest = () => {
    setOpenSendRequest(true);
  };
  const handleCloseSendRequest = () => {
    setOpenSendRequest(false);
  };
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
        <SendRequest
          openSendRequest={openSendRequest}
          handleCloseSendRequest={handleCloseSendRequest}
        />
        <Link to="/" className="navbar-brand">
          <img
            alt="Logo"
            src={require('./logo.png')}
            style={{ borderRadius: '5px' }}
          />
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
            {isAuthenticated() && isAuthenticated().user.role === 1 && (
              <React.Fragment>
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
                  <Link to="/admin/request" className="nav-link">
                    <span className="badge badge-success">
                      <i class="fas fa-box-open"></i> Request Box
                    </span>
                  </Link>
                </li>
              </React.Fragment>
            )}
          </ul>
          {!isAuthenticated() && (
            <Fragment>
              <button
                className="btn btn-outline-warning my-2 my-sm-0"
                type="submit"
                onClick={handleClickOpenSendRequest}
              >
                <i class="fas fa-star"></i> Send Request
              </button>
              &nbsp;&nbsp;&nbsp;
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit"
                onClick={handleClickOpen}
              >
                <i className="fas fa-user"></i> Login
              </button>
            </Fragment>
          )}
          {isAuthenticated() && (
            <Fragment>
              <button
                className="btn btn-outline-danger my-2 my-sm-0"
                type="submit"
                onClick={() =>
                  signout(() => {
                    history.push('/');
                  })
                }
              >
                <i className="fas fa-user"></i> Logout
              </button>
            </Fragment>
          )}
        </div>
      </nav>
    </Fragment>
  );
};

export default withRouter(Header);
