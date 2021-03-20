import { Layout, Menu } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, AppstoreOutlined } from '@ant-design/icons';
import React from 'react';
import { Link, Route, RouteComponentProps } from 'react-router-dom';
import { Game } from '../pages/game';
import './style.less';
import { Home } from '../pages/home';

const { Sider, Content } = Layout;
interface NavigationState {
  navigationMenu: Array<{
    linkTo: string;
    title: string;
    icon?: React.ReactNode;
    component: React.ComponentType<any>;
  }>;
  collapsed: boolean;
  selectedKey: string;
  breakpointLayout: 'response' | 'none';
}

export class Navigation extends React.Component<RouteComponentProps, NavigationState> {
  constructor(props: RouteComponentProps) {
    super(props);
    const { location } = props;
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
      ],
      collapsed: true,
      selectedKey: location.pathname === '/' ? '/home' : location.pathname,
      breakpointLayout: 'none',
    };
  }

  componentDidMount() {
    const { history } = this.props;
    history.listen(() => {
      const { breakpointLayout } = this.state;
      if (breakpointLayout === 'response') {
        this.setState({
          collapsed: true,
        });
      }
    });
  }

  toggle = () => {
    const { collapsed } = this.state;
    this.setState({
      collapsed: !collapsed,
    });
  };

  render() {
    const { navigationMenu, collapsed, selectedKey, breakpointLayout } = this.state;
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
          <Menu theme="dark" mode="inline" defaultSelectedKeys={[selectedKey]}>
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
              margin: 24,
            }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
              style: collapsed ? { top: 30, left: 30, color: '#D2D2D2' } : { top: 22, left: 25 },
            })}
            {navigationMenu.map(x => (
              <Route key={x.linkTo} exact path={x.linkTo} component={x.component} />
            ))}
          </Content>
        </Layout>
      </Layout>
    );
  }
}
