"use client";

import { cn } from "@mdxify/ui";
import React from "react";

// 预设值类型定义
type BorderWidthPreset = "thin" | "medium" | "thick" | "none";
type ColorPreset =
  | "red"
  | "green"
  | "blue"
  | "yellow"
  | "purple"
  | "gray"
  | "white"
  | "transparent";
type PaddingPreset = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "none";
type BorderRadiusPreset = "none" | "sm" | "md" | "lg" | "xl" | "full";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  borderWidth?: BorderWidthPreset | string;
  borderColor?: ColorPreset | string;
  backgroundColor?: ColorPreset | string;
  padding?: PaddingPreset | string;
  borderRadius?: BorderRadiusPreset | string;
  style?: React.CSSProperties;
}

// 静态类名映射 - 确保 Tailwind 可以提取这些类名
const borderWidthMap: Record<BorderWidthPreset, string> = {
  none: "border-0",
  thin: "border",
  medium: "border-2",
  thick: "border-4",
};

const borderColorMap: Record<ColorPreset, string> = {
  red: "border-red-500",
  green: "border-green-500",
  blue: "border-blue-500",
  yellow: "border-yellow-500",
  purple: "border-purple-500",
  gray: "border-gray-500",
  white: "border-white",
  transparent: "border-transparent",
};

const backgroundColorMap: Record<ColorPreset, string> = {
  red: "bg-red-500",
  green: "bg-green-500",
  blue: "bg-blue-500",
  yellow: "bg-yellow-500",
  purple: "bg-purple-500",
  gray: "bg-gray-500",
  white: "bg-white",
  transparent: "bg-transparent",
};

const paddingMap: Record<PaddingPreset, string> = {
  none: "p-0",
  xs: "p-2",
  sm: "p-3",
  md: "p-4",
  lg: "p-6",
  xl: "p-8",
  "2xl": "p-12",
};

const borderRadiusMap: Record<BorderRadiusPreset, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};

function Card({
  children,
  className,
  borderWidth = "thin",
  borderColor = "gray",
  backgroundColor = "white",
  padding = "md",
  borderRadius = "md",
  style = {},
  ...props
}: CardProps) {
  // 构建 CSS 变量用于自定义值
  const customStyle: React.CSSProperties = { ...style };

  // 处理边框宽度
  let borderWidthClass = "";
  if (typeof borderWidth === "string" && borderWidth in borderWidthMap) {
    borderWidthClass = borderWidthMap[borderWidth as BorderWidthPreset];
  } else if (typeof borderWidth === "string") {
    // 自定义边框宽度
    customStyle["--card-border-width"] = borderWidth;
    customStyle.borderWidth = "var(--card-border-width)";
    borderWidthClass = "border"; // 需要基础 border 类
  }

  // 处理边框颜色
  let borderColorClass = "";
  if (typeof borderColor === "string" && borderColor in borderColorMap) {
    borderColorClass = borderColorMap[borderColor as ColorPreset];
  } else if (typeof borderColor === "string") {
    // 自定义边框颜色
    customStyle["--card-border-color"] = borderColor;
    customStyle.borderColor = "var(--card-border-color)";
  }

  // 处理背景颜色
  let backgroundColorClass = "";
  if (
    typeof backgroundColor === "string" &&
    backgroundColor in backgroundColorMap
  ) {
    backgroundColorClass = backgroundColorMap[backgroundColor as ColorPreset];
  } else if (typeof backgroundColor === "string") {
    // 自定义背景颜色
    customStyle["--card-bg-color"] = backgroundColor;
    customStyle.backgroundColor = "var(--card-bg-color)";
  }

  // 处理内边距
  let paddingClass = "";
  if (typeof padding === "string" && padding in paddingMap) {
    paddingClass = paddingMap[padding as PaddingPreset];
  } else if (typeof padding === "string") {
    // 自定义内边距
    customStyle["--card-padding"] = padding;
    customStyle.padding = "var(--card-padding)";
  }

  // 处理边框圆角
  let borderRadiusClass = "";
  if (typeof borderRadius === "string" && borderRadius in borderRadiusMap) {
    borderRadiusClass = borderRadiusMap[borderRadius as BorderRadiusPreset];
  } else if (typeof borderRadius === "string") {
    // 自定义边框圆角
    customStyle["--card-border-radius"] = borderRadius;
    customStyle.borderRadius = "var(--card-border-radius)";
  }

  return (
    <div
      className={cn(
        // 基础样式
        "block",
        // 应用预设样式类名
        borderWidthClass,
        borderColorClass,
        backgroundColorClass,
        paddingClass,
        borderRadiusClass,
        // 用户自定义样式
        className,
      )}
      style={customStyle}
      {...props}
    >
      {children}
    </div>
  );
}

export { Card };
export type { CardProps };
