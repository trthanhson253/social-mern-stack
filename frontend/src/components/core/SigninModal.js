import React, { Fragment, useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const SigninModal = ({ open, handleClose }) => {
  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <div className="container">
            <div className="row">
              <h4>
                <center> Login (Admin Only) </center>
              </h4>
            </div>

            <hr />
            <br />
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fas fa-user-tie" />
                </span>
              </div>
              <input
                type="text"
                name
                className="form-control"
                placeholder="username"
              />
            </div>
            <br />
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fa fa-key icon" />
                </span>
              </div>
              <input
                type="Password"
                name
                className="form-control"
                placeholder="password"
              />
            </div>
            <br />

            <button type="submit" className="btn btn-success">
              <i class="fas fa-sign-in-alt"></i> Login
            </button>

            <br />
            <br />
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default SigninModal;
