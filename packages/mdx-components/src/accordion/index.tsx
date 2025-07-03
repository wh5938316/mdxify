"use client";

import { Accordion as AccordionPrimitive } from "@base-ui-components/react/accordion";
import { buttonVariants } from "@mdxify/ui/components/button";
import { cn } from "@mdxify/ui";
import { useCopyButton } from "@mdxify/ui/hooks";
import { Check, ChevronRight, Link as LinkIcon } from "lucide-react";
import * as React from "react";

// 导出样式类名供 mdxpress-editor 复用
export const accordionStyles = {
  root: "divide-y divide-border overflow-hidden rounded-lg border bg-card",
  item: "group/accordion relative scroll-m-20",
  header:
    "not-prose flex flex-row items-center text-card-foreground font-medium",
  trigger:
    "flex flex-1 items-center gap-2 px-4 py-2.5 text-start focus-visible:outline-none hover:bg-accent transition-colors",
  chevron:
    "-ms-1 size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[panel-open]/accordion:rotate-90",
  panel:
    "h-[var(--accordion-panel-height)] overflow-hidden transition-[height] ease-out data-[ending-style]:h-0 data-[starting-style]:h-0",
  content: "px-4 pb-2 text-[15px] prose-no-margin",
};

export interface AccordionsProps {
  children: React.ReactNode;
  type?: "single" | "multiple";
  className?: string;
  defaultValue?: string | string[];
}

export const Accordions = React.forwardRef<HTMLDivElement, AccordionsProps>(
  ({ type = "single", className, defaultValue, children, ...props }, ref) => {
    // 将 defaultValue 转换为 @base-ui-components 需要的数组格式
    const normalizedDefaultValue = React.useMemo(() => {
      if (defaultValue === undefined) return [];
      return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
    }, [defaultValue]);

    return (
      <AccordionPrimitive.Root
        ref={ref}
        defaultValue={normalizedDefaultValue}
        className={cn(accordionStyles.root, className)}
        {...props}
      >
        {children}
      </AccordionPrimitive.Root>
    );
  },
);

Accordions.displayName = "Accordions";

export interface AccordionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ title, className, id, children, ...props }, ref) => {
    return (
      <AccordionPrimitive.Item
        ref={ref}
        value={id ?? title}
        className={cn(accordionStyles.item, className)}
        {...props}
      >
        <AccordionPrimitive.Header id={id} className={accordionStyles.header}>
          <AccordionPrimitive.Trigger className={accordionStyles.trigger}>
            <ChevronRight className={accordionStyles.chevron} />
            {title}
          </AccordionPrimitive.Trigger>
          {id ? <CopyButton id={id} /> : null}
        </AccordionPrimitive.Header>
        <AccordionPrimitive.Panel className={accordionStyles.panel}>
          <div className={accordionStyles.content}>{children}</div>
        </AccordionPrimitive.Panel>
      </AccordionPrimitive.Item>
    );
  },
);

function CopyButton({ id }: { id: string }): React.ReactElement {
  const [checked, onClick] = useCopyButton(() => {
    const url = new URL(window.location.href);
    url.hash = id;

    void navigator.clipboard.writeText(url.toString());
  });

  return (
    <button
      type="button"
      aria-label="Copy Link"
      className={cn(
        buttonVariants({
          variant: "ghost",
          className: "text-muted-foreground me-2",
        }),
      )}
      onClick={onClick}
    >
      {checked ? (
        <Check className="size-3.5" />
      ) : (
        <LinkIcon className="size-3.5" />
      )}
    </button>
  );
}

Accordion.displayName = "Accordion";

// 导出通用组件供 mdxpress-editor 使用
export { CopyButton };
