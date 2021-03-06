import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Redirect, HashRouter } from 'react-router-dom';
import './style.less';
import { SiderLayout } from './sider-layout';

const routing = (
  <HashRouter>
    <section style={{ height: '100%' }}>
      <Route path="/" component={SiderLayout} />
      <Route exact path="/">
        <Redirect to="/home" />
    </Route>
    </section>
  </HashRouter>
);

ReactDOM.render(routing, document.getElementById('root'));
