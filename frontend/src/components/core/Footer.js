import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="main-footer" style={{ fontSize: 'small' }}>
      <div className="container level">
        <div className="level-left">
          <p className="level-item">
            Copyright © 2020 Listen Developers &nbsp;
            <i class="fab fa-react" style={{ fontSize: 'medium' }}></i>&nbsp;
            <i class="fab fa-node-js" style={{ fontSize: 'medium' }}></i>
          </p>
        </div>
        <div className="level-right">
          <p className="level-item">
            Q & A | Terms | Privacy Policy | &nbsp;
            <img alt="usa" src={require('./world.png')} />
            &nbsp; United States
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
