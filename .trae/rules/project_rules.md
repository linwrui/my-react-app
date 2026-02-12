---
alwaysApply: true
---
# 项目通用规则

## 技术栈
- **前端框架**: React 17.x + TypeScript
- **UI 组件库**: Ant Design 4.12.x
- **路由管理**: React Router 5.x
- **样式方案**: Less
- **HTTP 客户端**: Axios
- **构建工具**: Create React App + react-app-rewired

## 项目结构
```
src/
├── @types/           # 类型声明文件
├── assets/           # 静态资源（图片等）
├── components/       # 通用组件
├── navigation/       # 导航组件
├── pages/            # 页面组件
│   ├── color-gradient/
│   ├── game/
│   │   ├── 24-point-game/
│   │   └── board-game/
│   └── home/
├── utils/            # 工具函数
├── widgets/          # 小组件
│   ├── poker-widget/
│   ├── time-widget/
│   └── weather-widget/
├── index.tsx         # 应用入口
└── setupProxy.js     # 代理配置
```

## 代码风格规范

### TypeScript 规范
- 使用 TypeScript 严格模式
- 组件使用 Class Component 写法
- 为所有组件定义 Props 和 State 接口
- 使用 `interface` 定义对象类型，使用 `type` 定义联合类型

### React 组件规范
- 组件文件命名使用 kebab-case（如 `time-widget/index.tsx`）
- 组件导出使用 `export class` 或 `export const`
- 类组件继承 `React.Component<Props, State>`
- 使用 `constructor` 初始化 state
- 生命周期方法按顺序排列：`componentDidMount` → `componentDidUpdate` → `componentWillUnmount`
- 使用 `this.setState` 更新状态，避免直接修改 state

### 样式规范
- 样式文件使用 Less 语法，文件扩展名为 `.less`
- 每个组件目录下包含对应的 `style.less` 文件
- 使用 BEM 命名规范：`block__element--modifier`
- 避免使用内联样式，优先使用 class

### Ant Design 使用规范
- 优先使用 Ant Design 组件库
- 图标使用 `@ant-design/icons` 中的图标组件
- 按需引入组件：`import { Layout, Menu } from 'antd'`

### 代码格式化
- 使用 Prettier 进行代码格式化
- 缩进：2 空格
- 单引号：字符串使用单引号，JSX 使用双引号
- 分号：语句末尾使用分号
- 每行最大长度：120 字符
- 尾随逗号：ES5 标准

### ESLint 规则
- 遵循 `airbnb-typescript` 规范
- 允许使用 `@typescript-eslint/no-explicit-any`
- 允许使用 `no-console`
- 单个文件最多 6 个类
- 忽略 `class-methods-use-this` 规则

## 命名规范
- 组件名称：PascalCase（如 `TimeWidget`）
- 文件名：kebab-case（如 `time-widget/index.tsx`）
- 变量/函数：camelCase（如 `handleImgLoaded`）
- 常量：UPPER_SNAKE_CASE（如 `defaultTransformParams`）
- 类名：PascalCase（如 `Navigation`）
- 接口：PascalCase，以 `I` 开头或直接使用描述性名称（如 `StateType`）

## 导入顺序
1. React 相关
2. 第三方库
3. 内部组件/工具
4. 样式文件

示例：
```typescript
import React from 'react';
import { Layout, Tooltip } from 'antd';
import axios from 'axios';
import { getReverseForegroundColor } from '../../utils/color-util';
import { TimeWidget } from '../../widgets/time-widget';
import './style.less';
```

## 状态管理
- 使用 React 内置 state 进行状态管理
- 对于复杂状态，考虑使用 `componentDidMount` 进行初始化
- 使用 `componentWillUnmount` 清理副作用（如定时器、事件监听器）

## 事件处理
- 事件处理函数使用箭头函数或绑定 `this`
- 事件命名以 `handle` 开头（如 `handleImgLoaded`）
- 使用 `React.SyntheticEvent` 类型定义事件参数

## 路由管理
- 使用 `react-router-dom` 进行路由管理
- 路由配置集中在 `navigation/index.tsx` 中
- 使用 `RouteComponentProps` 获取路由参数

## API 请求
- 使用 Axios 进行 HTTP 请求
- API 请求放在 `componentDidMount` 中
- 处理组件卸载时的请求取消（使用 `willUnmounted` 标志）

## 工具函数
- 工具函数放在 `src/utils/` 目录下
- 工具函数使用纯函数，避免副作用
- 为工具函数添加类型注解

## 组件通信
- 父子组件通信：通过 props 传递数据
- 事件回调：通过 props 传递回调函数
- 避免过度使用 context，优先使用 props

## 性能优化
- 使用 `React.memo` 对函数组件进行优化
- 避免在 render 方法中创建新函数
- 合理使用 `shouldComponentUpdate` 优化类组件

## 注释规范
- 为复杂逻辑添加注释
- 注释使用中文
- 保持注释简洁明了
- 避免无意义的注释

## 开发命令
- 启动开发服务器：`yarn start`
- 构建生产版本：`yarn build`
- 运行测试：`yarn test`
