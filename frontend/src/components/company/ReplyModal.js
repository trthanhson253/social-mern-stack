import React, { Fragment, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import { reply } from '../actions/apiCompany';

const ReplyModal = ({
  handleCloseReply,
  openReply,
  comment,
  handleReloadReply,
}) => {
  const [values, setValues] = useState({
    name: '',
    content: '',
  });
  const { name, content, reload } = values;
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
    reply({ content }, id).then((data) => {
      if (data.error) {
        setValues({ ...values });
      } else {
        setValues({
          ...values,
          reload: !reload,
          name: '',
          content: '',
        });
      }
    });
    handleCloseReply();
    handleReloadReply();
  };
  return (
    <div>
      <Fragment>
        <Dialog
          open={openReply}
          onClose={handleCloseReply}
          aria-labelledby="form-dialog-title"
        >
          <DialogContent>
            <div className="field">
              <label className="label">Tên</label>
              <div className="control">
                <input
                  className="input"
                  name="name"
                  type="text"
                  onChange={handleChange('name')}
                  value={name}
                  placeholder="Please tell us your name before writing reply "
                />
              </div>
            </div>
            <div className="field">
              <label className="label">
                Reply back <span className="has-text-danger">(Needed)</span>
              </label>
              <div className="control">
                <textarea
                  required
                  className="textarea"
                  name="content"
                  value={content}
                  onChange={handleChange('content')}
                  placeholder="Bức xúc hay gì thì viết dài dài vô (Tối thiểu 10 kí tự). Nếu muốn xin review, cứ bấm nút [Nhận thông báo] nha!!"
                  defaultValue={''}
                />
              </div>
              <p className="help is-danger is-hidden">At least 10 characters</p>
            </div>
          </DialogContent>
          <DialogActions>
            <button
              className="button button-review-submit is-success"
              onClick={clickSubmit}
            >
              Reply Back
            </button>
            <button onClick={handleCloseReply} className="button button-close">
              Cancel
            </button>
          </DialogActions>
        </Dialog>
      </Fragment>
    </div>
  );
};

export default ReplyModal;
