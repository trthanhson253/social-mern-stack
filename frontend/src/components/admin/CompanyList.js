import React, { useState, useEffect, Fragment } from 'react';
import './admin.css';
import { getFilteredCompany } from '../actions/apiCore';
import { removeCompany, getHandleStatusAPI } from '../actions/apiCompany';
import { API } from '../../config';
import AddCompanyModal from './AddCompanyModal';
import { Link } from 'react-router-dom';
import EditCompanyModal from './EditCompanyModal';

const CompanyList = () => {
  const [company, setCompany] = useState([]);
  const [limit, setLimit] = useState(3);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [size, setSize] = useState(0);
  const [open, setOpen] = useState(false);
  const [slug, setSlug] = useState({});
  const [openEdit, setOpenEdit] = useState(false);
  const [companyToEdit, setCompanyToEdit] = useState([]);
  const [status, setStatus] = useState({});

  const handleChangeStatus = (e) => {
    setStatus(e.target.value);
    getHandleStatus();
  };
  console.log('status là:' + status);
  const getHandleStatus = () => {
    getHandleStatusAPI(status).then((data) => {
      setCompany(data);
      setLoading(true);
      setSize(data.size);
      setSkip(0);
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickEdit = (p) => {
    setOpenEdit(true);
    setCompanyToEdit(p);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  const loadCompany = () => {
    getFilteredCompany(skip, limit).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCompany(data.data);
        setLoading(true);
        setSize(data.size);
        setSkip(0);
      }
    });
  };
  // console.log("openEdit"+openEdit);
  // console.log("companyToEdit"+JSON.stringify(slug));

  const loadMore = () => {
    let toSkip = skip + limit;
    // console.log(newFilters);
    getFilteredCompany(toSkip, limit).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCompany([...company, ...data.data]);
        setLoading(true);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button onClick={loadMore} className="btn btn-warning mb-5">
          Load more
        </button>
      )
    );
  };
  const deleteCompany = (slug) => {
    removeCompany(slug).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadCompany();
      }
    });
  };
  const orderNumber = () => {
    for (let i = 0; i < company.length; i++) {
      return i + 1;
    }
  };
  useEffect(() => {
    loadCompany();
  }, []);
  return (
    <div className="container company-list">
      <AddCompanyModal
        open={open}
        handleClose={handleClose}
        loadCompany={loadCompany}
      />
      <EditCompanyModal
        openEdit={openEdit}
        companyToEdit={companyToEdit}
        loadCompany={loadCompany}
        handleCloseEdit={handleCloseEdit}
      />
      <div className="table-wrapper">
        <div className="table-title" style={{ background: '#FFC107' }}>
          <div className="row">
            <div className="col-sm-4">
              <h3>
                <i class="fas fa-building"></i> &nbsp;List of <b>Companies</b>(
                {company.length})
              </h3>
            </div>
            <div className="col-sm-8">
              <a href="#" className="btn btn-info" onClick={handleClickOpen}>
                <i class="fas fa-plus-circle"></i> <span>Add New Company</span>
              </a>
            </div>
          </div>
        </div>
        <div className="table-filter">
          <div className="row">
            <div className="col-sm-3">
              <div className="show-entries">
                <span>Show</span>
                <select className="form-control">
                  <option>5</option>
                  <option>10</option>
                  <option>15</option>
                  <option>20</option>
                </select>
                <span>entries</span>
              </div>
            </div>
            <div className="col-sm-9">
              <button type="button" className="btn btn-primary">
                <i className="fa fa-search" />
              </button>
              <div className="filter-group">
                <label>Name</label>
                <input type="text" className="form-control" />
              </div>
              <div className="filter-group">
                <label>Location</label>
                <select className="form-control">
                  <option>All</option>
                  <option>Berlin</option>
                  <option>London</option>
                  <option>Madrid</option>
                  <option>New York</option>
                  <option>Paris</option>
                </select>
              </div>
              <div className="filter-group">
                <label>Status</label>
                <select
                  className="form-control"
                  name="status"
                  onChange={handleChangeStatus}
                  value={status}
                >
                  <option value="2">Any</option>
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </select>
              </div>
              <span className="filter-icon">
                <i className="fa fa-filter" />
              </span>
            </div>
          </div>
        </div>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>
                <i class="fab fa-adobe"></i>Name
              </th>
              <th>
                <i class="fab fa-servicestack"></i>Type
              </th>
              <th>
                <i class="fas fa-city"></i> City
              </th>
              <th>
                <i class="fas fa-flag-usa"></i>States
              </th>
              <th>
                <i class="fas fa-grin-alt"></i>Status
              </th>
              <th>
                <i class="fas fa-dove"></i>Action
              </th>
            </tr>
          </thead>
          <tbody>
            {company.map((p, i) => (
              <tr>
                <td>{orderNumber()}</td>
                <td>
                  <img
                    src={`${API}/company/photo/${p.slug}`}
                    className="avatar"
                    alt={company.name}
                    style={{ maxHeight: '50px', maxWidth: '50px' }}
                  />{' '}
                  <b>{p.name}</b>
                </td>
                {p.type == 0 ? (
                  <td>Product</td>
                ) : p.type > 1 ? (
                  <td>Consultancy</td>
                ) : (
                  <td>Service</td>
                )}
                <td>{p.city}</td>
                <td>{p.state}</td>

                <td style={{ fontSize: '18px' }}>
                  {p.status == 1 ? (
                    <div>
                      <span class="badge badge-success">Active</span>
                    </div>
                  ) : (
                    <div>
                      <span class="badge badge-danger">Inactive</span>
                    </div>
                  )}
                </td>
                <td style={{ fontSize: '18px' }}>
                  <span
                    class="badge badge-primary"
                    onClick={() => handleClickEdit(p)}
                    style={{ cursor: 'pointer' }}
                  >
                    <i class="fas fa-edit"></i>&nbsp;Edit
                  </span>

                  <span
                    class="badge badge-danger"
                    onClick={() => deleteCompany(p.slug)}
                    style={{ cursor: 'pointer' }}
                  >
                    <i class="fas fa-trash-alt"></i>&nbsp;Delete
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="clearfix">
          <div className="hint-text">
            Showing <b>5</b> out of <b>25</b> entries
          </div>
          <ul>{loadMoreButton()}</ul>
        </div>
      </div>
    </div>
  );
};

export default CompanyList;
