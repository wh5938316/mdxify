"use client";

import * as React from "react";
import { PreviewCard as PreviewCardPrimitive } from "@base-ui-components/react/preview-card";

import { cn } from "@ui/utils";

function PreviewCard({
  ...props
}: React.ComponentProps<typeof PreviewCardPrimitive.Root>) {
  return <PreviewCardPrimitive.Root data-slot="preview-card" {...props} />;
}

function PreviewCardTrigger({
  ...props
}: React.ComponentProps<typeof PreviewCardPrimitive.Trigger>) {
  return (
    <PreviewCardPrimitive.Trigger data-slot="preview-card-trigger" {...props} />
  );
}

function PreviewCardContent({
  className,
  align = "center",
  sideOffset = 4,
  children,
  ...props
}: React.ComponentProps<typeof PreviewCardPrimitive.Positioner>) {
  return (
    <PreviewCardPrimitive.Portal data-slot="preview-card-portal">
      <PreviewCardPrimitive.Positioner
        align={align}
        sideOffset={sideOffset}
        {...props}
      >
        <PreviewCardPrimitive.Popup
          data-slot="preview-card-popup"
          className={cn(
            "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-64 origin-(--transform-origin) rounded-md border p-4 shadow-md outline-hidden",
            className,
          )}
        >
          {children}
        </PreviewCardPrimitive.Popup>
      </PreviewCardPrimitive.Positioner>
    </PreviewCardPrimitive.Portal>
  );
}

export { PreviewCard, PreviewCardTrigger, PreviewCardContent };
