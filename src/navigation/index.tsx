import { Layout, Menu } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, AppstoreOutlined } from '@ant-design/icons';
import React from 'react';
import { Link, Route, RouteComponentProps } from 'react-router-dom';
import { Game } from '../pages/borad-game';
import './style.less';
import { Home } from '../pages/home';

const { Sider, Content } = Layout;

export class Navigation extends React.Component<RouteComponentProps, any> {
  constructor(props: RouteComponentProps) {
    super(props);
    const { location } = props;
    this.state = {
      collapsed: true,
      selectedKey: location.pathname === '/' ? '/home' : location.pathname,
      breakpointLayout: 'none',
    };
  }

  toggle = () => {
    const { collapsed } = this.state;
    this.setState({
      collapsed: !collapsed,
    });
  };

  render() {
    const { collapsed, selectedKey, breakpointLayout } = this.state;
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
            <Menu.Item key="/home" icon={<AppstoreOutlined />}>
              <Link to="/home">Home</Link>
            </Menu.Item>
            <Menu.Item key="/game" icon={<AppstoreOutlined />}>
              <Link to="/game">Game</Link>
            </Menu.Item>
            <Menu.Item key="/nav1" icon={<AppstoreOutlined />}>
              <Link to="/nav1">nav1</Link>
            </Menu.Item>
            <Menu.Item key="/nav2" icon={<AppstoreOutlined />}>
              <Link to="/nav2">nav2</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
            }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
              style: collapsed ? { top: 10, left: 10, color: '#D2D2D2' } : {},
            })}
            <Route exact path="/home" component={Home} />
            <Route exact path="/nav1" component={() => <h1>nav1</h1>} />
            <Route exact path="/nav2" component={() => <h1>nav2</h1>} />
            <Route exact path="/game" component={Game} />
          </Content>
        </Layout>
      </Layout>
    );
  }
}
