---
name: react-widget
description: 创建符合项目规范的 React 小组件

---

# React 小组件创建技能

## 描述
此技能用于创建符合项目规范的 React 小组件，小组件是可复用的轻量级组件，通常用于展示特定功能或数据。

## 使用场景
当用户要求创建新的小组件时触发此技能。

## 指令

### 1. 确定小组件位置
- 小组件放在 `src/widgets/` 目录下
- 按功能创建子目录，如 `src/widgets/time-widget/`

### 2. 创建小组件文件结构
```
widget-name/
├── index.tsx       # 小组件主文件
└── style.less      # 小组件样式文件
```

### 3. 编写小组件代码
- 使用 Class Component 写法
- 定义 Props 接口（通常接收 color 等样式属性）
- 定义 State 接口（用于内部状态管理）
- 继承 `React.Component<Props, State>`
- 使用 `constructor` 初始化 state
- 在 `componentDidMount` 中启动定时器或进行初始化
- 在 `componentWillUnmount` 中清理定时器或事件监听器
- 导出组件使用 `export class`

### 4. 编写样式文件
- 使用 Less 语法
- 使用 BEM 命名规范
- 类名以 `widget-name` 为前缀
- 支持通过 props 传入的 color 属性动态设置颜色

### 5. 导入顺序
1. React 相关
2. 第三方库
3. 内部工具
4. 样式文件

## 示例

### 输入
创建一个名为 `CountdownWidget` 的倒计时小组件，显示剩余时间，支持自定义颜色

### 输出

**src/widgets/countdown-widget/index.tsx**
```typescript
import React from 'react';
import './style.less';

interface CountdownWidgetProps {
  color?: string;
  targetTime: Date;
}

interface CountdownWidgetState {
  remaining: number;
}

export class CountdownWidget extends React.Component<CountdownWidgetProps, CountdownWidgetState> {
  private countdownInterval: any;

  constructor(props: CountdownWidgetProps) {
    super(props);
    this.state = {
      remaining: 0,
    };
  }

  componentDidMount() {
    this.startCountdown();
  }

  componentWillUnmount() {
    clearInterval(this.countdownInterval);
  }

  startCountdown = () => {
    this.updateRemaining();
    this.countdownInterval = setInterval(() => {
      this.updateRemaining();
    }, 1000);
  };

  updateRemaining = () => {
    const { targetTime } = this.props;
    const now = new Date().getTime();
    const target = targetTime.getTime();
    const remaining = Math.max(0, target - now);
    this.setState({
      remaining,
    });
  };

  formatTime = (milliseconds: number) => {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    const numberToString = (num: number) => (num >= 10 ? num.toString() : `0${num}`);
    return `${numberToString(hours)}:${numberToString(minutes)}:${numberToString(seconds)}`;
  };

  render() {
    const { remaining } = this.state;
    const { color } = this.props;
    return (
      <div style={{ color }} className="countdown-widget">
        <div className="countdown-widget__label">倒计时</div>
        <div className="countdown-widget__time">{this.formatTime(remaining)}</div>
      </div>
    );
  }
}
```

**src/widgets/countdown-widget/style.less**
```less
.countdown-widget {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);

  &__label {
    font-size: 14px;
    opacity: 0.8;
  }

  &__time {
    font-size: 32px;
    font-weight: bold;
    font-family: monospace;
  }
}
```

**使用示例**
```typescript
import { CountdownWidget } from '../../widgets/countdown-widget';

// 在页面中使用
<CountdownWidget 
  color="#ffffff" 
  targetTime={new Date('2026-12-31 23:59:59')} 
/>
```
