import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';
import React from 'react';
import { Link, Route, RouteComponentProps } from 'react-router-dom';
import { Game } from '../pages/borad-game';
import { Container } from '../elements/container';
import './style.less';
import { Home } from '../pages/home';

const { Header, Sider, Content } = Layout;

export class SiderLayout extends React.Component<RouteComponentProps, any> {
  constructor(props: RouteComponentProps) {
    super(props);
    const { location } = props;
    this.state = {
      collapsed: false,
      selectedKey: location.pathname === '/' ? '/home' : location.pathname,
    };
  }

  toggle = () => {
    const { collapsed } = this.state;
    this.setState({
      collapsed: !collapsed,
    });
  };

  render() {
    const { collapsed, selectedKey } = this.state;
    return (
      <Container xAttr="sider-layout">
        <Layout>
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="logo">React App</div>
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={[selectedKey]}>
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
            <Header className="site-layout-background" style={{ padding: 0 }}>
              {React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: 'trigger',
                  onClick: this.toggle,
                }
              )}
              <span className="logo">My First React App</span>
            </Header>
            <Content
              className="site-layout-background"
              style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
              }}>
              <Route exact path="/home" component={Home} />
              <Route exact path="/nav1" component={() => <h1>nav1</h1>} />
              <Route exact path="/nav2" component={() => <h1>nav2</h1>} />
              <Route exact path="/game" component={Game} />
            </Content>
          </Layout>
        </Layout>
      </Container>
    );
  }
}
