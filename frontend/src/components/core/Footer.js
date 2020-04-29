import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="container level">
        <div className="level-left">
          <p className="level-item">
            <a
              className="white-link"
              target="_blank"
              href="https://reviewcongty.com/faq"
            >
              Q & A
            </a>{' '}
            &nbsp;&nbsp;|&nbsp;&nbsp;
            <a
              className="white-link"
              target="_blank"
              href="https://reviewcongty.com/tnc"
            >
              Request Delete Review
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
