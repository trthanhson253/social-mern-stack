import React, { Fragment, useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { isAuthenticated } from '../actions/apiAuth';
import { editSingleCompany } from '../actions/apiCompany';
import { STATES } from '../../config';
import { API } from '../../config';

const EditCompanyModal = ({
  openEdit,
  handleCloseEdit,
  companyToEdit,
  loadCompany,
}) => {
  const [values, setValues] = useState({
    name: '',
    type: '',
    city: '',
    state: '',
    photo: '',
    status: '',
    error: '',
    formData: '',
  });
  // console.log("companyToEdit"+companyToEdit.name);
  // console.log("openEdit"+openEdit);
  // const initCompany = (slug) => {
  //   singleCompany(slug).then((data) => {
  //     if (data.error) {
  //       console.log(data.error);
  //     } else {
  //       setValues({ ...values });
  //     }
  //   });
  // };
  const { name, type, city, state, photo, status, error, formData } = values;

  const handleChange = (name) => (event) => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };
  const clickEdit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: '' });

    editSingleCompany(companyToEdit.slug, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: '',
          type: '',
          city: '',
          state: '',
          photo: '',
          status: '',
        });
        loadCompany();
        handleCloseEdit();
      }
    });
  };

  useEffect(() => {
    setValues({
      name: companyToEdit.name,
      type: companyToEdit.type,
      city: companyToEdit.city,
      state: companyToEdit.state,
      photo: companyToEdit.photo,
      status: companyToEdit.status,
      formData: new FormData(),
    });
  }, [openEdit]);
  return (
    <Fragment>
      <Dialog
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <div class="container">
            <div className="row justify-content-center">
              <div className="col-md-12">
                <div className="card">
                  <header
                    className="card-header"
                    style={{ background: '#0069D9', color: 'white' }}
                  >
                    <h4 className="card-title mt-2">
                      <i class="fas fa-edit"></i>&nbsp;Edit Company
                    </h4>
                  </header>
                  <article className="card-body">
                    <form>
                      <div className="form-row">
                        <div className="col form-group">
                          <label>Name of Company </label>
                          <input
                            name="name"
                            type="text"
                            className="form-control"
                            placeholder="Name of Company"
                            onChange={handleChange('name')}
                            value={name}
                          />
                        </div>
                        {/* form-group end.// */}
                        <div className="form-group col-md-6">
                          <label>Type</label>
                          <select
                            name="type"
                            id="inputState"
                            className="form-control"
                            onChange={handleChange('type')}
                            value={type}
                          >
                            <option> Choose...</option>
                            <option value="0">Product</option>
                            <option value="1">Service</option>
                            <option value="2">Consultancy</option>
                          </select>
                        </div>
                        {/* form-group end.// */}
                      </div>
                      {/* form-row end.// */}
                      <div className="form-group">
                        <label>Photo</label>
                        <br />
                        <img
                          src={`${API}/company/photo/${companyToEdit.slug}`}
                          className="avatar"
                          alt={companyToEdit.name}
                          style={{ maxHeight: '100px', maxWidth: '100px' }}
                        />
                        <br />
                        <input
                          onChange={handleChange('photo')}
                          type="file"
                          name="photo"
                          accept="image/*"
                        />
                        <small className="form-text text-muted">
                          The image size must be less than 1 MB.
                        </small>
                      </div>
                      {/* form-group end.// */}
                      <div className="form-row">
                        {' '}
                        <div className="form-group col-md-6">
                          <label>Status</label>
                          <select
                            name="status"
                            id="inputState"
                            className="form-control"
                            onChange={handleChange('status')}
                            value={status}
                          >
                            <option> Choose...</option>
                            <option value="1">Active</option>
                            <option value="0">Inactive</option>
                          </select>
                        </div>
                      </div>

                      {/* form-group end.// */}
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label>City</label>
                          <input
                            name="city"
                            type="text"
                            className="form-control"
                            onChange={handleChange('city')}
                            value={city}
                          />
                        </div>
                        {/* form-group end.// */}
                        <div className="form-group col-md-6">
                          <label>States</label>
                          <select
                            name="state"
                            className="form-control"
                            onChange={handleChange('state')}
                            value={state}
                          >
                            <option value="">Choose</option>
                            {STATES.map((p, i) => (
                              <option value={p.abbreviation} key={i}>
                                {p.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        {/* form-group end.// */}
                      </div>

                      <div className="form-group">
                        <button
                          type="submit"
                          className="btn btn-primary btn-block"
                          onClick={clickEdit}
                        >
                          {' '}
                          Edit{' '}
                        </button>
                      </div>
                      {/* form-group// */}
                    </form>
                  </article>
                </div>
                {/* card.// */}
              </div>
              {/* col.//*/}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default EditCompanyModal;
