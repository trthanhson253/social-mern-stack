import React from 'react';
import LikeModal from './LikeModal';
import ReplyModal from './ReplyModal';
import ViolateModal from './ViolateModal';
import moment from 'moment';
import './company.css';
import {
  isAlreadyLiked,
  isAlreadyReport,
  dislike,
  alreadyDislike,
  isAlreadyDislike,
} from '../actions/apiCompany';
const CommentCard = ({ comment, handleReload }) => {
  const [open, setOpen] = React.useState(false);
  const [openReply, setOpenReply] = React.useState(false);
  const [openViolate, setOpenViolate] = React.useState(false);
  const [likeCollapse, setLikeCollapse] = React.useState(false);
  const [replyCollapse, setReplyCollapse] = React.useState(false);

  const handleCloseViolate = () => {
    setOpenViolate(false);
  };
  const handleClickOpenViolate = () => {
    setOpenViolate(true);
  };

  // -------------------------
  const handleCloseReply = () => {
    setOpenReply(false);
  };
  const handleClickOpenReply = () => {
    setOpenReply(true);
  };

  // ----------------------
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleReload1 = () => {
    handleReload();
  };
  let id = comment._id;
  const clickDislike = () => {
    dislike(id).then((data) => {
      if (data.error) {
        // console.log('Error');
      } else {
        alreadyDislike(data);
        handleReload1();
      }
    });
  };
  // console.log('Comment dislike ' + JSON.stringify(comment));
  return (
    <div className="review card">
      <LikeModal
        open={open}
        handleClose={handleClose}
        comment={comment}
        handleReload={handleReload1}
      />
      <ReplyModal
        openReply={openReply}
        handleCloseReply={handleCloseReply}
        comment={comment}
        handleReloadReply={handleReload1}
      />
      <ViolateModal
        openViolate={openViolate}
        handleCloseViolate={handleCloseViolate}
        comment={comment}
        handleReloadViolate={handleReload1}
      />
      <header
        className="card-header"
        style={{
          padding: '0.01px',
          background: 'white',
          fontSize: 'small',
          borderColor: 'white',
        }}
      >
        <p className="card-header-title">
          {comment.name} ({comment.position})
          {comment.point && (
            <span>
              <span className="icon is-small has-text-warning">
                <i
                  className={comment.point > 0 ? 'fas fa-star' : 'far fa-star'}
                />
              </span>
              <span className="icon is-small has-text-warning">
                <i
                  className={comment.point > 1 ? 'fas fa-star' : 'far fa-star'}
                />
              </span>
              <span className="icon is-small has-text-warning">
                <i
                  className={comment.point > 2 ? 'fas fa-star' : 'far fa-star'}
                />
              </span>
              <span className="icon is-small has-text-warning">
                <i
                  className={comment.point > 3 ? 'fas fa-star' : 'far fa-star'}
                />
              </span>
              <span className="icon is-small has-text-warning">
                <i
                  className={comment.point > 4 ? 'fas fa-star' : 'far fa-star'}
                />
              </span>
              &nbsp;&nbsp;&nbsp;
            </span>
          )}
          {comment.violate.length !== 0 && (
            <span style={{ color: '#FF5678' }}>
              {' '}
              <i class="fas fa-thumbtack"></i>&nbsp; Reported violate by{' '}
              {comment.violate.length}{' '}
              {comment.violate.length > 1 ? 'people' : 'person'}
            </span>
          )}
        </p>
        <time className="review__time">
          <b>{moment(comment.createdAt).fromNow()}</b>
        </time>
        <a className="review__share" href="#">
          <i className="fas fa-link" style={{ marginRight: '5px' }} /> Share
        </a>
      </header>
      <div className="card-content" style={{ fontSize: 'small' }}>
        <div className="content text-500">
          <div>
            <span>{comment.content}</span>
          </div>
        </div>
      </div>
      <footer
        className="card-footer"
        style={{
          padding: '0.1px',
          background: 'white',
          fontSize: 'small',
        }}
      >
        <span
          className="link-comment card-footer-item clickable"
          onClick={handleClickOpenReply}
        >
          {comment.reply.length}&nbsp;
          <span className="icon-reply icon has-text-info">
            {' '}
            <i className="fas fa-comments" />{' '}
          </span>{' '}
          Reply
        </span>

        <button
          data-action="collapse"
          class="review__view_more card-footer-item clickable"
          onClick={() => setReplyCollapse(!replyCollapse)}
        >
          <span class="icon">
            {' '}
            <i class="fas fa-eye"></i>{' '}
          </span>
        </button>
        {!isAlreadyLiked(comment._id) && (
          <span
            className="link-comment card-footer-item clickable"
            onClick={handleClickOpen}
          >
            {comment.likes.length}
            <span className="icon-like icon has-text-success">
              {' '}
              <i className="fas fa-thumbs-up" />
            </span>
            &nbsp;Agree
          </span>
        )}

        {isAlreadyLiked(comment._id) && (
          <span className="link-comment card-footer-item clickable">
            {comment.likes.length}
            <span className="icon-like icon has-text-success">
              {' '}
              <i className="fas fa-thumbs-up" />
            </span>
            &nbsp;
            <b>
              [Done!Thanks{' '}
              <img alt="happy" src={require('../../static/img/happy.png')} />]
            </b>
          </span>
        )}
        <button
          data-action="collapse"
          class="review__view_more card-footer-item clickable"
          onClick={() => setLikeCollapse(!likeCollapse)}
        >
          <span class="icon">
            {' '}
            <i class="fas fa-chevron-circle-down"></i>{' '}
          </span>
        </button>
        {!isAlreadyDislike(comment._id) && (
          <span
            className="link-comment card-footer-item clickable"
            onClick={clickDislike}
          >
            {comment.dislike.length}
            <span className="icon-dislike icon has-text-danger">
              {' '}
              <i className="fas fa-thumbs-down" />
            </span>
            &nbsp;Disagree
          </span>
        )}
        {isAlreadyDislike(comment._id) && (
          <span className="link-comment card-footer-item clickable">
            {comment.dislike.length}
            <span className="icon-dislike icon has-text-danger">
              {' '}
              <i className="fas fa-thumbs-down" />
            </span>
            &nbsp;
            <b>
              [Oops!You clicked it{' '}
              <img alt="happy" src={require('../../static/img/clap.png')} />
              ]]
            </b>
          </span>
        )}

        {!isAlreadyReport(comment._id) && (
          <span
            onClick={handleClickOpenViolate}
            className="link-comment card-footer-item clickable"
          >
            <span className="icon-ban icon is-medium">
              <span className="fa-stack fa-md">
                <i className="fas fa-flag fa-stack-1x has-text-info" />
              </span>
            </span>
            &nbsp;Report
          </span>
        )}
        {isAlreadyReport(comment._id) && (
          <span className="link-comment card-footer-item clickable">
            <span className="icon-ban icon is-medium">
              <span className="fa-stack fa-md">
                <i className="fas fa-flag fa-stack-1x has-text-info" />
              </span>
            </span>

            <b>
              Thanks!We will check it soon
              <img alt="happy" src={require('../../static/img/sad.png')} />
            </b>
          </span>
        )}
      </footer>
      {likeCollapse && (
        <div className="review-comments" style={{ fontSize: 'small' }}>
          {comment.likes.map((p, i) => (
            <div className="comment">
              <p className="comment__title">
                <span className="has-text-weight-bold">
                  {p.name} liked
                  <span className="icon-like icon has-text-success">
                    <i className="fas fa-thumbs-up" />
                  </span>
                </span>
                &nbsp;this comment &nbsp; -{' '}
                <b style={{ color: '#BD3734' }}>
                  [{moment(comment.likes[0].date).fromNow()}]
                </b>
              </p>
            </div>
          ))}
        </div>
      )}
      {replyCollapse && (
        <div className="review-comments">
          {comment.reply.map((p, i) => (
            <div className="comment">
              <p className="comment__title">
                <span className="has-text-weight-bold">{p.name} replied</span>
                to this comment &nbsp;{' '}
                <b>{moment(comment.reply.date).fromNow()}</b>
              </p>
              <p class="comment__content text-500">{p.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentCard;
