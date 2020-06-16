import React, { useState, useEffect } from 'react';
import { getNewestComment, removeComment } from '../actions/apiComment';
import './admin.css';

const CommentList = () => {
  const [comment, setComment] = useState([]);
  const [error, setError] = useState(false);
  // const [open, setOpen] = useState(false);
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  const loadNewestComment = () => {
    getNewestComment().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setComment(data);
      }
    });
  };

  const deleteComment = (idComment) => {
    removeComment(idComment).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        loadNewestComment();
      }
    });
  };

  useEffect(() => {
    loadNewestComment();
  }, []);
  return (
    <div>
      <div className="container company-list">
        <div className="table-wrapper">
          <div className="table-title">
            <div className="row">
              <div className="col-sm-4">
                <h2>
                  <i class="fas fa-building"></i> List of <b>Comments</b>
                </h2>
              </div>
            </div>
          </div>
          <div className="table-filter">
            <div className="row">
              <div className="col-sm-3"></div>
              <div className="col-sm-9">
                <button type="button" className="btn btn-primary">
                  <i className="fa fa-search" />
                </button>
                <div className="filter-group">
                  <label>Name</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="filter-group">
                  <label>Company</label>
                  <select className="form-control">
                    <option>All</option>
                    <option>Berlin</option>
                    <option>London</option>
                    <option>Madrid</option>
                    <option>New York</option>
                    <option>Paris</option>
                  </select>
                </div>
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
                  <i class="fab fa-servicestack"></i>Content
                </th>
                <th>
                  <i class="fas fa-city"></i> Company
                </th>
                <th>
                  <i class="fas fa-thumbtack"></i>Violate Report
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
              {comment.map((p, i) => (
                <tr>
                  <td>1</td>
                  <td>
                    <b>{p.name}</b>
                  </td>
                  <td>{p.content}</td>
                  <td>{p.company[0].name}</td>

                  <td style={{ fontSize: '18px' }}>
                    {p.violate.length}{' '}
                    <span class="badge badge-warning">
                      {p.violate.length > 0 && (
                        <i class="fas fa-eraser"> Reset To 0</i>
                      )}
                    </span>
                  </td>

                  <td>
                    <span className="status text-success">•</span> Active
                  </td>
                  <td style={{ fontSize: '18px' }}>
                    <span
                      class="badge badge-danger"
                      onClick={() => deleteComment(p._id)}
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
            <ul>Load More</ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentList;
