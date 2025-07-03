# Card 组件

一个功能丰富的 Card 组件，支持预设值和自定义值的灵活配置。

## 特性

- 支持预设的边框宽度、颜色、内边距、圆角
- 支持自定义值，通过 CSS 变量实现
- 使用静态的 Tailwind CSS 类名映射，确保 CSS 提取正确
- 完整的 TypeScript 类型支持
- 兼容 Tailwind CSS 的类名检测机制

## 基本用法

```tsx
import { Card } from '@mdxpress-ui/components';

// 基本用法
<Card>
  <h3>标题</h3>
  <p>这是卡片内容</p>
</Card>

// 使用预设值
<Card borderWidth="thick" borderColor="green" backgroundColor="gray" padding="lg" borderRadius="xl">
  <p>使用预设样式的卡片</p>
</Card>

// 使用自定义值
<Card
  borderWidth="3px"
  borderColor="#ff6b6b"
  backgroundColor="#f8f9fa"
  padding="20px 30px"
  borderRadius="12px"
>
  <p>使用自定义样式的卡片</p>
</Card>
```

## Props

| 属性名          | 类型                         | 默认值  | 描述            |
| --------------- | ---------------------------- | ------- | --------------- |
| children        | ReactNode                    | -       | 卡片内容        |
| className       | string                       | -       | 额外的 CSS 类名 |
| borderWidth     | BorderWidthPreset \| string  | 'thin'  | 边框宽度        |
| borderColor     | ColorPreset \| string        | 'gray'  | 边框颜色        |
| backgroundColor | ColorPreset \| string        | 'white' | 背景颜色        |
| padding         | PaddingPreset \| string      | 'md'    | 内边距          |
| borderRadius    | BorderRadiusPreset \| string | 'md'    | 边框圆角        |
| style           | CSSProperties                | {}      | 额外的内联样式  |

## 预设值

### 边框宽度 (BorderWidthPreset)

- `none`: 无边框 (border-0)
- `thin`: 细边框 (border)
- `medium`: 中等边框 (border-2)
- `thick`: 粗边框 (border-4)

### 颜色 (ColorPreset)

- `red`: 红色 (red-500)
- `green`: 绿色 (green-500)
- `blue`: 蓝色 (blue-500)
- `yellow`: 黄色 (yellow-500)
- `purple`: 紫色 (purple-500)
- `gray`: 灰色 (gray-500)
- `white`: 白色
- `transparent`: 透明

### 内边距 (PaddingPreset)

- `none`: 无内边距 (p-0)
- `xs`: 极小 (p-2)
- `sm`: 小 (p-3)
- `md`: 中等 (p-4)
- `lg`: 大 (p-6)
- `xl`: 极大 (p-8)
- `2xl`: 超大 (p-12)

### 边框圆角 (BorderRadiusPreset)

- `none`: 无圆角 (rounded-none)
- `sm`: 小圆角 (rounded-sm)
- `md`: 中等圆角 (rounded-md)
- `lg`: 大圆角 (rounded-lg)
- `xl`: 极大圆角 (rounded-xl)
- `full`: 完全圆角 (rounded-full)

## 自定义值

当传入的值不在预设值中时，组件会使用 CSS 变量来应用自定义样式：

```tsx
// 自定义边框宽度
<Card borderWidth="5px">内容</Card>

// 自定义颜色（支持任何 CSS 颜色值）
<Card borderColor="#ff6b6b" backgroundColor="rgba(255, 107, 107, 0.1)">内容</Card>

// 自定义内边距（支持任何 CSS 内边距值）
<Card padding="10px 20px 15px 25px">内容</Card>

// 自定义圆角
<Card borderRadius="8px 16px">内容</Card>
```

## 示例

### 信息卡片

```tsx
<Card borderColor="blue" backgroundColor="blue" className="bg-blue-50">
  <h4 className="text-blue-800 font-semibold">信息</h4>
  <p className="text-blue-700">这是一个信息提示卡片</p>
</Card>
```

### 警告卡片

```tsx
<Card
  borderColor="yellow"
  backgroundColor="transparent"
  padding="lg"
  borderRadius="lg"
>
  <h4 className="text-yellow-800 font-semibold">⚠️ 警告</h4>
  <p className="text-yellow-700">请注意这个重要信息</p>
</Card>
```

### 自定义样式卡片

```tsx
<Card
  borderWidth="2px"
  borderColor="#e74c3c"
  backgroundColor="#fdf2f2"
  padding="24px"
  borderRadius="16px"
  className="shadow-md"
>
  <h4 className="text-red-800 font-bold">自定义卡片</h4>
  <p className="text-red-600">完全自定义的卡片样式</p>
</Card>
```
