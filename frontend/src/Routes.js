import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/core/Home';
import Header from './components/core/Header';
import Footer from './components/core/Footer';
import Company from './components/company/Company';
import CompanyList from './components/admin/CompanyList';
import CommentList from './components/admin/CommentList';

const Routes = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/companies/:name" exact component={Company} />
        <Route path="/admin/company" exact component={CompanyList} />
        <Route path="/admin/comment" exact component={CommentList} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default Routes;
