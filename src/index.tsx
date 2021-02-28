import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import './index.less';
import { SiderLayout } from './layout';

const routing = (
    <Router>
        <div>
            <Route path='/' component={SiderLayout} />
        </div>
    </Router>
);

ReactDOM.render(routing, document.getElementById('root'));
