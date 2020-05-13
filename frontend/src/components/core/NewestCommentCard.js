import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const NewestCommentCard = ({ comment, company }) => {
  const [seeMore, setSeeMore] = useState(false);
  const handleSeeMore = () => {
    setSeeMore(true);
  };

  return (
    <div className="review">
      <h6>
        <i class="fas fa-user-circle"></i>&nbsp;
        <span className="has-text-weight-bold" style={{ color: '#FFC10F' }}>
          &#60;{comment.name}&#62;
        </span>{' '}
        wrote a review for{' '}
        <Link to={`/companies/${company[0].slug}`}>
          <img alt="happy" src={require('../../static/img/company.png')} />
          &nbsp;
          <b>{company[0].name}</b>
        </Link>
        {comment.company._id}
      </h6>

      <p style={{ color: '#28A745' }}>
        <h8>
          <i class="far fa-clock"></i>&nbsp; - &nbsp;Posted{' '}
          {moment(comment.createdAt).fromNow()}{' '}
        </h8>
      </p>

      <h8>
        <p style={{ color: '#BD3734' }}>
          {comment.content.length > 100 ? (
            <div>
              {!seeMore ? (
                <span>
                  {comment.content.substr(0, 200)}...
                  <Link onClick={handleSeeMore}>See more</Link>
                </span>
              ) : (
                <span>{comment.content}</span>
              )}
            </div>
          ) : (
            <div>{comment.content}</div>
          )}
        </p>
      </h8>
      <hr />
      <div
        className="level-right"
        style={{
          paddingRight: '10px',
          fontSize: 'small',
          color: 'gray',
          fontWeight: 'bold',
        }}
      >
        <span>
          {' '}
          <i
            class="far fa-thumbs-up"
            style={{
              color: '#28A745',
            }}
          ></i>
          &nbsp;Agree
        </span>
        &nbsp;| &nbsp;
        <span>
          <i
            class="far fa-thumbs-down"
            style={{
              color: '#DC3545',
            }}
          ></i>
          &nbsp; Disagree
        </span>
        &nbsp;| &nbsp;
        <i class="far fa-flag"></i>&nbsp; Report
      </div>
      <br />
    </div>
  );
};

export default NewestCommentCard;
