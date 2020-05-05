import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API } from '../../config';
import { getCurrentCompany, getAverageRating } from '../actions/apiCompany';
import Spinner from '../core/Spinner';

const Card = ({ company, loading }) => {
  const [comments, setComment] = useState([]);
  const [avgRating, setAvgRating] = useState(false);
  const [error, setError] = useState(false);

  const loadCurrentCompany = (slug) => {
    getCurrentCompany(slug).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
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
  useEffect(() => {
    const slug = company.slug;
    loadCurrentCompany(slug);
    loadAverageRating(slug);
  }, []);

  return !loading ? (
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
          <h2 className="is-size-5 has-text-weight-semibold company-info__name">
            <Link to={`/companies/${company.slug}`}>{company.name}</Link>{' '}
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
            </span>
          </div>
          <div className="company-info__location">
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
        <i class="fas fa-comment-alt"></i>&nbsp; {comments.length} Comment
        {comments.length > 1 ? 's' : ''}&nbsp;| &nbsp;
        <i class="fas fa-share"></i>&nbsp;+Share| &nbsp;
        <i class="fas fa-smile-wink"></i>&nbsp; Say Thanks| &nbsp;
        <i class="fas fa-eye"></i>&nbsp; {company.view} View
        {company.view > 1 ? 's' : ''}| &nbsp;
        <Link to={`/companies/${company.slug}`}>
          <i class="fas fa-hand-point-right"></i>See
        </Link>
      </div>
      <br />
    </div>
  );
};

export default Card;
