"use client";

import * as React from "react";
import { Progress as ProgressPrimitive } from "@base-ui-components/react/progress";

import { cn } from "@ui/utils";

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      value={value}
      className={cn(
        "grid-cols-2 gap-y-2 relative h-2 w-full overflow-hidden rounded-full",
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Track className="col-span-full h-1 overflow-hidden rounded bg-primary/20  shadow-[inset_0_0_0_1px] shadow-gray-200">
        <ProgressPrimitive.Indicator
          data-slot="progress-indicator"
          className="bg-primary transition-all duration-500"
          style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        />
      </ProgressPrimitive.Track>
    </ProgressPrimitive.Root>
  );
}

export { Progress };
