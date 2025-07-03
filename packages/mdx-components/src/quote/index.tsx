"use client";

import { cn } from "@mdxify/ui";
import React from "react";

interface QuoteProps {
  children: React.ReactNode;
  author?: string;
  avatar?: string;
  className?: string;
}

function Quote({ children, author, avatar, className }: QuoteProps) {
  return (
    <div className={cn("relative my-8 rounded-lg pt-8 pb-4", className)}>
      {/* 引号图标 */}
      <div className="absolute -top-2 left-0 flex h-8 w-8 items-center justify-center rounded-full text-green-600">
        <svg
          className="h-8 w-8"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
        </svg>
      </div>

      {/* 引用内容 */}
      <h6 className="text-xl italic font-bold leading-relaxed text-gray-900 dark:text-gray-100">
        {children}
      </h6>

      {/* 作者信息 */}
      {author && (
        <div className="mt-4 flex items-center gap-3 not-prose">
          {avatar && (
            <img
              src={avatar}
              alt={author}
              className="h-8 w-8 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-700"
            />
          )}
          <cite className="text-sm font-medium text-secondary-foreground not-italic">
            - {author}
          </cite>
        </div>
      )}
    </div>
  );
}

export { Quote };
