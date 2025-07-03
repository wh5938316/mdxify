"use client";

import * as React from "react";
import { useRender } from "@base-ui-components/react/use-render";
import { mergeProps } from "@base-ui-components/react/merge-props";
import { cn } from "@ui/utils";

interface ButtonGroupProps extends React.ComponentProps<"div"> {}

function ButtonGroup({
  className,
  children,
  render = <div />,
  ...props
}: ButtonGroupProps & useRender.ComponentProps<"div">) {
  const element = useRender({
    render,
    props: mergeProps<"div">(
      {
        className: cn(
          "flex [&>button:first-of-type]:rounded-r-none [&>button:first-of-type]:border-r-0 [&>button:last-of-type]:rounded-l-none [&>button:last-of-type]:-ml-px [&>button:not(:first-of-type):not(:last-of-type)]:rounded-none [&>button:not(:first-of-type):not(:last-of-type)]:border-r-0 [&>button:not(:first-of-type):not(:last-of-type)]:-ml-px [&>button:not(:first-of-type)]:z-0 [&>button:first-of-type]:z-10",
          className,
        ),
      },
      {
        "data-slot": "button-group",
      } as React.HTMLAttributes<HTMLDivElement>,
      props,
    ),
  });

  return React.cloneElement(element, {}, children);
}

export { ButtonGroup };
export type { ButtonGroupProps };
