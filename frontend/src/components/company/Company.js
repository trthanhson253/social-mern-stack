import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { getCurrentCompany, getAverageRating } from '../actions/apiCompany';
import WriteReviewModal from './WriteReviewModal';
import CommentCard from './CommentCard';
import { API } from '../../config';

const Company = (props) => {
  const [company, setCompany] = useState({});
  const [comments, setComment] = useState([]);
  const [error, setError] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [open, setOpen] = useState(false);
  const [reload, setReload] = useState(false);
  const [avgRating, setAvgRating] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseAndUpdate = () => {
    setOpen(false);
  };
  const handleReload = () => {
    setReload(!reload);
  };
  const loadCurrentCompany = (name) => {
    getCurrentCompany(name).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCompany(data.company);
        setComment(data.comment);
      }
    });
  };
  const loadAverageRating = (slug) => {
    getAverageRating(slug).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setAvgRating(data);
      }
    });
  };
  console.log('rating là:' + avgRating.result);
  const toggleModalState = () => {
    setModalState(!modalState);
  };

  useEffect(() => {
    const name = props.match.params.name;
    loadCurrentCompany(name);
    loadAverageRating(name);
  }, [props]);

  useEffect(() => {
    const name = props.match.params.name;
    loadCurrentCompany(name);
    loadAverageRating(name);
  }, [reload]);

  return (
    <Fragment>
      <WriteReviewModal
        open={open}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        handleCloseAndUpdate={handleCloseAndUpdate}
        company1={company}
        handleReload={handleReload}
      />
      <div className="container main-container">
        <nav
          className="breadcrumb m-b-10 m-t-10"
          aria-label="breadcrumbs"
          data-no-instant
        >
          <ul>
            <li>
              <Link to="/">
                <span className="icon is-small">
                  {' '}
                  <i className="fas fa-home" aria-hidden="true" />{' '}
                </span>
                <span>Trang chủ</span>
              </Link>
            </li>
            <li className="is-active">
              <a href="https://reviewcongty.com/companies/shb-finance#">
                <span>Review Công ty {company.name} </span>
              </a>
            </li>
          </ul>
        </nav>
        <section className="company-info-company-page">
          <div className="company-info">
            <figure className="company-info__logo image is-64x64">
              <img
                src={`${API}/company/photo/${company.slug}`}
                alt={company.name}
                style={{ maxHeight: '100%', maxWidth: '100%' }}
              />
            </figure>
            <div className="company-info__detail">
              <h2 className="is-size-5 has-text-weight-semibold company-info__name">
                <a href="https://reviewcongty.com/companies/shb-finance">
                  {company.name}
                </a>{' '}
                <span className="company-info__rating">
                {avgRating.result >= 1 ? (
                  <span>               
                  <span className="icon is-small has-text-warning">
                    <i
                      className={
                        avgRating.result >= 1 ? 'fas fa-star' : 'far fa-star'
                      }
                    />
                  </span>
                  <span className="icon is-small has-text-warning">
                    <i
                      className={
                        avgRating.result >= 2
                          ? 'fas fa-star'
                          : (avgRating.result >= 1.5
                            ? 'fas fa-star-half-alt'
                            : 'far fa-star')
                      }
                    />
                  </span>
                  <span className="icon is-small has-text-warning">
                    <i
                      className={
                        avgRating.result >= 3
                          ? 'fas fa-star'
                          : (avgRating.result >= 2.5
                            ? 'fas fa-star-half-alt'
                            : 'far fa-star')
                      }
                    />
                  </span>
                  <span className="icon is-small has-text-warning">
                    <i
                      className={
                        avgRating.result >= 4
                          ? 'fas fa-star'
                          : (avgRating.result >= 3.5
                          ? 'fas fa-star-half-alt'
                          : 'far fa-star')
                      }
                    />
                  </span>
                  <span className="icon is-small has-text-warning">
                    <i
                      className={
                        avgRating.result == 5
                          ? 'fas fa-star'
                          : (avgRating.result >= 4.5
                            ? 'fas fa-star-half-alt'
                            : 'far fa-star')
                      }
                    />
                  </span>
                </span>
                ):(
                  <span>
                  <span className="icon is-small has-text-warning">
                  <i className ="far fa-star" />
                  </span>
                  <span className="icon is-small has-text-warning">
                  <i className ="far fa-star" />
                  </span>
                  <span className="icon is-small has-text-warning">
                  <i className ="far fa-star" />
                  </span>
                  <span className="icon is-small has-text-warning">
                  <i className ="far fa-star" />
                  </span>
                  <span className="icon is-small has-text-warning">
                  <i className ="far fa-star" />
                  </span>
                  </span>
                )
                }
                  
                  <span className="company-info__rating-count">
                    ({comments.length})
                  </span>
                </span>
              </h2>
              <div className="company-info__other">
                <span style={{ marginRight: '0.3rem' }}>
                  <span className="icon">
                    {' '}
                    <i className="fas fa-briefcase" />
                  </span>{' '}
                  {company.type}
                </span>
                <span>
                  <span className="icon">
                    {' '}
                    <i className="fas fa-users" />{' '}
                  </span>{' '}
                  51-150
                </span>
              </div>
              <div className="company-info__location">
                <span>
                  <span className="icon">
                    {' '}
                    <i className="fas fa-building" />{' '}
                  </span>{' '}
                  {company.city} - {company.state}
                </span>
              </div>
            </div>
          </div>
          <div className="company-action">
            <button
              className="button is-success is-medium is-rounded button-review"
              onClick={handleClickOpen}
            >
              <span className="icon">
                {' '}
                <i className="fas fa-pencil-alt" />{' '}
              </span>{' '}
              <span>Write review</span>
            </button>
            <button className="button is-medium is-rounded button-subscribe">
              <span className="icon">
                {' '}
                <i className="far fa-bell" />{' '}
              </span>{' '}
              <span>Nhận thông báo</span>
            </button>
          </div>
        </section>
        <section className="full-reviews">
          {/* Review Page Top */}
          {comments.length > 0 ? (
            comments.map((comment, i) => (
              <CommentCard
                comment={comment}
                key={i}
                handleReload={handleReload}
              />
            ))
          ) : (
            <div>Be the first one to review this company</div>
          )}
        </section>
      </div>
    </Fragment>
  );
};

export default Company;
