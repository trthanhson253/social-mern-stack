import React, { Fragment, useState, useEffect } from 'react';
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
            Viết Review cho công ty {company1.name}
          </p>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>

          <div className="field">
            <label className="label">Tên họ</label>
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
            <label className="label">Chức vụ</label>
            <div className="control">
              <input
                className="input"
                name="position"
                value={position}
                onChange={handleChange('position')}
                type="text"
                placeholder="Dev quèn / HR hay Manager"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">
              Review Company <span className="has-text-danger">(Bắt buộc)</span>
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
            <p className="help is-danger is-hidden">
              Nội dung tối thiếu 10 kí tự
            </p>
          </div>
          <div className="field">
            <label className="label">Cho điểm công ty</label>
            <div className="control">
              <div className="select">
                <select name="point" onChange={handleChange('point')}>
                  <option value="1">
                    1 điểm - Max sida, né gấp kẻo hối hận
                  </option>
                  <option value="2">
                    2 điểm - Hết thuốc chữa, đang tính đường chuồn
                  </option>
                  <option value="3" selected>
                    3 điểm - Cũng tạm, để coi sao
                  </option>
                  <option value="4">4 điểm - Cũng ngon, nên làm lâu dài</option>
                  <option value="5">
                    5 điểm - Công ty tuyệt cmn vời, đuổi cũng méo đi
                  </option>
                </select>
              </div>
            </div>
          </div>
          <p className="m-t-5">
            Người đăng chịu trách nhiệm về tính xác thực của nội dung chứ
            <b>bên mình không có chịu</b>, okay?
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
