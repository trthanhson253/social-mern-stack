import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/core/Home';
import Header from './components/core/Header';
import Footer from './components/core/Footer';
import Company from './components/company/Company';
import CompanyList from './components/admin/CompanyList';
import CommentList from './components/admin/CommentList';
import RequestList from './components/admin/RequestList';
import AdminRoute from './components/auth/AdminRoute';

const Routes = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/companies/:slug" exact component={Company} />
        <AdminRoute path="/admin/company" exact component={CompanyList} />
        <AdminRoute path="/admin/comment" exact component={CommentList} />
        <AdminRoute path="/admin/request" exact component={RequestList} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default Routes;
