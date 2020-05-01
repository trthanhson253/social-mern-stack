import React, { useState, useEffect, Fragment } from 'react';
import Card from './Card';
import {
  getCompany,
  getNewestComment,
  getFilteredCompany,
} from '../actions/apiCore';
import './Home.css';
import Search from './Search';
import NewestCommentCard from './NewestCommentCard';
import SigninModal from './SigninModal';
import { STATES } from '../../config';

const Home = () => {
  const [newestCompany, setNewestCompany] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newestComment, setNewestComment] = useState([]);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(3);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [open, setOpen] = useState(false);

  var states = STATES;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const loadNewestCompany = () => {
    getFilteredCompany(skip, limit).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setNewestCompany(data.data);
        setLoading(true);
        setSize(data.size);
        setSkip(0);
      }
    });
  };
  const loadNewestComment = () => {
    getNewestComment().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setNewestComment(data);
      }
    });
  };
  const loadMore = () => {
    let toSkip = skip + limit;
    // console.log(newFilters);
    getFilteredCompany(toSkip, limit).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setNewestCompany([...newestCompany, ...data.data]);
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
  useEffect(() => {
    loadNewestCompany();
    loadNewestComment();
  }, []);

  return (
    <div>
      <div className="container main-container">
        <section className="hero-img">
          <div className="hero-img__gradient" />

          <img alt="a" src={require('../../static/img/banner.jpg')} />
        </section>
        <section className="hero">
          <div className="hero-body z-1">
            <h1 className="title has-text-white">[Listen developerS]</h1>
            <div>
              <Search />
            </div>
          </div>
        </section>
        <div className="columns">
          <section className="companies column is-three-fifths">
            <div className="tabs" style={{ 'font-size': 'small' }}>
              <ul>
                <li data-tab="top-comments" className="tab is-active">
                  <a href="#" className="has-text-weight-bold">
                    <span className="icon has-text-info">
                      {' '}
                      <i className="fas fa-comments" />{' '}
                    </span>{' '}
                    Newest
                  </a>
                </li>
                <li data-tab="top-companies" className="tab ">
                  <a href="#" className="has-text-weight-bold">
                    <span className="icon has-text-success">
                      {' '}
                      <i className="fas fa-thumbs-up" />{' '}
                    </span>{' '}
                    Top Companies
                  </a>
                </li>
                <li data-tab="worst-companies" className="tab ">
                  <a href="#" className="has-text-weight-bold">
                    <span className="icon has-text-danger">
                      {' '}
                      <i className="fas fa-thumbs-down" />{' '}
                    </span>{' '}
                    Avoid These Companies
                  </a>
                </li>
                <div>
                  <span className="icon has-text-info">
                    <i class="fas fa-filter" />
                  </span>
                  Quick Filter :
                  <select style={{ width: '100px' }}>
                    <option value="states">By States</option>
                    {states.map((p, i) => (
                      <option value="p.abbreviation" key={i}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
              </ul>
            </div>

            <div className="tabs-section">
              {newestCompany.map((company, i) => (
                <div key={i}>
                  <Card company={company} loading={loading} />
                </div>
              ))}
            </div>
            {loadMoreButton()}
          </section>

          <section className="summary-reviews column">
            <h1
              className="is-size-4 has-text-weight-bold reviews__header"
              style={{ color: 'blue' }}
            >
              <i class="fas fa-comments"></i> Latest Review
            </h1>
            {newestComment.map((comment, i) => (
              <div key={i}>
                <NewestCommentCard
                  comment={comment}
                  company={comment.company}
                />
                <hr />
              </div>
            ))}
          </section>
        </div>
        <br />
      </div>
    </div>
  );
};

export default Home;
