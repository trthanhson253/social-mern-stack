import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const NewestCommentCard = ({comment,company}) => {
    console.log("Comment là:" +JSON.stringify(company));
    return (
        
            <div className="review">
            <h5>
            <i class="fas fa-user-alt"></i>&nbsp;<span className="has-text-weight-bold">{comment.name}</span> đã review{' '}
              <Link to={`/companies/${company[0].slug}`}>
                <b>{company[0].name}</b>
              </Link>
              {comment.company._id}
            </h5>
            <p>
            <i class="fas fa-hourglass-half"></i>&nbsp;{moment(comment.createdAt).fromNow()}{' '}
              <span>
                <span className="icon is-small has-text-warning">
                  <i className="fas fa-star" />
                </span>
                <span className="icon is-small has-text-warning">
                  <i className="fas fa-star" />
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
            </p>
            <p>{comment.content}</p>
          </div>
     
    )
}



export default NewestCommentCard
