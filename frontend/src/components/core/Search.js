import React, { useState, useEffect, Fragment } from 'react';
import { API } from '../../config';
import { Link } from 'react-router-dom';
import { listSearch } from '../actions/apiCompany';
const Search = () => {
  // const [result, setResult] = useState([]);
  // const [keyword, setKeyword] = useState({
  //   name:'',
  //   searched:false
  // });

  // const searchCompany = (keyword) => {
  //   return fetch(`${API}/search`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ keyword: keyword }),
  //   })
  //     .then((result) => {
  //       return result.json();
  //     })
  //     .then((data) => setResult(data))
  //     .catch((err) => console.log(err));
  // };
  // console.log('Result:' + JSON.stringify(result));
  // useEffect(() => {
  //   searchCompany(keyword);
  // }, [keyword]);

  // const handleSearch = (e) => {
  //   setKeyword(e.target.value);
  // };

  const [result, setResult] = useState([]);
  const [keyword, setKeyword] = useState({
    search: '',
    searched: false,
  });
  const { search, searched } = keyword;
  const searchCompany = () => {
    listSearch({ search }).then((data) => {
      setResult(data);
      // setKeyword({ search: '', searched: false });
    });
  };
  console.log('Result:' + JSON.stringify(result));
  useEffect(() => {
    searchCompany(keyword);
  }, [keyword]);

  const handleSearch = (e) => {
    setKeyword({ search: e.target.value, searched: true });
  };

  return (
    <Fragment>
      <div className="field has-addons">
        <div className="control has-icons-left is-expanded autocomplete">
          <span className="icon is-small is-left">
            {' '}
            <i className="fas fa-search" />{' '}
          </span>
          <input
            name="search"
            value={search}
            className="input"
            type="text"
            placeholder="Search"
            autoComplete="off"
            onChange={handleSearch}
          />
          {searched &&
            result.map((p, i) => (
              <Link to={`/companies/${p.slug}`}>
                <div
                  id="myInputautocomplete-list"
                  className="autocomplete-items"
                >
                  <div key={i}>
                    <img
                      src={`${API}/company/photo/${p.slug}`}
                      alt={p.name}
                      style={{ height: '25px', width: '50px' }}
                    />
                    &nbsp;
                    {p.name}
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </Fragment>
  );
};

export default Search;
