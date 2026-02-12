---
alwaysApply: true
---
# 项目通用规则

## 技术栈
- **框架**: React 17.0.1
- **语言**: TypeScript 4.2.2
- **UI 组件库**: Ant Design 4.12.3
- **样式**: Less 4.1.1
- **路由**: React Router DOM 5.2.0
- **图标**: @ant-design/icons 4.5.0

## 代码风格规范

### TypeScript/JavaScript
- 使用 TypeScript 严格模式
- 优先使用 Class 组件，保持与现有代码风格一致
- 接口定义使用 `interface` 关键字
- 禁止使用 `any` 类型，ESLint 规则已关闭该检查，但应尽量避免使用
- 使用 `private`/`public` 修饰符明确类成员的访问权限

### 样式规范
- 使用 Less 语法，不使用 CSS
- 样式文件与组件文件同名，放在同一目录下
- 示例：`index.tsx` 对应 `style.less`
- 使用嵌套语法组织样式
- 避免使用全局样式，组件样式应通过类名限定作用域

### 命名规范
- 组件文件名使用 kebab-case：`time-widget/index.tsx`
- 组件类名使用 PascalCase：`TimeWidget`
- 样式类名使用 kebab-case：`.time-widget`
- 接口名使用 PascalCase，以 `Props` 或 `State` 结尾：`TimeWidgetProps`、`TimeWidgetState`
- 私有方法使用 `private` 修饰符
- 常量使用 UPPER_SNAKE_CASE：`availablePoints`

### 组件结构
- 组件目录结构：
  ```
  component-name/
  ├── index.tsx
  └── style.less
  ```
- 导入顺序：第三方库 → 内部模块 → 样式文件
- 使用 `export class` 导出组件类
- Props 和 State 接口定义在组件类之前

### Ant Design 使用规范
- 优先使用 Ant Design 组件
- 图标使用 `@ant-design/icons`，例如：`import { CloseOutlined } from '@ant-design/icons'`
- 自定义图标使用 `createFromIconfontCN` 创建，参考 `src/components/iconfont.tsx`

### 代码格式化
- 使用 Prettier 格式化代码
- 缩进：2 空格
- 单引号：字符串使用单引号，JSX 属性使用双引号
- 分号：语句末尾添加分号
- 每行最大字符数：120
- 尾随逗号：ES5 风格

### 项目目录结构
```
src/
├── @types/           # 类型定义
├── assets/           # 静态资源
├── components/       # 公共组件
├── navigation/       # 导航相关
├── pages/            # 页面组件
├── utils/            # 工具函数
└── widgets/          # 小部件组件
```

### 生命周期方法
- 使用 `componentDidMount` 进行初始化操作
- 使用 `componentWillUnmount` 清理定时器、事件监听等
- 使用 `willUnmounted` 标志防止组件卸载后执行 setState

### 注释规范
- 函数注释使用 JSDoc 风格
- 注释使用中文描述
- 简化注释内容，避免复杂术语

### 其他规范
- 使用 `console.log` 进行调试（ESLint 已关闭 no-console 规则）
- 使用 `axios` 进行 HTTP 请求
- 使用 `react-app-rewired` 进行构建配置
- 避免使用 `import/prefer-default-export` 规则（已关闭）
