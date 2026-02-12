---
name: less-style
description: 创建 Less 样式文件，遵循项目规范

---

# Less 样式创建技能

## 描述
创建符合项目规范的 Less 样式文件，使用 Less 语法和嵌套结构。

## 使用场景
当用户要求创建或修改组件样式时触发此技能。

## 指令

### 1. 样式文件命名
- 样式文件与组件文件同名：`style.less`
- 放在组件目录下：`component-name/style.less`

### 2. 样式文件结构
```less
.component-name {
  // 根元素样式

  .child-element {
    // 子元素样式
  }

  &.modifier {
    // 修饰符样式
  }

  &:hover {
    // 伪类样式
  }
}
```

### 3. Less 语法规范
- 使用嵌套语法组织样式
- 使用 `&` 符号引用父选择器
- 使用变量定义可复用的值
- 使用 Mixin 复用样式代码
- 避免使用 CSS 原生语法

### 4. 命名规范
- 类名使用 kebab-case：`.time-widget`
- 使用 BEM 命名规范（可选）
- 避免使用简写和缩写

### 5. 样式组织
- 按照元素层级嵌套
- 相关样式放在一起
- 使用注释分隔不同部分

### 6. 注意事项
- 避免使用全局样式
- 组件样式应通过类名限定作用域
- 使用相对单位（em、rem、%）而非绝对单位（px）
- 使用 Flexbox 或 Grid 布局
- 响应式设计使用媒体查询

## 示例

### 输入
为时间组件创建样式文件，包含时间和日期的样式

### 输出
创建 `src/widgets/time-widget/style.less`

### 样式代码
```less
.time-widget {
  color: #D2D2D2;

  .time {
    font-size: 60px;
    font-weight: bold;
  }

  .date {
    font-size: 20px;
    margin-top: 10px;
  }

  &:hover {
    opacity: 0.8;
  }
}
```

### 复杂示例
```less
.poker24Point-game {
  padding: 20px;

  .post-cards {
    margin-bottom: 20px;

    &-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  .poker-cards {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  .calc-results {
    max-height: 400px;
    overflow-y: auto;

    &-title {
      margin-bottom: 15px;
    }

    .calc-result {
      padding: 8px;
      margin-bottom: 5px;
      background-color: #f5f5f5;
      border-radius: 4px;
    }

    .calc-message {
      color: #ff4d4f;
      font-size: 14px;
    }
  }
}
```

### 使用变量的示例
```less
@primary-color: #1890ff;
@border-radius: 4px;
@spacing-base: 8px;

.button {
  background-color: @primary-color;
  border-radius: @border-radius;
  padding: @spacing-base * 2 @spacing-base * 3;

  &:hover {
    background-color: darken(@primary-color, 10%);
  }
}
```

### 使用 Mixin 的示例
```less
.flex-center() {
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  .flex-center();
  height: 100vh;
}
```
