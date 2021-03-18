import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Redirect, HashRouter } from 'react-router-dom';
import './style.less';
import { Navigation } from './navigation';

const routing = (
  <HashRouter>
    <section style={{ height: '100%' }}>
      <Route path="/" component={Navigation} />
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>
    </section>
  </HashRouter>
);

ReactDOM.render(routing, document.getElementById('root'));
