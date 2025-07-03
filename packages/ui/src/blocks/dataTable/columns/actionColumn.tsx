"use client";

import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@ui/components/dropdownMenu";
import { cn } from "@ui/utils";

interface ActionColumnProps {
  children: React.ReactNode;
  width?: number;
  className?: string;
}

export function ActionColumn({
  width = 160,
  className,
  children,
}: ActionColumnProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className={cn("data-[state=open]:bg-muted size-8", className)}
          >
            <MoreHorizontal />
            <span className="sr-only">Open menu</span>
          </Button>
        }
      ></DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[160px]"
        // className="w-[var(--table-action-column-width)]"
      >
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
