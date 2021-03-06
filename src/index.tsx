import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import './style.less';
import { SiderLayout } from './sider-layout';

const routing = (
  <Router>
    <section style={{ height: '100%' }}>
      <Route path="/" component={SiderLayout} />
      <Route exact path="/">
        <Redirect to="/home" />
    </Route>
    </section>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));
