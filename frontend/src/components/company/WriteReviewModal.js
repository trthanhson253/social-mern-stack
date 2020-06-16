import React, { Fragment, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { createComment } from '../actions/apiCompany';

const WriteReviewModal = ({
  open,
  company1,
  handleClose,
  handleCloseAndUpdate,
  handleReload,
}) => {
  const [values, setValues] = useState({
    name: '',
    position: '',
    point: '3',
    content: '',
  });

  const { name, position, point, content, reload } = values;

  const handleChange = (name) => (e) => {
    setValues({
      ...values,
      [name]: e.target.value,
    });
  };
  const company = company1.name;
  const clickSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values });
    createComment({ name, position, point, content, company }).then((data) => {
      if (data.error) {
        setValues({ ...values });
      } else {
        setValues({
          ...values,
          reload: !reload,
          name: '',
          position: '',
          point: '',
          content: '',
        });
      }
    });
    handleReload();
    handleCloseAndUpdate();
  };
  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          <p className="modal-card-title">
            Write review for <b>{company1.name}</b>
          </p>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Feel free to share with us what you think about this company.
          </DialogContentText>

          <div className="field">
            <label className="label">Your name</label>
            <div className="control">
              <input
                className="input"
                name="name"
                onChange={handleChange('name')}
                value={name}
                type="text"
                placeholder="If you want to tell your name ..."
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Position</label>
            <div className="control">
              <input
                className="input"
                name="position"
                value={position}
                onChange={handleChange('position')}
                type="text"
                placeholder="Fresher / Senior or Manager"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">
              Write something <span className="has-text-danger">(needed)</span>
            </label>
            <div className="control">
              <textarea
                required
                className="textarea"
                value={content}
                placeholder="Write something amazing about this company..."
                onChange={handleChange('content')}
                name="content"
              />
            </div>
            <p className="help is-danger is-hidden">
              At least 10 characters please
            </p>
          </div>
          <div className="field">
            <label className="label">Give this company a rate</label>
            <div className="control">
              <div className="select">
                <select name="point" onChange={handleChange('point')}>
                  <option value="1">1 point - WTF, avoid at no cost</option>
                  <option value="2">
                    2 points - No way, should leave as soon as possible
                  </option>
                  <option value="3" selected>
                    3 points - Average, but let time answer
                  </option>
                  <option value="4">4 points - Good for your career</option>
                  <option value="5">
                    5 points - Excellent, never leave here
                  </option>
                </select>
              </div>
            </div>
          </div>
          <p className="m-t-5">
            Reviewers will be responsible for what they write, not us, okay?
          </p>
        </DialogContent>
        <DialogActions>
          <button
            onClick={clickSubmit}
            className="button button-review-submit is-success"
          >
            Post Review
          </button>
          <button onClick={handleClose} className="button button-close">
            Cancel
          </button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};
export default WriteReviewModal;
