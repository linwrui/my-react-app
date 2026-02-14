import { Layout, Menu } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, AppstoreOutlined } from '@ant-design/icons';
import React from 'react';
import { Link, Routes, Route, Navigate } from 'react-router-dom';
import { Game } from '../pages/game';
import './style.less';
import { Home } from '../pages/home';
import { ColorGradient } from '../pages/color-gradient';
import { withRouter, WithRouterProps } from '../utils/with-router';

const { Sider, Content } = Layout;

interface NavigationState {
  navigationMenu: Array<{
    linkTo: string;
    title: string;
    icon?: React.ReactNode;
    component: React.ComponentType<any>;
  }>;
  collapsed: boolean;
  breakpointLayout: 'response' | 'none';
}

type NavigationProps = WithRouterProps;

class NavigationComponent extends React.Component<NavigationProps, NavigationState> {
  constructor(props: NavigationProps) {
    super(props);
    this.state = {
      navigationMenu: [
        {
          linkTo: '/home',
          title: 'Home',
          component: Home,
        },
        {
          linkTo: '/game',
          title: 'Game',
          component: Game,
        },
        {
          linkTo: '/color-gradient',
          title: 'ColorGradient',
          component: ColorGradient,
        },
      ],
      collapsed: true,
      breakpointLayout: 'none',
    };
  }

  componentDidUpdate(prevProps: NavigationProps) {
    const { location } = this.props;
    if (location.pathname !== prevProps.location.pathname) {
      const { breakpointLayout } = this.state;
      if (breakpointLayout === 'response') {
        this.setState({
          collapsed: true,
        });
      }
    }
  }

  toggle = () => {
    const { collapsed } = this.state;
    this.setState({
      collapsed: !collapsed,
    });
  };

  render() {
    const { navigationMenu, collapsed, breakpointLayout } = this.state;
    const { location } = this.props;
    const currentPath = location.pathname === '/' ? '/home' : location.pathname;
    
    return (
      <Layout className="app-navigation">
        <Sider
          width={breakpointLayout === 'response' ? '100%' : '200px'}
          breakpoint="sm"
          collapsedWidth="0"
          onBreakpoint={breakpoint => this.setState({ breakpointLayout: breakpoint ? 'response' : 'none' })}
          onCollapse={coll => {
            this.setState({ collapsed: coll });
          }}
          trigger={null}
          collapsible
          collapsed={collapsed}>
          <div className="logo">React App</div>
          <Menu theme="dark" mode="inline" selectedKeys={[currentPath]}>
            {navigationMenu.map(x => (
              <Menu.Item key={x.linkTo} icon={x.icon || <AppstoreOutlined />}>
                <Link to={x.linkTo}>{x.title}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Content
            className="site-layout-background"
            style={{
              margin: 20,
            }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
              style: collapsed ? { top: 30, left: 30, color: '#D2D2D2' } : { top: 22, left: 25 },
            })}
            <Routes>
              <Route path="/" element={<Navigate to="/home" replace />} />
              {navigationMenu.map(x => (
                <Route key={x.linkTo} path={x.linkTo} element={<x.component />} />
              ))}
            </Routes>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export const Navigation = withRouter(NavigationComponent);
