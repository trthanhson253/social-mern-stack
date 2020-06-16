import React, { Fragment, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import { like, alreadyLiked } from '../actions/apiCompany';

const LikeModal = ({ handleClose, open, comment, handleReload }) => {
  const [values, setValues] = useState({
    name: '',
  });
  const { name, reload } = values;
  let id = comment._id;

  const handleChange = (name) => (e) => {
    setValues({
      ...values,
      [name]: e.target.value,
    });
  };
  const clickSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values });
    like({ name }, id).then((data) => {
      if (data.error) {
        setValues({ ...values });
      } else {
        alreadyLiked(data, () => {
          setValues({
            ...values,
            reload: !reload,
            name: '',
          });
        });
      }
    });
    handleClose();
    handleReload();
  };
  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <div className="field">
            <label className="label">
              Please tell us your name before clicking like button
            </label>
            <div className="control">
              <input
                className="input"
                name="name"
                type="text"
                onChange={handleChange('name')}
                value={name}
                placeholder="Xưng tên trước khi like "
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <button
            className="button button-review-submit is-success"
            onClick={clickSubmit}
          >
            <i className="fas fa-thumbs-up" />{' '}
          </button>
          <button onClick={handleClose} className="button button-close">
            Hủy
          </button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default LikeModal;
