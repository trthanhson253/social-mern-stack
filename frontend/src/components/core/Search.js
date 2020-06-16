import React, { useState, Fragment } from 'react';
import { useRef } from 'react';
import { API } from '../../config';
import { Link } from 'react-router-dom';
const Search = ({ onSubmit, result, loading }) => {
  const [search, setSearch] = useState('');
  const typingTimeoutRef = useRef(null);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (!onSubmit) return;
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      const formValues = {
        search: value,
      };
      onSubmit(formValues);
    }, 500);
  };

  // console.log('result.length', result.length);
  // console.log('Dữ liêu là:', result);
  const renderSuggestions = () => {
    if (result.length === 0) {
      return null;
    } else {
      return (
        <div id="myInputautocomplete-list" className="autocomplete-items">
          {result.map((p, i) => (
            <Link to={`/companies/${p.slug}`}>
              <div key={i}>
                <img
                  src={`${API}/company/photo/${p.slug}`}
                  alt={p.name}
                  style={{ height: '30px', width: '40px' }}
                />
                &nbsp;
                <b style={{ color: '#00A2E8' }}>{p.name}</b>
              </div>
            </Link>
          ))}
        </div>
      );
    }
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
          {renderSuggestions()}
        </div>
      </div>
    </Fragment>
  );
};

export default Search;
