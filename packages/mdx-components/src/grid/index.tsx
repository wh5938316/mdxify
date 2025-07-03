import { cn } from "@mdxify/ui";
import React from "react";

// 基础 Grids 组件（原 Grid 组件）
interface GridsProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  gap?: "none" | "sm" | "md" | "lg" | "xl";
  rows?: "auto" | number;
  responsive?: boolean;
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
}

export function Grids({
  children,
  cols = 2,
  gap = "md",
  rows = "auto",
  responsive = true,
  align = "stretch",
  justify = "start",
  className,
  ...props
}: GridsProps) {
  const gridClasses = cn(
    "grid my-8",
    // 列数设置
    {
      "grid-cols-1": cols === 1,
      "grid-cols-2": cols === 2,
      "grid-cols-3": cols === 3,
      "grid-cols-4": cols === 4,
      "grid-cols-5": cols === 5,
      "grid-cols-6": cols === 6,
      "grid-cols-12": cols === 12,
    },
    // 响应式设置
    responsive && {
      "grid-cols-1 md:grid-cols-2": cols === 2,
      "grid-cols-1 md:grid-cols-2 lg:grid-cols-3": cols === 3,
      "grid-cols-1 md:grid-cols-2 lg:grid-cols-4": cols === 4,
      "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5": cols === 5,
      "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6": cols === 6,
    },
    // 间距设置
    {
      "gap-0": gap === "none",
      "gap-2": gap === "sm",
      "gap-4": gap === "md",
      "gap-6": gap === "lg",
      "gap-8": gap === "xl",
    },
    // 行数设置
    typeof rows === "number" && `grid-rows-${rows}`,
    // 对齐设置
    {
      "items-start": align === "start",
      "items-center": align === "center",
      "items-end": align === "end",
      "items-stretch": align === "stretch",
    },
    // 水平对齐设置
    {
      "justify-items-start": justify === "start",
      "justify-items-center": justify === "center",
      "justify-items-end": justify === "end",
      "justify-between": justify === "between",
      "justify-around": justify === "around",
      "justify-evenly": justify === "evenly",
    },
    className,
  );

  return (
    <div className={gridClasses} {...props}>
      {children}
    </div>
  );
}

// Grid 项目组件（原 GridItem 组件）
interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  colSpan?: 1 | 2 | 3 | 4 | 5 | 6 | 12 | "full";
  rowSpan?: 1 | 2 | 3 | 4 | 5 | 6 | "full";
  colStart?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  rowStart?: 1 | 2 | 3 | 4 | 5 | 6;
}

export function Grid({
  children,
  colSpan,
  rowSpan,
  colStart,
  rowStart,
  className,
  ...props
}: GridProps) {
  const itemClasses = cn(
    // 列跨度
    colSpan && {
      "col-span-1": colSpan === 1,
      "col-span-2": colSpan === 2,
      "col-span-3": colSpan === 3,
      "col-span-4": colSpan === 4,
      "col-span-5": colSpan === 5,
      "col-span-6": colSpan === 6,
      "col-span-12": colSpan === 12,
      "col-span-full": colSpan === "full",
    },
    // 行跨度
    rowSpan && {
      "row-span-1": rowSpan === 1,
      "row-span-2": rowSpan === 2,
      "row-span-3": rowSpan === 3,
      "row-span-4": rowSpan === 4,
      "row-span-5": rowSpan === 5,
      "row-span-6": rowSpan === 6,
      "row-span-full": rowSpan === "full",
    },
    // 列起始位置
    colStart && {
      "col-start-1": colStart === 1,
      "col-start-2": colStart === 2,
      "col-start-3": colStart === 3,
      "col-start-4": colStart === 4,
      "col-start-5": colStart === 5,
      "col-start-6": colStart === 6,
      "col-start-7": colStart === 7,
      "col-start-8": colStart === 8,
      "col-start-9": colStart === 9,
      "col-start-10": colStart === 10,
      "col-start-11": colStart === 11,
      "col-start-12": colStart === 12,
    },
    // 行起始位置
    rowStart && {
      "row-start-1": rowStart === 1,
      "row-start-2": rowStart === 2,
      "row-start-3": rowStart === 3,
      "row-start-4": rowStart === 4,
      "row-start-5": rowStart === 5,
      "row-start-6": rowStart === 6,
    },
    className,
  );

  return (
    <div className={cn("w-full", className)} {...props}>
      {children}
    </div>
  );
}

// 设置默认导出
export default Grids;
