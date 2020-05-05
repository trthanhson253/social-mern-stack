import React, { useState, useEffect, Fragment } from 'react';
import Card from './Card';
import { getCompany, getFilteredCompany } from '../actions/apiCore';
import { getNewestComment } from '../actions/apiComment';
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
  const [filterByState, setFilterByState] = useState('');
  let sortBy,
    order = '';

  var states = STATES;
  // let avgRating = 'avgRating';
  // let asc = 'asc';
  const handleClickOpen = () => {
    setOpen(true);
  };

  const loadNewestCompany = () => {
    getFilteredCompany(skip, limit).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        console.log('Dữ liêu là:' + data.data);
        setNewestCompany(data.data);
        setLoading(true);
        setSize(data.size);
        setSkip(0);
      }
    });
  };

  const loadTopCompany = () => {
    getFilteredCompany(skip, limit, (sortBy = 'avgRating'), order).then(
      (data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setNewestCompany(data.data);
          setLoading(true);
          setSize(data.size);
          setSkip(0);
        }
      }
    );
  };

  const loadWorstCompany = () => {
    getFilteredCompany(
      skip,
      limit,
      (sortBy = 'avgRating'),
      (order = 'asc')
    ).then((data) => {
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
        <center>
          {' '}
          <button onClick={loadMore} className="btn btn-warning mb-5">
            Load more
          </button>
        </center>
      )
    );
  };

  const handleStateChange = (e) => {
    setFilterByState(e);
  };
  console.log(filterByState);
  const loadFilterByState = () => {
    getFilteredCompany(skip, limit, sortBy, order, filterByState).then(
      (data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setNewestCompany(data.data);
          setLoading(true);
          setSize(data.size);
          setSkip(0);
        }
      }
    );
  };
  useEffect(() => {
    loadNewestCompany();
    loadNewestComment();
  }, []);
  useEffect(() => {
    loadFilterByState();
  }, [filterByState]);

  return (
    <div>
      <div className="container main-container">
        <section className="hero-img">
          <div className="hero-img__gradient" />

          <img alt="a" src={require('../../static/img/banner.jpg')} />
        </section>
        <section className="hero">
          <div className="hero-body z-1">
            <h1 className="title has-text-white">
              Feel free to say what you think. No Registration Required.
            </h1>
            <div>
              <Search />
            </div>
          </div>
        </section>
        <div className="columns">
          <section className="companies column is-three-fifths">
            <div className="tabs" style={{ 'font-size': 'small' }}>
              <ul>
                <li
                  data-tab="top-comments"
                  className="tab is-active"
                  onClick={loadNewestCompany}
                >
                  <a href="#" className="has-text-weight-bold">
                    <span className="icon has-text-info">
                      {' '}
                      <i className="fas fa-comments" />{' '}
                    </span>{' '}
                    Newest
                  </a>
                </li>
                <li
                  data-tab="top-companies"
                  className="tab"
                  onClick={loadTopCompany}
                >
                  <a href="#" className="has-text-weight-bold">
                    <span className="icon has-text-success">
                      {' '}
                      <i className="fas fa-thumbs-up" />{' '}
                    </span>{' '}
                    Top Companies
                  </a>
                </li>
                <li
                  data-tab="worst-companies"
                  className="tab "
                  onClick={loadWorstCompany}
                >
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
                  <select
                    style={{ width: '100px' }}
                    onChange={(e) => handleStateChange(e.target.value)}
                  >
                    <option value="all">By States</option>
                    {states.map((p, i) => (
                      <option value={p.abbreviation} key={i}>
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
                  {company.status == 1 && (
                    <Card company={company} loading={loading} />
                  )}
                </div>
              ))}
            </div>

            {loadMoreButton()}
          </section>

          <section className="summary-reviews column">
            <h1
              className="is-size-4 has-text-weight-bold reviews__header"
              style={{
                color: 'white',
                background: '#007BFF',
                borderRadius: '2px',
                padding: '6px',
              }}
            >
              <i class="fas fa-comments"></i> &#123; Latest Review &#125;
            </h1>
            {newestComment.map((comment, i) => (
              <div key={i}>
                <NewestCommentCard
                  comment={comment}
                  company={comment.company}
                />
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
