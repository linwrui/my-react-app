import { Layout, Menu } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import React from 'react';
import { Link, Route } from 'react-router-dom';
import { Game } from '../components/board-game';
import './index.less';

const { Header, Sider, Content } = Layout;

export class SiderLayout extends React.Component {
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        return (
            <Layout>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}>
                    <div className='logo' />
                    <Menu
                        theme='dark'
                        mode='inline'
                        defaultSelectedKeys={['1']}>
                        <Menu.Item key='1' icon={<UserOutlined />}>
                            <Link to='/game'>Game</Link>
                        </Menu.Item>
                        <Menu.Item key='2' icon={<VideoCameraOutlined />}>
                            <Link to='/nav1'>nav1</Link>
                        </Menu.Item>
                        <Menu.Item key='3' icon={<UploadOutlined />}>
                            <Link to='/nav2'>nav2</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className='site-layout'>
                    <Header
                        className='site-layout-background'
                        style={{ padding: 0 }}>
                        {React.createElement(
                            this.state.collapsed
                                ? MenuUnfoldOutlined
                                : MenuFoldOutlined,
                            {
                                className: 'trigger',
                                onClick: this.toggle,
                            }
                        )}
                    </Header>
                    <Content
                        className='site-layout-background'
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                        }}>
                        <Route
                            exact
                            path='/nav1'
                            component={() => <h1>nav1</h1>}
                        />
                        <Route
                            exact
                            path='/nav2'
                            component={() => <h1>nav2</h1>}
                        />
                        <Route exact path='/game' component={Game} />
                    </Content>
                </Layout>
            </Layout>
        );
    }
}
