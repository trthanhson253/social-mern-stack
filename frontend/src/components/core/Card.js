import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API } from '../../config';
import {
  getCurrentCompany,
  getAverageRating,
  love,
  alreadyLoved,
  isAlreadyLoved,
} from '../actions/apiCompany';
import Spinner from '../core/Spinner';
import moment from 'moment';

const Card = ({ company, loading }) => {
  const [comments, setComment] = useState([]);
  const [avgRating, setAvgRating] = useState(false);
  const [error, setError] = useState(false);
  const [love1, setLove1] = useState(company.love);

  const loadCurrentCompany = (slug) => {
    getCurrentCompany(slug).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setComment(data.comment);
        setLove1(data.company.love);
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
    const slug = company.slug;
    loadCurrentCompany(slug);
    loadAverageRating(slug);
  }, []);

  return (
    <div>
      {!loading ? (
        <Spinner />
      ) : (
        <div data-href="/companies/vht" className="company-item">
          <div className="company-info">
            <figure className="company-info__logo image is-64x64">
              <img
                src={`${API}/company/photo/${company.slug}`}
                alt={company.name}
                style={{ maxHeight: '100%', maxWidth: '100%' }}
              />
            </figure>
            <div className="company-info__detail">
              <h1 className="is-size-5 has-text-weight-semibold company-info__name">
                <Link to={`/companies/${company.slug}`}>{company.name}</Link>{' '}
                <span className="company-info__rating">
                  {company.avgRating >= 1 ? (
                    <span>
                      <span className="icon is-small has-text-warning">
                        <i
                          className={
                            company.avgRating >= 1
                              ? 'fas fa-star'
                              : 'far fa-star'
                          }
                        />
                      </span>
                      <span className="icon is-small has-text-warning">
                        <i
                          className={
                            company.avgRating >= 2
                              ? 'fas fa-star'
                              : company.avgRating >= 1.5
                              ? 'fas fa-star-half-alt'
                              : 'far fa-star'
                          }
                        />
                      </span>
                      <span className="icon is-small has-text-warning">
                        <i
                          className={
                            company.avgRating >= 3
                              ? 'fas fa-star'
                              : company.avgRating >= 2.5
                              ? 'fas fa-star-half-alt'
                              : 'far fa-star'
                          }
                        />
                      </span>
                      <span className="icon is-small has-text-warning">
                        <i
                          className={
                            company.avgRating >= 4
                              ? 'fas fa-star'
                              : company.avgRating >= 3.5
                              ? 'fas fa-star-half-alt'
                              : 'far fa-star'
                          }
                        />
                      </span>
                      <span className="icon is-small has-text-warning">
                        <i
                          className={
                            company.avgRating == 5
                              ? 'fas fa-star'
                              : company.avgRating >= 4.5
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
                </span>
              </h1>

              <div className="company-info__other">
                <span
                  style={{
                    marginRight: '0.3rem',
                    color: '#FF3860',
                  }}
                >
                  <span className="icon">
                    {' '}
                    <i className="fas fa-briefcase" />
                  </span>{' '}
                  {company.type == 0 ? (
                    <td>Product</td>
                  ) : company.type > 1 ? (
                    <td>Consultancy</td>
                  ) : (
                    <td>Service</td>
                  )}
                </span>
                -
                <span>
                  <span className="icon">
                    {' '}
                    <i className="fas fa-building" />{' '}
                  </span>{' '}
                  {company.city} , {company.state}
                </span>
              </div>
            </div>
          </div>

          <div
            className="level-right"
            style={{
              paddingRight: '10px',
              fontSize: 'small',
              color: 'gray',
              fontWeight: 'bold',
            }}
          >
            <b></b>
            <span>
              [Posted {moment(company.createdAt).format('MM-DD-YYYY')}]
            </span>
            &nbsp;| &nbsp;
            <i class="fas fa-comment-alt"></i>&nbsp; {comments.length} Comment
            {comments.length > 1 ? 's' : ''}&nbsp;| &nbsp;
            <i class="fas fa-share"></i>&nbsp;+Share| &nbsp;
            {!isAlreadyLoved(company._id) && (
              <span onClick={() => handleLove(company.slug)}>
                <i class="far fa-heart"></i>&nbsp;{love1} Love| &nbsp;
              </span>
            )}
            {isAlreadyLoved(company._id) && (
              <span style={{ color: '#BD3734' }}>
                <i class="fas fa-heart"></i>&nbsp;{love1} Loved| &nbsp;
              </span>
            )}
            <i class="fas fa-eye"></i>&nbsp; {company.view} View
            {company.view > 1 ? 's' : ''}| &nbsp;
            <Link to={`/companies/${company.slug}`}>
              <i class="fas fa-hand-point-right"></i>See
            </Link>
          </div>

          <br />
          <hr />
        </div>
      )}
    </div>
  );
};

export default Card;
