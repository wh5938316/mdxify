#!/bin/bash

set -e

echo "🚀 开始发布流程..."

# 检查是否有未提交的更改
if [ -n "$(git status --porcelain)" ]; then
  echo "❌ 存在未提交的更改，请先提交所有更改"
  git status
  exit 1
fi

# 构建所有包
echo "🏗️  构建所有包..."
pnpm build

# 使用changeset发布
echo "📦 发布包..."
pnpm changeset publish

echo "🎉 发布完成!"
echo "📝 如果需要创建changeset，请运行: pnpm changeset"
echo "📝 如果需要更新版本，请运行: pnpm version-bump" 