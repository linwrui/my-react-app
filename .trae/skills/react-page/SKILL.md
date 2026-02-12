---
name: react-page
description: 创建符合项目规范的 React 页面组件

---

# React 页面创建技能

## 描述
此技能用于创建符合项目规范的 React 页面组件，包括 TypeScript 类型定义、样式文件和标准的项目结构。

## 使用场景
当用户要求创建新的页面组件时触发此技能。

## 指令

### 1. 确定页面位置
- 页面组件放在 `src/pages/` 目录下
- 按功能创建子目录，如 `src/pages/home/`

### 2. 创建页面文件结构
```
page-name/
├── index.tsx       # 页面主文件
└── style.less      # 页面样式文件
```

### 3. 编写页面代码
- 使用 Class Component 写法
- 定义 Props 和 State 接口
- 继承 `React.Component<Props, State>`
- 使用 `constructor` 初始化 state
- 在 `componentDidMount` 中进行数据初始化
- 在 `componentWillUnmount` 中清理副作用
- 使用 Ant Design 的 Layout 组件作为容器

### 4. 编写样式文件
- 使用 Less 语法
- 使用 BEM 命名规范
- 类名以 `app-page-name` 为前缀

### 5. 导入顺序
1. React 相关
2. 第三方库（如 Ant Design、Axios）
3. 内部组件/工具/小组件
4. 样式文件

### 6. 更新导航配置
- 在 `src/navigation/index.tsx` 中添加路由配置
- 添加到 `navigationMenu` 数组中

## 示例

### 输入
创建一个名为 `Settings` 的设置页面，包含用户信息展示和基本设置选项

### 输出

**src/pages/settings/index.tsx**
```typescript
import { Layout, Form, Input, Button, Card, Avatar } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { UserOutlined } from '@ant-design/icons';
import React from 'react';
import './style.less';

interface SettingsState {
  userInfo: {
    username: string;
    email: string;
    avatar?: string;
  };
  loading: boolean;
}

export class Settings extends React.Component<any, SettingsState> {
  private willUnmounted = false;

  constructor(props: any) {
    super(props);
    this.state = {
      userInfo: {
        username: '',
        email: '',
      },
      loading: false,
    };
  }

  componentDidMount() {
    this.loadUserInfo();
  }

  componentWillUnmount() {
    this.willUnmounted = true;
  }

  loadUserInfo = () => {
    this.setState({ loading: true });
    // 模拟 API 请求
    setTimeout(() => {
      if (this.willUnmounted) return;
      this.setState({
        userInfo: {
          username: 'User123',
          email: 'user@example.com',
        },
        loading: false,
      });
    }, 1000);
  };

  handleSave = (values: any) => {
    console.log('保存设置:', values);
  };

  render() {
    const { userInfo, loading } = this.state;
    return (
      <Layout className="app-settings">
        <Content className="layout-content">
          <Card title="用户设置" loading={loading}>
            <div className="user-info">
              <Avatar size={64} icon={<UserOutlined />} src={userInfo.avatar} />
              <div className="user-info__text">
                <div className="user-info__name">{userInfo.username}</div>
                <div className="user-info__email">{userInfo.email}</div>
              </div>
            </div>
            <Form layout="vertical" onFinish={this.handleSave} initialValues={userInfo}>
              <Form.Item label="用户名" name="username" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item label="邮箱" name="email" rules={[{ required: true, type: 'email' }]}>
                <Input />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  保存
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Content>
      </Layout>
    );
  }
}
```

**src/pages/settings/style.less**
```less
.app-settings {
  .layout-content {
    padding: 24px;
  }

  .user-info {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 24px;

    &__text {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    &__name {
      font-size: 18px;
      font-weight: 500;
    }

    &__email {
      color: #999;
    }
  }
}
```

**src/navigation/index.tsx**（更新部分）
```typescript
import { Settings } from '../pages/settings';

// 在 navigationMenu 数组中添加
{
  linkTo: '/settings',
  title: 'Settings',
  component: Settings,
}
```
