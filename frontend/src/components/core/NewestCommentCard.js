import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const NewestCommentCard = ({ comment, company }) => {
  return (
    <div className="review">
      <h7>
        <i class="fas fa-user-alt"></i>&nbsp;
        <span className="has-text-weight-bold">{comment.name}</span> đã review{' '}
        <Link to={`/companies/${company[0].slug}`}>
          <b>{company[0].name}</b>
        </Link>
        {comment.company._id}
      </h7>
      <p>
        <h8>
          <i class="fas fa-hourglass-half"></i>&nbsp;
          {moment(comment.createdAt).fromNow()}{' '}
        </h8>
      </p>
      <h8>
        <p>{comment.content}</p>
      </h8>
    </div>
  );
};

export default NewestCommentCard;
