"use client";

import * as React from "react";
import { type VariantProps } from "class-variance-authority";
import { ChevronDown } from "lucide-react";
import { Button, buttonVariants, ButtonGroup } from "./index";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@ui/components/dropdownMenu";

interface ActionMenuProps
  extends Omit<React.ComponentProps<typeof Button>, "children"> {
  /** 主按钮的内容 */
  buttonContent: React.ReactNode;
  /** 下拉菜单的内容 */
  children: React.ReactNode;
  /** 主按钮点击事件 */
  onAction?: () => void;
  /** 下拉菜单对齐方式 */
  menuAlign?: "start" | "center" | "end";
  /** 下拉菜单侧边 */
  menuSide?: "top" | "bottom" | "left" | "right";
}

function ActionMenu({
  buttonContent,
  children,
  onAction,
  menuAlign = "end",
  menuSide = "bottom",
  variant = "default",
  size = "default",
  className,
  ...props
}: ActionMenuProps) {
  return (
    <ButtonGroup>
      {/* 主操作按钮 */}
      <Button
        variant={variant}
        size={size}
        className={className}
        onClick={onAction}
        {...props}
      >
        {buttonContent}
      </Button>

      {/* 下拉菜单按钮 */}
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant={variant} size={size} className="px-2">
              <ChevronDown className="w-4 h-4" />
            </Button>
          }
        />
        <DropdownMenuContent align={menuAlign} side={menuSide}>
          {children}
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  );
}

export { ActionMenu };
export type { ActionMenuProps };
