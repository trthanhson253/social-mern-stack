import React, { Fragment, useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { createRequest } from '../actions/apiCore';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import '../admin/admin.css';
const SendRequest = ({ openSendRequest, handleCloseSendRequest }) => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    reason: '',
    content: '',
  });

  const { name, email, reason, content } = values;

  const handleChange = (name) => (e) => {
    setValues({
      ...values,
      [name]: e.target.value,
    });
  };
  const clickSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values });
    createRequest({ name, email, reason, content }).then((data) => {
      if (data.error) {
        setValues({ ...values });
      } else {
        setValues({
          ...values,
          name: '',
          email: '',
          reason: '',
          content: '',
        });
      }
    });
    handleCloseSendRequest();
  };
  return (
    <Fragment>
      <Dialog
        open={openSendRequest}
        onClose={handleCloseSendRequest}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          <p className="modal-card-title">Send Request To Administrator</p>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>

          <div className="field">
            <label className="label">Your Name</label>
            <div className="control">
              <input
                className="input"
                name="name"
                onChange={handleChange('name')}
                value={name}
                type="text"
                placeholder="Muốn xưng tên thật thì xưng không thì thui"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Your email</label>
            <div className="control">
              <input
                className="input"
                name="email"
                type="text"
                onChange={handleChange('email')}
                value={email}
                placeholder="Your email"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">How do you want to help us today ?</label>
            <div className="control">
              <div className="select">
                <select
                  name="reason"
                  onChange={handleChange('reason')}
                  value={reason}
                >
                  <option value="Add your company to our list">
                    Add your company to our list
                  </option>
                  <option value="Report a company">Report a company</option>
                  <option value="Report a comment" selected>
                    Report a comment
                  </option>
                  <option value="Report Error">Report Error</option>
                  <option value="Others">Others</option>
                </select>
              </div>
            </div>
          </div>
          <div className="field">
            <label className="label">
              Please say something about your ideas
              <span className="has-text-danger">(Required)</span>
            </label>
            <div className="control">
              <textarea
                required
                className="textarea"
                name="content"
                onChange={handleChange('content')}
                value={content}
                placeholder="Bức xúc hay gì thì viết dài dài vô (Tối thiểu 10 kí tự). Nếu muốn xin review, cứ bấm nút [Nhận thông báo] nha!!"
              />
            </div>
          </div>

          <p className="m-t-5">
            Người đăng chịu trách nhiệm về tính xác thực của nội dung chứ
            <b>bên mình không có chịu</b>, okay?
          </p>
        </DialogContent>
        <DialogActions>
          <button
            className="button button-review-submit is-success"
            onClick={clickSubmit}
          >
            Send Request
          </button>
          <button
            onClick={handleCloseSendRequest}
            className="button button-close"
          >
            Cancel
          </button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default SendRequest;
