import React, { useState, useEffect, Fragment } from 'react';
import Card from './Card';
import { getCompany,getNewestComment } from '../actions/apiCore';
import './Home.css';
import Search from './Search';
import NewestCommentCard from './NewestCommentCard';

const Home = () => {
  const [newestCompany, setNewestCompany] = useState([]);
  const [newestComment, setNewestComment] = useState([]);
  const [error, setError] = useState(false);

  // const [values, setValues] = useState({
  //   name: '',
  // });
  // const { name } = values;

  // const handleChange = (name) => (e) => {
  //   setValues({
  //     ...values,
  //     [name]: e.target.value,
  //   });
  // };
  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   setValues({ ...values });
  //   searchCompany({ name }).then((data) => {
  //     if (data.error) {
  //       setValues({ ...values });
  //     } else {
  //       setValues({
  //         ...values,
  //       });
  //     }
  //     console.log('Ket qua la:' + data);
  //   });
  // };
  const loadNewestCompany = () => {
    getCompany().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setNewestCompany(data);
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
            <div className="tabs" style={{ 'font-size': 'medium' }}>
              <ul>
                <li data-tab="top-comments" className="tab is-active">
                  <a
                    href="https://reviewcongty.com/?tab=latest"
                    className="has-text-weight-bold"
                  >
                    <span className="icon has-text-info">
                      {' '}
                      <i className="fas fa-comments" />{' '}
                    </span>{' '}
                    Latest Update
                  </a>
                </li>
                <li data-tab="top-companies" className="tab ">
                  <a
                    href="https://reviewcongty.com/?tab=best"
                    className="has-text-weight-bold"
                  >
                    <span className="icon has-text-success">
                      {' '}
                      <i className="fas fa-thumbs-up" />{' '}
                    </span>{' '}
                    Top Companies
                  </a>
                </li>
                <li data-tab="worst-companies" className="tab ">
                  <a
                    href="https://reviewcongty.com/?tab=worst"
                    className="has-text-weight-bold"
                  >
                    <span className="icon has-text-danger">
                      {' '}
                      <i className="fas fa-thumbs-down" />{' '}
                    </span>{' '}
                    Avoid These Companies
                  </a>
                </li>
              </ul>
            </div>
            <div className="tabs-section">
              {newestCompany.map((company, i) => (
                <div key={i}>
                  <Card company={company} />
                  <hr />
                </div>
              ))}

              <div style={{ marginTop: '0.6rem' }}>
                <nav
                  className="pagination is-small custom-pagination"
                  role="navigation"
                  aria-label="pagination"
                >
                  <span className="pagination-summary">
                    Trang <b>1</b> trên tổng số <b>353</b>
                  </span>
                  <ul className="pagination-list">
                    <li>
                      <a
                        href="https://reviewcongty.com/?tab=latest&page=1"
                        className="pagination-link is-current"
                      >
                        1
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://reviewcongty.com/?tab=latest&page=2"
                        className="pagination-link "
                      >
                        2
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://reviewcongty.com/?tab=latest&page=3"
                        className="pagination-link "
                      >
                        3
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://reviewcongty.com/?tab=latest&page=4"
                        className="pagination-link "
                      >
                        4
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://reviewcongty.com/?tab=latest&page=5"
                        className="pagination-link "
                      >
                        5
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://reviewcongty.com/?tab=latest&page=6"
                        className="pagination-link "
                      >
                        6
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://reviewcongty.com/?tab=latest&page=7"
                        className="pagination-link "
                      >
                        7
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://reviewcongty.com/?tab=latest&page=8"
                        className="pagination-link "
                      >
                        8
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://reviewcongty.com/?tab=latest&page=9"
                        className="pagination-link "
                      >
                        9
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </section>
          <section className="summary-reviews column z-1">
            <h1 className="is-size-4 has-text-weight-bold reviews__header" style={{color: 'blue'}}>
            <i class="fas fa-comments"></i> Latest Review
            </h1>
            {newestComment.map((comment, i) => (
              <div key={i}>
                <NewestCommentCard comment={comment} company={comment.company} />
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
