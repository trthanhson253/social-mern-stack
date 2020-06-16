import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import {
  getCurrentCompany,
  getAverageRating,
  getCurrentView,
  love,
  alreadyLoved,
  isAlreadyLoved,
} from '../actions/apiCompany';
import WriteReviewModal from './WriteReviewModal';
import CommentCard from './CommentCard';
import { API } from '../../config';
import './company.css';
import moment from 'moment';
const Company = (props) => {
  const [company, setCompany] = useState({});
  const [comments, setComment] = useState([]);
  const [error, setError] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [open, setOpen] = useState(false);
  const [reload, setReload] = useState(false);
  const [avgRating, setAvgRating] = useState(false);
  const [view, setView] = useState();

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
  const loadCurrentCompany = (slug) => {
    getCurrentCompany(slug).then((data) => {
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

  const loadView = (slug) => {
    getCurrentView(slug).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        // console.log('View là:' + data);
        setView(data);
      }
    });
  };
  // console.log('rating là:' + avgRating.result);

  const toggleModalState = () => {
    setModalState(!modalState);
  };

  const handleLove = (slug) => {
    love(slug).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        alreadyLoved(data);
        loadCurrentCompany(slug);
      }
    });
  };

  useEffect(() => {
    const slug1 = props.match.params.slug;
    loadCurrentCompany(slug1);
    loadAverageRating(slug1);
    loadView(slug1);
  }, [props]);

  useEffect(() => {
    const slug1 = props.match.params.slug;
    loadCurrentCompany(slug1);
    loadAverageRating(slug1);
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
                <span>Home</span>
              </Link>
            </li>
            <li className="is-active">
              <a href="#">
                <span>
                  Review <b>{company.name}</b>{' '}
                </span>
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
                {company.name}

                <span className="company-info__rating">
                  {avgRating.result >= 1 ? (
                    <span>
                      <span className="icon is-small has-text-warning">
                        <i
                          className={
                            avgRating.result >= 1
                              ? 'fas fa-star'
                              : 'far fa-star'
                          }
                        />
                      </span>
                      <span className="icon is-small has-text-warning">
                        <i
                          className={
                            avgRating.result >= 2
                              ? 'fas fa-star'
                              : avgRating.result >= 1.5
                              ? 'fas fa-star-half-alt'
                              : 'far fa-star'
                          }
                        />
                      </span>
                      <span className="icon is-small has-text-warning">
                        <i
                          className={
                            avgRating.result >= 3
                              ? 'fas fa-star'
                              : avgRating.result >= 2.5
                              ? 'fas fa-star-half-alt'
                              : 'far fa-star'
                          }
                        />
                      </span>
                      <span className="icon is-small has-text-warning">
                        <i
                          className={
                            avgRating.result >= 4
                              ? 'fas fa-star'
                              : avgRating.result >= 3.5
                              ? 'fas fa-star-half-alt'
                              : 'far fa-star'
                          }
                        />
                      </span>
                      <span className="icon is-small has-text-warning">
                        <i
                          className={
                            avgRating.result == 5
                              ? 'fas fa-star'
                              : avgRating.result >= 4.5
                              ? 'fas fa-star-half-alt'
                              : 'far fa-star'
                          }
                        />
                      </span>
                    </span>
                  ) : (
                    <span>
                      <span className="icon is-small has-text-warning">
                        <i className="far fa-star" />
                      </span>
                      <span className="icon is-small has-text-warning">
                        <i className="far fa-star" />
                      </span>
                      <span className="icon is-small has-text-warning">
                        <i className="far fa-star" />
                      </span>
                      <span className="icon is-small has-text-warning">
                        <i className="far fa-star" />
                      </span>
                      <span className="icon is-small has-text-warning">
                        <i className="far fa-star" />
                      </span>
                    </span>
                  )}

                  <span className="company-create">
                    - <b>Posted {moment(company.createdAt).fromNow()}</b>
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
              className="button is-danger is-medium  button-review"
              onClick={handleClickOpen}
            >
              <span className="icon">
                {' '}
                <i className="fas fa-pencil-alt" />{' '}
              </span>{' '}
              <span>Write review</span>
            </button>
            &nbsp;
            <button className="button is-medium  button-subscribe">
              <span className="icon">
                {' '}
                <i className="far fa-bell" />{' '}
              </span>{' '}
              <span>Receive Notifications</span>
            </button>
          </div>
          <div className="footer-company">
            <i class="fas fa-comment-alt"></i>&nbsp; {comments.length} Comment
            {comments.length > 1 ? 's' : ''}
            &nbsp; |&nbsp;
            <i class="fas fa-share"></i>&nbsp; Share&nbsp; | &nbsp;
            <i class="fas fa-eye"></i>&nbsp; {company.view} View
            {company.view > 1 ? 's' : ''} &nbsp; | &nbsp;
            {!isAlreadyLoved(company._id) && (
              <span
                onClick={() => handleLove(company.slug)}
                style={{ cursor: 'pointer' }}
              >
                <i class="far fa-heart"></i>&nbsp;{company.love} Love
              </span>
            )}
            {isAlreadyLoved(company._id) && (
              <span style={{ color: '#BD3734' }}>
                <i class="fas fa-heart"></i>&nbsp;{company.love} Loved
              </span>
            )}
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
