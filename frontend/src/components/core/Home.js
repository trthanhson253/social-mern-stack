import React, { useState, useEffect } from 'react';
import Card from './Card';
import { getFilteredCompany } from '../actions/apiCore';
import { getNewestComment } from '../actions/apiComment';
import './Home.css';
import Search from './Search';
import NewestCommentCard from './NewestCommentCard';
import { STATES } from '../../config';
import { listSearch } from '../actions/apiCompany';
import SelectState from './SelectState';
import SelectType from './SelectType';

const Home = () => {
  const [newestCompany, setNewestCompany] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newestComment, setNewestComment] = useState([]);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [open, setOpen] = useState(false);
  const [filterByState, setFilterByState] = useState('');
  const [result, setResult] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [isTop, setIsTop] = useState(false);
  const [isNewest, setIsNewest] = useState(false);
  const [isWorst, setIsWorst] = useState(false);
  const [myFilters, setMyFilters] = useState({
    filters: { state: [], type: [] },
  });

  let sortBy,
    order = '';

  var states = STATES;
  // let avgRating = 'avgRating';
  // let asc = 'asc';
  const handleClickOpen = () => {
    setOpen(true);
  };

  const loadNewestCompany = () => {
    // console.log('newFilters', newFilters);
    getFilteredCompany(skip, limit).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setNewestCompany(data.data);
        setLoading(true);
        setSize(data.size);
        setSkip(0);
        setIsNewest(true);
        setIsTop(false);
        setIsWorst(false);
      }
    });
  };

  const loadFilterCompany = (newFilters) => {
    // console.log('newFilters', newFilters);
    getFilteredCompany(skip, limit, sortBy, order, newFilters).then((data) => {
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

  const loadTopCompany = () => {
    getFilteredCompany(skip, limit, (sortBy = 'avgRating'), order).then(
      (data) => {
        if (data.error) {
          setError(data.error);
        } else {
          // console.log('TOP COMPANIES', data.data);
          setNewestCompany(data.data);
          setLoading(true);
          setSize(data.size);
          setSkip(0);
          setIsTop(true);
          setIsNewest(false);
          setIsWorst(false);
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
        setIsWorst(true);
        setIsTop(false);
        setIsNewest(false);
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
        setIsNewest(true);
        setIsTop(false);
        setIsWorst(false);
      }
    });
  };

  const loadMoreTop = () => {
    let toSkip = skip + limit;
    // console.log(newFilters);
    getFilteredCompany(toSkip, limit, (sortBy = 'avgRating'), order).then(
      (data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setNewestCompany([...newestCompany, ...data.data]);
          setLoading(true);
          setSize(data.size);
          setSkip(toSkip);
          setIsTop(true);
          setIsNewest(false);
          setIsWorst(false);
        }
      }
    );
  };

  const loadMoreWorst = () => {
    let toSkip = skip + limit;
    // console.log(newFilters);
    getFilteredCompany(
      toSkip,
      limit,
      (sortBy = 'avgRating'),
      (order = 'asc')
    ).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setNewestCompany([...newestCompany, ...data.data]);
        setLoading(true);
        setSize(data.size);
        setSkip(toSkip);
        setIsTop(false);
        setIsNewest(false);
        setIsWorst(true);
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

  const loadMoreButtonTop = () => {
    return (
      size > 0 &&
      size >= limit && (
        <center>
          {' '}
          <button onClick={loadMoreTop} className="btn btn-warning mb-5">
            Load more
          </button>
        </center>
      )
    );
  };

  const loadMoreButtonWorst = () => {
    return (
      size > 0 &&
      size >= limit && (
        <center>
          {' '}
          <button onClick={loadMoreWorst} className="btn btn-warning mb-5">
            Load more
          </button>
        </center>
      )
    );
  };

  const handleStateChange = (e) => {
    setFilterByState(e);
  };

  const loadFilterByState = () => {
    getFilteredCompany(skip, limit, sortBy, order, filterByState).then(
      (data) => {
        if (data.error) {
          setError(data.error);
        } else {
          // console.log('FILTER BY STATE', data.data);
          setNewestCompany(data.data);
          setLoading(true);
          setSize(data.size);
          setSkip(0);
        }
      }
    );
  };
  const handleFiltersChange = (newFilters) => {
    // console.log(newFilters);
    setKeyword(newFilters);
  };
  const searchCompany = (keyword) => {
    listSearch(keyword).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setResult(data);
      }
    });
  };

  const handleFilters = (filters, filterBy) => {
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;

    loadFilterCompany(myFilters.filters);
    setMyFilters(newFilters);
    // console.log('myFilters.filters', myFilters.filters);
  };

  useEffect(() => {
    if (keyword !== null && keyword !== '') {
      searchCompany(keyword);
    }
    return () => {
      setResult([]);
    };
  }, [keyword]);

  useEffect(() => {
    loadNewestCompany(myFilters.filters);
    loadNewestComment();
  }, []);
  // useEffect(() => {
  //   loadFilterByState();
  // }, [filterByState]);

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
              Feel free to say what you think.
            </h1>
            <div>
              <Search
                onSubmit={handleFiltersChange}
                result={result}
                loading={loading}
              />
            </div>
          </div>
        </section>
        <div className="columns">
          <section className="companies column is-three-fifths">
            <div className="tabs" style={{ 'font-size': 'small' }}>
              <ul>
                <li
                  data-tab="top-comments"
                  className="tab"
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
                    Worst Companies
                  </a>
                </li>
                <div>
                  <span className="icon has-text-info">
                    <i class="fas fa-filter" />
                  </span>
                  <b>Sort </b>
                  <SelectState
                    states={states}
                    handleFilters={(filters) => handleFilters(filters, 'state')}
                  />
                  &nbsp;
                  <SelectType
                    handleFilters={(filters) => handleFilters(filters, 'type')}
                  />
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

            {isNewest && loadMoreButton()}
            {isTop && loadMoreButtonTop()}
            {isWorst && loadMoreButtonWorst()}
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
              <i class="fas fa-comments"></i> &#123; Latest Reviews &#125;
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
