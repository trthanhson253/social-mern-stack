import React, { useState, useEffect, Fragment } from 'react';

const RequestList = (props) => {
  return (
    <div className="container company-list">
      <div className="table-wrapper">
        <div className="table-title" style={{ background: '#28A745' }}>
          <div className="row">
            <div className="col-sm-4">
              <h3>
                <i class="fas fa-building"></i> &nbsp;List of <b>Request</b>
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
            <tr>
              <td>1</td>
              <td>a</td>

              <td>Product</td>

              <td>a</td>
              <td>a</td>

              <td>a</td>
              <td style={{ fontSize: '18px' }}>
                <span class="badge badge-primary" style={{ cursor: 'pointer' }}>
                  <i class="fas fa-edit"></i>&nbsp;Edit
                </span>

                <span class="badge badge-danger" style={{ cursor: 'pointer' }}>
                  <i class="fas fa-trash-alt"></i>&nbsp;Delete
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestList;
