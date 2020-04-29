import React from 'react';
import LikeModal from './LikeModal';
import ReplyModal from './ReplyModal';
import ViolateModal from './ViolateModal';
import moment from 'moment';

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
  const handleReloadViolate = () => {
    handleReload();
  };
  // -------------------------
  const handleCloseReply = () => {
    setOpenReply(false);
  };
  const handleClickOpenReply = () => {
    setOpenReply(true);
  };
  const handleReloadReply = () => {
    handleReload();
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

  console.log(comment);
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
        style={{ padding: '0.01px', background: 'white' }}
      >
        <p className="card-header-title">
          {comment.name} &nbsp;{' '}
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
              &nbsp;
            </span>
          )}
          {comment.violate.length > 0 && (
            <span>
              <i class="fas fa-thumbtack"></i>&nbsp; Đã bị đánh dấu vi phạm bởi{' '}
              {comment.violate.length} người
            </span>
          )}
        </p>
        <time className="review__time">
          <b>{moment(comment.createdAt).fromNow()}</b>
        </time>
        <a
          className="review__share"
          href="https://reviewcongty.com/companies/shb-finance/review/5e7a51879a118024c42538da"
        >
          <i className="fas fa-link" style={{ marginRight: '5px' }} /> Share
        </a>
      </header>
      <div className="card-content">
        <div className="content text-500">
          <div id="review_5e7a51879a118024c42538da">
            <span>{comment.content}</span>
          </div>
        </div>
      </div>
      <footer
        className="card-footer"
        style={{ padding: '0.1px', background: 'white' }}
      >
        <a
          href="#"
          data-id="5e7a51879a118024c42538da"
          data-prefill
          data-reaction="LIKE"
          className="link-comment card-footer-item clickable"
          onClick={handleClickOpenReply}
        >
          {comment.reply.length}
          <span className="icon-reply icon has-text-info">
            {' '}
            <i className="fas fa-comments" />{' '}
          </span>{' '}
          Reply
        </a>
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
        <span
          className="link-comment card-footer-item clickable"
          onClick={handleClickOpen}
        >
          {comment.likes.length}
          <span className="icon-like icon has-text-success">
            {' '}
            <i className="fas fa-thumbs-up" />
          </span>
          &nbsp;Thích
        </span>
        <button
          data-action="collapse"
          class="review__view_more card-footer-item clickable"
          onClick={() => setLikeCollapse(!likeCollapse)}
        >
          <span class="icon">
            {' '}
            <i class="fas fa-eye"></i>{' '}
          </span>
        </button>
        <span className="link-comment card-footer-item clickable">
          0
          <span className="icon-dislike icon has-text-danger">
            {' '}
            <i className="fas fa-thumbs-down" />
          </span>
          &nbsp;Ghét
        </span>
        <span
          onClick={handleClickOpenViolate}
          className="link-comment card-footer-item clickable"
        >
          <span className="icon-ban icon is-medium">
            <span className="fa-stack fa-md">
              <i className="fas fa-comments fa-stack-1x has-text-info" />
              <i className="fas fa-ban fa-stack-2x has-text-danger" />
            </span>
          </span>
          &nbsp;Báo cáo vi phạm
        </span>
      </footer>
      {likeCollapse && (
        <div className="review-comments">
          {comment.likes.map((p, i) => (
            <div className="comment">
              <p className="comment__title">
                <span className="has-text-weight-bold">
                  {p.name} đã
                  <span className="icon-like icon has-text-success">
                    <i className="fas fa-thumbs-up" />
                  </span>
                </span>
                &nbsp;bình luận này &nbsp; -{' '}
                <b>{moment(comment.likes.date).fromNow()}</b>
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
                <span className="has-text-weight-bold">{p.name} đã</span>
                trả lời bình luận này &nbsp;{' '}
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
