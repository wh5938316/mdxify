"use client";

import * as React from "react";
import { Popover as BasePopover } from "@base-ui-components/react/popover";

import { cn } from "@ui/utils";

interface PopoverProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

function Popover({ children, open, onOpenChange, ...props }: PopoverProps) {
  return (
    <BasePopover.Root
      data-slot="popover"
      open={open}
      onOpenChange={onOpenChange}
      {...props}
    >
      {children}
    </BasePopover.Root>
  );
}

interface PopoverTriggerProps
  extends React.ComponentProps<typeof BasePopover.Trigger> {}

function PopoverTrigger({ children, ...props }: PopoverTriggerProps) {
  return (
    <BasePopover.Trigger data-slot="popover-trigger" {...props}>
      {children}
    </BasePopover.Trigger>
  );
}

interface PopoverContentProps {
  className?: string;
  align?: "start" | "center" | "end";
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
  container?: HTMLElement | null | React.RefObject<HTMLElement | null>;
  children: React.ReactNode;
}

function PopoverContent({
  className,
  align = "center",
  side = "bottom",
  sideOffset = 4,
  container,
  children,
  ...props
}: PopoverContentProps) {
  return (
    <BasePopover.Portal container={container}>
      <BasePopover.Positioner sideOffset={sideOffset} side={side} align={align}>
        <BasePopover.Popup
          data-slot="popover-content"
          className={cn(
            "bg-popover text-popover-foreground z-50 w-72 rounded-md border p-4 shadow-md outline-hidden",
            "data-[starting-style]:animate-in data-[ending-style]:animate-out data-[ending-style]:fade-out-0 data-[starting-style]:fade-in-0 data-[ending-style]:zoom-out-95 data-[starting-style]:zoom-in-95",
            "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            className,
          )}
          {...props}
        >
          {children}
        </BasePopover.Popup>
      </BasePopover.Positioner>
    </BasePopover.Portal>
  );
}

interface PopoverAnchorProps
  extends React.ComponentProps<typeof BasePopover.Trigger> {}

function PopoverAnchor({ children, ...props }: PopoverAnchorProps) {
  // Base UI doesn't have a separate Anchor component, using Trigger as anchor
  return (
    <BasePopover.Trigger data-slot="popover-anchor" {...props}>
      {children}
    </BasePopover.Trigger>
  );
}

interface PopoverArrowProps {
  className?: string;
  children?: React.ReactNode;
}

function PopoverArrow({ className, children, ...props }: PopoverArrowProps) {
  return (
    <BasePopover.Arrow
      className={cn(
        "z-50 size-2.5 data-[side=bottom]:top-[-8px] data-[side=left]:right-[-13px] data-[side=left]:rotate-90 data-[side=right]:left-[-13px] data-[side=right]:-rotate-90 data-[side=top]:bottom-[-8px] data-[side=top]:rotate-180",
        className,
      )}
      {...props}
    >
      {children || (
        <div className="size-2.5 rotate-45 rounded-[2px] bg-popover border border-border" />
      )}
    </BasePopover.Arrow>
  );
}

interface PopoverTitleProps {
  className?: string;
  children: React.ReactNode;
}

function PopoverTitle({ className, children, ...props }: PopoverTitleProps) {
  return (
    <BasePopover.Title
      className={cn("text-base font-medium", className)}
      {...props}
    >
      {children}
    </BasePopover.Title>
  );
}

interface PopoverDescriptionProps {
  className?: string;
  children: React.ReactNode;
}

function PopoverDescription({
  className,
  children,
  ...props
}: PopoverDescriptionProps) {
  return (
    <BasePopover.Description
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    >
      {children}
    </BasePopover.Description>
  );
}

export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverAnchor,
  PopoverArrow,
  PopoverTitle,
  PopoverDescription,
};
