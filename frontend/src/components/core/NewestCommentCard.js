import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const NewestCommentCard = ({ comment, company }) => {
  return (
    <div className="review">
      <h7>
        <i class="fas fa-user-circle"></i>&nbsp;
        <span className="has-text-weight-bold">
          &#60;{comment.name}&#62;
        </span>{' '}
        wrote a review for{' '}
        <Link to={`/companies/${company[0].slug}`}>
          <i class="fas fa-star"></i>
          <b>{company[0].name}</b>
        </Link>
        {comment.company._id}
      </h7>

      <p style={{ color: 'gray' }}>
        <h8>
          <i class="far fa-clock"></i>&nbsp; - &nbsp;Posted{' '}
          {moment(comment.createdAt).fromNow()}{' '}
        </h8>
      </p>
      <hr />
      <h8>
        <p>"{comment.content}"</p>
      </h8>
    </div>
  );
};

export default NewestCommentCard;
