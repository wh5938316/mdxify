'use client';

import * as React from 'react';

type SocialItemProps = {
  href: string;
  children: React.ReactNode;
};

export default function SocialItem({ href, children }: SocialItemProps) {
  return (
    <li>
      <a href={href} target="_blank" rel="noopener noreferrer">
        <button className="text-muted-foreground hover:text-foreground cursor-pointer border-0 bg-transparent p-0">
          {children}
        </button>
      </a>
    </li>
  );
}
