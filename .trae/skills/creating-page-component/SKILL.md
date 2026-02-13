---
name: creating-page-component
description: 创建页面组件，遵循项目规范，使用 TypeScript、类组件、Less 样式和 Ant Design 布局组件
---

# 创建页面组件

## 描述
此技能用于在 `src/pages/` 目录下创建页面组件，遵循项目的技术栈和代码风格规范，通常使用 Ant Design 的 Layout 组件。

## 使用场景
当用户需要创建新的页面组件（如首页、游戏页面、工具页面等）时使用此技能。

## 指令

### 步骤 1：确定页面位置
- 页面组件应放置在 `src/pages/` 目录下
- 使用 kebab-case 命名，如 `my-page/index.tsx`
- 复杂页面可以创建子目录，如 `game/board-game/index.tsx`

### 步骤 2：创建页面组件文件
- 使用类组件（Class Component）
- 导入 React、Ant Design 组件（特别是 Layout、Content、Footer 等）
- 定义 Props 和 State 接口
- 使用命名导出：`export class PageName extends React.Component<PropsType, StateType>`

### 步骤 3：定义类型接口
```typescript
interface PropsType {
  // 页面属性定义（通常为 any 或空）
}

interface StateType {
  // 页面状态定义
  // 常见状态：loading、data、error 等
}
```

### 步骤 4：实现页面逻辑
- 在 constructor 中初始化 state
- 在 componentDidMount 中进行数据获取（使用 axios）
- 在 componentWillUnmount 中清理副作用（设置标志位）
- 实现必要的处理方法（使用 private 修饰符）
- 使用 Ant Design 的 Layout 组件包裹页面内容

### 步骤 5：创建样式文件
- 在页面目录下创建 `style.less` 文件
- 使用 Less 语法
- 使用语义化的类名，如 `app-page-name`
- 在页面文件中导入样式：`import './style.less'`

### 步骤 6：添加注释
- 使用 JSDoc 风格注释
- 为页面添加功能说明
- 为方法添加参数和返回值说明
- 注释使用中文

### 步骤 7：配置路由（如需要）
- 在 `src/navigation/index.tsx` 中添加路由配置
- 使用 HashRouter 和 Route 组件

## 示例

### 页面组件示例 (src/pages/my-page/index.tsx)
```typescript
import { Layout, Spin } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import axios from 'axios';
import React from 'react';
import './style.less';

interface StateType {
  data: any[];
  loading: boolean;
  error: string | null;
}

export class MyPage extends React.Component<any, StateType> {
  private willUnmounted = false;

  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentWillUnmount() {
    this.willUnmounted = true;
  }

  private fetchData = async () => {
    try {
      const response = await axios.get('/api/data');
      if (this.willUnmounted) return;
      this.setState({
        data: response.data,
        loading: false,
      });
    } catch (error) {
      if (this.willUnmounted) return;
      this.setState({
        error: '获取数据失败',
        loading: false,
      });
    }
  };

  render() {
    const { data, loading, error } = this.state;

    return (
      <Layout className="app-my-page">
        <Content className="layout-content">
          {loading && <Spin />}
          {error && <div className="error-message">{error}</div>}
          {!loading && !error && (
            <div className="page-content">
              {/* 页面内容 */}
            </div>
          )}
        </Content>
      </Layout>
    );
  }
}
```

### 样式文件示例 (src/pages/my-page/style.less)
```less
.app-my-page {
  height: 100%;

  .layout-content {
    padding: 24px;
    background: #fff;
  }

  .page-content {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .error-message {
    color: #ff4d4f;
    text-align: center;
    padding: 20px;
  }
}
```

## 注意事项
- 使用 Ant Design 的 Layout 组件进行页面布局
- 使用 axios 进行 HTTP 请求
- 组件卸载时设置标志位防止状态更新
- 优先使用 Ant Design 组件
- 图标使用 `@ant-design/icons` 或 `createFromIconfontCN` 创建的图标字体
- 页面必须定义 TypeScript 类型
- 样式文件必须与组件文件分离
- 遵循项目的导入顺序规范
