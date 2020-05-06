import React, { Fragment, useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { signin, authenticate, isAuthenticated } from '../actions/apiAuth';
import DialogContent from '@material-ui/core/DialogContent';
import './Home.css';
import { Redirect } from 'react-router-dom';

const SigninModal = ({ open, handleClose }) => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    redirectToReferrer: false,
  });

  const { email, password, redirectToReferrer } = values;
  const { user } = isAuthenticated();

  const handleChange = (name) => (e) => {
    setValues({
      ...values,
      [name]: e.target.value,
    });
  };
  const clickSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values });
    signin({ email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToReferrer: true,
            username: '',
            password: '',
          });
        });
      }
    });

    handleClose();
  };

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user && user.role === 1) {
        return <Redirect to="/" />;
      } else {
        return <Redirect to="/" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <div className="login-form">
            <form onSubmit={clickSubmit}>
              <h2 className="text-center">
                <i class="fas fa-user-circle"></i> Login [Admin Only]{' '}
              </h2>
              <div className="form-group">
                <input
                  type="text"
                  name="email"
                  value={email}
                  onChange={handleChange('email')}
                  className="form-control"
                  placeholder="Email"
                  required="required"
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleChange('password')}
                  className="form-control"
                  placeholder="Password"
                  required="required"
                />
              </div>
              <div className="form-group">
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  onClick={clickSubmit}
                >
                  Log in
                </button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
      {redirectUser()}
    </Fragment>
  );
};

export default SigninModal;
