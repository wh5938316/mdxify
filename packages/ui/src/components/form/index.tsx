"use client";

import * as React from "react";
import { Field } from "@base-ui-components/react/field";
import { Form as BaseForm } from "@base-ui-components/react/form";

import { cn } from "@ui/utils";
import { Select, SelectContent, SelectTrigger, SelectValue } from "../select";
import { useCallback } from "react";

// Form component wrapper
const Form = React.forwardRef<
  React.ComponentRef<typeof BaseForm>,
  React.ComponentPropsWithoutRef<typeof BaseForm>
>(({ className, ...props }, ref) => {
  return (
    <BaseForm ref={ref} className={cn("space-y-4", className)} {...props} />
  );
});
Form.displayName = "Form";

// FormItem component
const FormItem = React.forwardRef<
  React.ComponentRef<typeof Field.Root>,
  React.ComponentPropsWithoutRef<typeof Field.Root>
>(({ className, ...props }, ref) => {
  return (
    <Field.Root ref={ref} className={cn("grid gap-2", className)} {...props} />
  );
});
FormItem.displayName = "FormItem";

// FormLabel component
const FormLabel = React.forwardRef<
  React.ComponentRef<typeof Field.Label>,
  React.ComponentPropsWithoutRef<typeof Field.Label>
>(({ className, ...props }, ref) => {
  return (
    <Field.Label
      ref={ref}
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className,
      )}
      {...props}
    />
  );
});
FormLabel.displayName = "FormLabel";

// FormControl component
const FormControl = React.forwardRef<
  React.ComponentRef<typeof Field.Control>,
  React.ComponentPropsWithoutRef<typeof Field.Control>
>(({ className, ...props }, ref) => {
  return (
    <Field.Control
      ref={ref}
      className={cn(
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
});
FormControl.displayName = "FormControl";

// FormDescription component
const FormDescription = React.forwardRef<
  React.ComponentRef<typeof Field.Description>,
  React.ComponentPropsWithoutRef<typeof Field.Description>
>(({ className, ...props }, ref) => {
  return (
    <Field.Description
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
});
FormDescription.displayName = "FormDescription";

// FormMessage component (for errors)
const FormMessage = React.forwardRef<
  React.ComponentRef<typeof Field.Error>,
  React.ComponentPropsWithoutRef<typeof Field.Error>
>(({ className, ...props }, ref) => {
  return (
    <Field.Error
      ref={ref}
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    />
  );
});
FormMessage.displayName = "FormMessage";

// Custom textarea component
const FormTextarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
});
FormTextarea.displayName = "FormTextarea";

export {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormTextarea,
};
