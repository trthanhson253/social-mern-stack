import React, { useState, useEffect, Fragment } from 'react';
import {
  getRequest,
  getToggleStatus,
  removeRequest1,
} from '../actions/apiRequest';

const RequestList = () => {
  const [request, setRequest] = useState([]);
  const [error, setError] = useState(false);
  const [toggleStatus, setToggleStatus] = useState({});

  const loadRequest = () => {
    getRequest().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setRequest(data);
      }
    });
  };
  const clickToggleStatus = (idRequest, status1) => {
    getToggleStatus(idRequest, status1).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        loadRequest();
      }
    });
  };

  const removeRequest = (idRequest) => {
    removeRequest1(idRequest).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        loadRequest();
      }
    });
  };
  useEffect(() => {
    loadRequest();
  }, []);
  return (
    <div className="container company-list">
      <div className="table-wrapper">
        <div className="table-title" style={{ background: '#28A745' }}>
          <div className="row">
            <div className="col-sm-4">
              <h3>
                <i class="fas fa-building"></i> &nbsp;List of <b>Requests</b>
              </h3>
            </div>
            <div className="col-sm-8"></div>
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
                <select className="form-control" name="status">
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
                <i class="fab fa-servicestack"></i>Email
              </th>
              <th>
                <i class="fas fa-city"></i> Reason
              </th>
              <th style={{ width: '250px' }}>
                <i class="fas fa-flag-usa"></i>Content
              </th>

              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {request.map((p, i) => (
              <tr
                style={
                  p.status == 0
                    ? {
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        color: 'black',
                        background: '#C2DBFF',
                      }
                    : {
                        cursor: 'pointer',
                        background: 'white',
                      }
                }
                onClick={() => clickToggleStatus(p._id, p.status)}
              >
                <td>1</td>
                <td>{p.name}</td>

                <td>{p.email}</td>

                <td>{p.reason}</td>
                <td>{p.content}</td>
                <td style={{ fontSize: '16px' }}>
                  {' '}
                  <span
                    class="badge badge-danger"
                    style={{ cursor: 'pointer' }}
                    onClick={() => removeRequest(p._id)}
                  >
                    <i class="fas fa-trash-alt"></i>&nbsp;Delete
                  </span>
                </td>
                <td style={{ fontSize: '18px' }}>
                  {p.status == 0 ? (
                    <span
                      className="badge badge-danger"
                      style={{ cursor: 'pointer' }}
                    >
                      UNSOLVED
                    </span>
                  ) : (
                    <span
                      className="badge badge-success"
                      style={{ cursor: 'pointer' }}
                    >
                      SOLVED
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestList;
