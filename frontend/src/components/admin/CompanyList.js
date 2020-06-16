import React, { useState, useEffect, Fragment } from 'react';
import './admin.css';
import { paginationCompany } from '../actions/apiCore';
import {
  removeCompany,
  getHandleStatusAPI,
  listSearch,
} from '../actions/apiCompany';
import { API } from '../../config';
import AddCompanyModal from './AddCompanyModal';

import EditCompanyModal from './EditCompanyModal';
import CompanyStatus from './CompanyStatus';
import moment from 'moment';

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
  // const [status, setStatus] = useState({});
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [numberOfPage, setNumberOfPage] = useState(1);

  const getHandleStatus = (status1) => {
    getHandleStatusAPI(status1).then((data) => {
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

  const deleteCompany = (slug) => {
    removeCompany(slug).then((data) => {
      if (data.error) {
        // console.log(data.error);
      } else {
        loadCompany();
      }
    });
  };
  const showCompanyOrder = () => {
    return <Fragment>1</Fragment>;
  };

  const handleChange = (name) => (event) => {
    setSearch({ [name]: event.target.value });
  };

  const searchCompany = () => {
    listSearch(search).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCompany(data);
        setLoading(true);
        setSize(data.size);
        setSkip(0);
      }
    });
  };

  const loadCompany = (page) => {
    paginationCompany(page).then((data) => {
      if (data.error) {
        // console.log(data.error);
      } else {
        setCompany(data.company);
        setNumberOfPage(data.numberOfPages);
      }
    });
  };

  const paginateNumber = (number) => {
    setPage(number);
    loadCompany(number);
  };

  const showPage = () => {
    const arr = [];
    for (let i = 1; i <= numberOfPage; i++) {
      arr.push(i);
    }
    return (
      <Fragment>
        <ul className="pagination-list">
          <li>
            <a href="#" className="pagination-link" onClick={() => loadLess(1)}>
              «
            </a>
          </li>
          {arr.map((number) => (
            <li key={number}>
              <a
                href="#"
                className="pagination-link is-current"
                onClick={() => paginateNumber(number)}
              >
                {number}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#"
              className="pagination-link "
              onClick={() => loadMore(1)}
            >
              »
            </a>
          </li>
        </ul>
      </Fragment>
    );
  };

  const loadMore = (number) => {
    let toSkip = page + number;
    setPage(toSkip);
    loadCompany(toSkip);
  };

  const loadLess = (number) => {
    let toSkip = page - number;
    setPage(toSkip);
    loadCompany(toSkip);
  };
  useEffect(() => {
    loadCompany(page);
  }, []);
  useEffect(() => {
    searchCompany();
  }, [search]);
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
                <input
                  name="search"
                  type="text"
                  className="form-control"
                  placeholder="Name of Company"
                  onChange={handleChange('search')}
                />
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
              <CompanyStatus
                getHandleStatus={(filters) => getHandleStatus(filters)}
              />
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
                <i class="fas fa-flag-usa"></i>State
              </th>
              <th>
                <i class="fas fa-grin-alt"></i>Status
              </th>
              <th>
                <i class="fas fa-grin-alt"></i>Created At
              </th>
              <th>
                <i class="fas fa-dove"></i>Action
              </th>
            </tr>
          </thead>
          <tbody>
            {company.map((p, i) => (
              <tr>
                <td>{showCompanyOrder()}</td>
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
                <td>{moment(p.createdAt).format('MM-DD-YYYY')}</td>
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
        <div className="clearfix">{showPage()}</div>
      </div>
    </div>
  );
};

export default CompanyList;
