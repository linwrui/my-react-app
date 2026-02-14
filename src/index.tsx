import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import './style.less';
import { Navigation } from './navigation';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <HashRouter>
    <section style={{ height: '100%' }}>
      <Navigation />
    </section>
  </HashRouter>
);
