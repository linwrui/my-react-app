---
name: react-component
description: 创建符合项目规范的 React Class 组件

---

# React 组件创建技能

## 描述
此技能用于创建符合项目规范的 React Class 组件，包括 TypeScript 类型定义、样式文件和标准的项目结构。

## 使用场景
当用户要求创建新的 React 组件时触发此技能。

## 指令

### 1. 确定组件位置
- 通用组件放在 `src/components/` 目录下
- 按功能创建子目录，如 `src/components/iconfont/`

### 2. 创建组件文件结构
```
component-name/
├── index.tsx       # 组件主文件
└── style.less      # 组件样式文件
```

### 3. 编写组件代码
- 使用 Class Component 写法
- 定义 Props 和 State 接口
- 继承 `React.Component<Props, State>`
- 使用 `constructor` 初始化 state
- 实现必要的生命周期方法
- 导出组件使用 `export class`

### 4. 编写样式文件
- 使用 Less 语法
- 使用 BEM 命名规范
- 类名以组件名为前缀

### 5. 导入顺序
1. React 相关
2. 第三方库（如 Ant Design）
3. 内部组件/工具
4. 样式文件

## 示例

### 输入
创建一个名为 `ButtonGroup` 的组件，包含多个按钮，支持垂直和水平排列

### 输出

**index.tsx**
```typescript
import React from 'react';
import { Button } from 'antd';
import './style.less';

interface ButtonGroupProps {
  direction?: 'horizontal' | 'vertical';
  buttons: Array<{
    text: string;
    onClick: () => void;
    type?: 'primary' | 'default' | 'dashed' | 'text' | 'link';
  }>;
}

interface ButtonGroupState {
  activeIndex: number;
}

export class ButtonGroup extends React.Component<ButtonGroupProps, ButtonGroupState> {
  constructor(props: ButtonGroupProps) {
    super(props);
    this.state = {
      activeIndex: 0,
    };
  }

  handleClick = (index: number, onClick: () => void) => {
    this.setState({
      activeIndex: index,
    });
    onClick();
  };

  render() {
    const { direction = 'horizontal', buttons } = this.props;
    const { activeIndex } = this.state;
    return (
      <div className={`button-group button-group--${direction}`}>
        {buttons.map((button, index) => (
          <Button
            key={index}
            type={button.type}
            className={activeIndex === index ? 'button-group__item--active' : 'button-group__item'}
            onClick={() => this.handleClick(index, button.onClick)}>
            {button.text}
          </Button>
        ))}
      </div>
    );
  }
}
```

**style.less**
```less
.button-group {
  display: flex;
  gap: 8px;

  &--horizontal {
    flex-direction: row;
  }

  &--vertical {
    flex-direction: column;
  }

  &__item {
    flex: 1;
  }

  &__item--active {
    border-color: #1890ff;
    color: #1890ff;
  }
}
```
