import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/core/Home';
import Header from './components/core/Header';
import Footer from './components/core/Footer';
import Company from './components/company/Company';
import WriteReviewModal from './components/company/WriteReviewModal';

const Routes = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/companies/:name" exact component={Company} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default Routes;
