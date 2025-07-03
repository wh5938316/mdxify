"use client";

import * as React from "react";
import { Separator as SeparatorPrimitive } from "@base-ui-components/react/separator";

import { cn } from "@ui/utils";

function Separator({
  className,
  orientation = "horizontal",
  children,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive>) {
  if (children) {
    return (
      <SeparatorPrimitive
        data-slot="separator"
        orientation={orientation}
        className={cn(
          "relative flex items-center justify-center text-sm text-muted-foreground",
          "before:flex-1 before:h-px before:bg-border before:content-['']",
          "after:flex-1 after:h-px after:bg-border after:content-['']",
          "data-[orientation=horizontal]:before:mr-4 data-[orientation=horizontal]:after:ml-4",
          "data-[orientation=vertical]:flex-col data-[orientation=vertical]:before:w-px data-[orientation=vertical]:before:h-auto data-[orientation=vertical]:after:w-px data-[orientation=vertical]:after:h-auto",
          "data-[orientation=vertical]:before:mb-4 data-[orientation=vertical]:after:mt-4",
          className,
        )}
        {...props}
      >
        {children}
      </SeparatorPrimitive>
    );
  }

  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={orientation}
      className={cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className,
      )}
      {...props}
    />
  );
}

export { Separator };
