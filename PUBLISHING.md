# 发布指南

本项目使用 [Changesets](https://github.com/changesets/changesets) 来管理版本和发布。

## 🚀 快速开始

### 1. 创建 Changeset

当你做了需要发布的更改时，运行：

```bash
pnpm changeset
```

这会引导你创建一个changeset，描述你的更改类型（patch/minor/major）和影响的包。

### 2. 更新版本号

```bash
pnpm version-bump
```

这会根据所有未发布的changeset更新包版本号。

### 3. 发布包

```bash
pnpm publish-all
```

这会构建并发布所有包到npm。

## 📦 包依赖解析

### 开发时

在开发时，使用 `workspace:*` 来引用同一个workspace中的包：

```json
{
  "devDependencies": {
    "@mdxify/eslint-config": "workspace:*",
    "@mdxify/jest-config": "workspace:*",
    "@mdxify/typescript-config": "workspace:*"
  }
}
```

### 发布时

pnpm在发布时会自动将 `workspace:*` 转换为实际的版本号：

```json
{
  "devDependencies": {
    "@mdxify/eslint-config": "^0.1.0",
    "@mdxify/jest-config": "^0.1.0",
    "@mdxify/typescript-config": "^0.1.0"
  }
}
```

## 🔄 工作流程

### 典型的发布流程

1. **开发功能** - 正常开发你的功能
2. **创建changeset** - `pnpm changeset`
3. **提交代码** - 包括changeset文件
4. **更新版本** - `pnpm version-bump`
5. **发布** - `pnpm publish-all`

### 批量更新示例

```bash
# 1. 添加新功能到ui包
git add .
git commit -m "feat: add new button component"

# 2. 创建changeset
pnpm changeset
# 选择 @mdxify/ui -> minor change
# 填写描述: "Add new button component"

# 3. 提交changeset
git add .
git commit -m "chore: add changeset for button component"

# 4. 更新版本号
pnpm version-bump
# 这会更新ui包版本从0.1.0到0.2.0

# 5. 提交版本更新
git add .
git commit -m "chore: release new versions"

# 6. 发布
pnpm publish-all
```

## 🎯 版本管理策略

- **patch** (0.1.0 -> 0.1.1): 修复bug
- **minor** (0.1.0 -> 0.2.0): 添加新功能
- **major** (0.1.0 -> 1.0.0): 破坏性更改

## 🛠️ 故障排除

### 问题：workspace:\* 没有被转换

确保你使用的是 `pnpm changeset publish` 而不是 `npm publish`。

### 问题：包发布失败

1. 检查npm登录状态: `npm whoami`
2. 确保包名可用
3. 检查包权限设置

### 问题：版本冲突

使用 `pnpm changeset status` 检查当前状态。

## 📝 参考资料

- [Changesets 官方文档](https://github.com/changesets/changesets)
- [pnpm workspace 文档](https://pnpm.io/workspaces)
