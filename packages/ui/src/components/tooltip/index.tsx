"use client";

import * as React from "react";
import { Popover } from "@base-ui-components/react/popover";

import { cn } from "@ui/utils/cn";

interface TooltipProviderProps {
  delayDuration?: number;
  children: React.ReactNode;
}

function TooltipProvider({
  delayDuration = 0,
  children,
  ...props
}: TooltipProviderProps) {
  // Base UI popover doesn't need a separate provider, but we keep this for API compatibility
  return <>{children}</>;
}

interface TooltipProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

function Tooltip({ children, open, onOpenChange, ...props }: TooltipProps) {
  return (
    <Popover.Root open={open} onOpenChange={onOpenChange} {...props}>
      {children}
    </Popover.Root>
  );
}

interface TooltipTriggerProps
  extends React.ComponentProps<typeof Popover.Trigger> {}

function TooltipTrigger({ children, ...props }: TooltipTriggerProps) {
  return (
    <Popover.Trigger data-slot="tooltip-trigger" {...props}>
      {children}
    </Popover.Trigger>
  );
}

interface TooltipContentProps
  extends React.ComponentProps<typeof Popover.Popup> {
  className?: string;
  sideOffset?: number;
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
}

function TooltipContent({
  className,
  sideOffset = 4,
  children,
  side = "top",
  align = "center",
  ...props
}: TooltipContentProps) {
  return (
    <Popover.Portal>
      <Popover.Positioner sideOffset={sideOffset} side={side} align={align}>
        <Popover.Popup
          data-slot="tooltip-content"
          className={cn(
            "bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[ending-style]:animate-out data-[ending-style]:fade-out-0 data-[ending-style]:zoom-out-95 data-[starting-style]:fade-in-0 data-[starting-style]:zoom-in-95 z-50 w-fit rounded-md px-3 py-1.5 text-xs text-balance",
            "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            className,
          )}
          {...props}
        >
          {children}
          <Popover.Arrow className="bg-primary fill-primary z-50 size-2.5 data-[side=bottom]:top-[-8px] data-[side=left]:right-[-13px] data-[side=left]:rotate-90 data-[side=right]:left-[-13px] data-[side=right]:-rotate-90 data-[side=top]:bottom-[-8px] data-[side=top]:rotate-180">
            <div className="size-2.5 rotate-45 rounded-[2px] bg-primary" />
          </Popover.Arrow>
        </Popover.Popup>
      </Popover.Positioner>
    </Popover.Portal>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
