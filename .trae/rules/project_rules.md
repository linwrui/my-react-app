---
alwaysApply: true
---

# 项目通用规则

## 技术栈
- **前端框架**：React 17.0.1
- **开发语言**：TypeScript 4.2.2
- **UI 组件库**：Ant Design 4.12.3
- **样式预处理器**：Less
- **路由**：React Router 5.2.0
- **HTTP 客户端**：Axios
- **图标库**：@ant-design/icons

## 项目结构规范

### 目录组织
```
src/
├── components/      # 通用组件
├── pages/          # 页面组件
├── widgets/        # 小部件组件
├── utils/          # 工具函数
├── navigation/     # 导航组件
├── assets/         # 静态资源
└── @types/         # TypeScript 类型定义
```

### 文件命名规范
- 组件文件：使用 kebab-case 命名，如 `color-gradient/index.tsx`
- 样式文件：与组件同名，使用 `style.less`
- 工具函数：使用 kebab-case 命名，如 `color-util.ts`
- 类型定义：使用 kebab-case 命名，如 `index.d.ts`

## 代码风格规范

### 组件编写规范
- 优先使用类组件（Class Component），保持与现有代码风格一致
- 组件文件应包含对应的样式文件
- 组件导出使用命名导出，如 `export class Home extends React.Component`
- 组件 Props 和 State 必须定义 TypeScript 接口

### 样式编写规范
- 使用 Less 作为样式预处理器
- 样式文件与组件文件分离，命名为 `style.less`
- 使用 BEM 命名规范或类似语义化命名
- 避免使用内联样式，优先使用类名样式

### 类型定义规范
- 所有组件必须定义 Props 和 State 接口
- 工具函数必须有明确的参数和返回值类型
- 使用 TypeScript 严格模式
- 类型定义放在 `@types` 目录或组件文件内部

### 注释规范
- 使用 JSDoc 风格的注释
- 函数必须有注释说明功能、参数和返回值
- 复杂逻辑需要添加行内注释
- 注释使用中文描述

### 组件库使用规范
- 优先使用 Ant Design 组件
- 图标使用 `@ant-design/icons` 或通过 `createFromIconfontCN` 创建的图标字体
- 组件属性使用 TypeScript 类型定义

### 导入规范
- 导入顺序：React 相关 → 第三方库 → 项目内部组件 → 工具函数 → 样式文件
- 使用绝对路径导入，避免相对路径
- 按功能分组导入，每组之间空一行

## 开发流程规范

### 启动项目
```bash
yarn start
```

### 构建项目
```bash
yarn build
```

### 测试项目
```bash
yarn test
```

## 代码质量规范

### ESLint 配置
- 使用 Airbnb TypeScript 规范
- 配合 Prettier 进行代码格式化
- 提交代码前必须通过 ESLint 检查

### TypeScript 配置
- 启用严格模式
- 启用所有类型检查选项
- 配置路径别名（如需要）

## 其他注意事项
- 使用 HashRouter 进行路由管理
- 使用 axios 进行 HTTP 请求，配合 setupProxy.js 进行代理配置
- 使用 react-app-rewired 进行自定义 webpack 配置
- 静态资源放在 `public` 目录或 `src/assets` 目录
- 组件卸载时清理副作用（如定时器、事件监听器）
