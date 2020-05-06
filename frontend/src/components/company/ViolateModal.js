import React, { Fragment, useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { violateReport, alreadyReport } from '../actions/apiCompany';

const ViolateModal = ({
  handleCloseViolate,
  openViolate,
  comment,
  handleReloadViolate,
}) => {
  const [values, setValues] = useState({
    content: '',
  });
  const { content, reload } = values;
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
    violateReport({ content }, id).then((data) => {
      if (data.error) {
        setValues({ ...values });
      } else {
        alreadyReport(data, () => {
          setValues({
            ...values,
            reload: !reload,
            content: '',
          });
        });
      }
    });
    handleCloseViolate();
    handleReloadViolate();
  };
  return (
    <Fragment>
      <Dialog
        open={openViolate}
        onClose={handleCloseViolate}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          <p className="modal-card-title">
            Báo cáo bình luận có nội dung vi phạm
          </p>
        </DialogTitle>
        <DialogContent>
          <div className="field">
            <label className="label">
              Lý do vi phạm <span className="has-text-danger"></span>
            </label>
            <div className="control">
              <textarea
                required
                className="textarea"
                name="content"
                value={content}
                onChange={handleChange('content')}
                placeholder="Lý do bạn nghĩ bình luận này có nội dung vi phạm(Thích thì ghi ko thì thui) "
                defaultValue={''}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <button
            className="button button-review-submit is-success"
            onClick={clickSubmit}
          >
            Báo cáo
          </button>
          <button onClick={handleCloseViolate} className="button button-close">
            Hủy
          </button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default ViolateModal;
