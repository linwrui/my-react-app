---
name: react-class-component
description: 创建 React Class 组件，遵循项目规范

---

# React Class 组件创建技能

## 描述
创建符合项目规范的 React Class 组件，包含 TypeScript 类型定义和 Less 样式文件。

## 使用场景
当用户要求创建新的 React 组件时触发此技能。

## 指令

### 1. 确定组件信息
- 组件名称（使用 PascalCase）
- 组件位置（pages/components/widgets 之一）
- 组件功能描述

### 2. 创建组件文件
- 在指定目录下创建组件文件夹（kebab-case）
- 创建 `index.tsx` 文件
- 创建 `style.less` 文件

### 3. 组件代码结构
```typescript
import React from 'react';
import './style.less';

interface ComponentNameProps {
  // 定义 Props 接口
}

interface ComponentNameState {
  // 定义 State 接口
}

export class ComponentName extends React.Component<ComponentNameProps, ComponentNameState> {
  constructor(props: ComponentNameProps) {
    super(props);
    this.state = {
      // 初始化 state
    };
  }

  componentDidMount() {
    // 组件挂载时的操作
  }

  componentWillUnmount() {
    // 组件卸载时的清理操作
  }

  private handleEvent = () => {
    // 事件处理方法
  };

  render() {
    const { /* props */ } = this.props;
    const { /* state */ } = this.state;

    return (
      <div className="component-name">
        {/* JSX 内容 */}
      </div>
    );
  }
}
```

### 4. 样式文件结构
```less
.component-name {
  // 样式定义

  .child-element {
    // 子元素样式
  }
}
```

### 5. 注意事项
- 使用 TypeScript 严格模式
- Props 和 State 接口定义在组件类之前
- 私有方法使用 `private` 修饰符
- 事件处理方法使用箭头函数绑定 this
- 使用 `willUnmounted` 标志防止组件卸载后执行 setState
- 样式类名使用 kebab-case
- 使用 Less 嵌套语法

## 示例

### 输入
创建一个时间显示组件，显示当前时间和日期

### 输出
创建 `src/widgets/time-widget/index.tsx` 和 `src/widgets/time-widget/style.less`

### 组件代码
```typescript
import React from 'react';
import './style.less';

interface TimeWidgetProps {
  color?: string;
}

interface TimeWidgetState {
  now: Date;
}

export class TimeWidget extends React.Component<TimeWidgetProps, TimeWidgetState> {
  private timeInterval: any;

  constructor(props: TimeWidgetProps) {
    super(props);
    this.state = {
      now: new Date(),
    };
  }

  componentDidMount() {
    this.startTimeInterval();
  }

  componentWillUnmount() {
    clearInterval(this.timeInterval);
  }

  private startTimeInterval() {
    this.timeInterval = setInterval(() => {
      this.setState({
        now: new Date(),
      });
    }, 100);
  }

  render() {
    const { now } = this.state;
    const { color } = this.props;
    const numberToString = (num: number) => (num >= 10 ? num.toString() : `0${num}`);
    return (
      <div style={{ color }} className="time-widget">
        <div className="time">
          <span>
            {numberToString(now.getHours())}:{numberToString(now.getMinutes())}:{numberToString(now.getSeconds())}
          </span>
        </div>
        <div className="date">
          <span>
            {numberToString(now.getFullYear())} / {numberToString(now.getMonth())} / {numberToString(now.getDate())}
          </span>
        </div>
      </div>
    );
  }
}
```

### 样式代码
```less
.time-widget {
  color: #D2D2D2;

  .time {
    font-size: 60px;
  }

  .date {
    font-size: 20px;
  }
}
```
