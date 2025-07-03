'use client';

import NextLink from 'next/link';
import * as React from 'react';

import { Tag } from './tag';
import { footerData } from '@/data/footer';

export default function Topics(): React.ReactElement {
  return (
    <div className="flex flex-row space-x-24">
      {footerData.map((footerCol) => (
        <div key={footerCol.title} className="flex flex-col gap-3 flex-nowrap">
          <h3 className="text-sm font-bold text-foreground mb-0">{footerCol.title}</h3>
          <div className="flex flex-col space-y-2">
            {footerCol.links.map((footerLink) => {
              if (!footerLink.href) {
                return (
                  <div
                    key={footerLink.title}
                    className="flex items-center cursor-pointer gap-4 bg-transparent border-0 p-0 text-muted-foreground hover:text-foreground [&>button]:hover:text-primary"
                  >
                    <span className="text-sm whitespace-nowrap">{footerLink.title}</span>
                    {footerLink.tag ? <Tag>{footerLink.tag}</Tag> : null}
                  </div>
                );
              }

              return (
                <NextLink
                  key={footerLink.title}
                  href={footerLink.href}
                  className="flex items-center cursor-pointer gap-4 bg-transparent border-0 p-0 text-muted-foreground no-underline hover:text-foreground [&>button]:hover:text-primary"
                >
                  <span className="text-sm whitespace-nowrap">{footerLink.title}</span>
                  {footerLink.tag ? <Tag>{footerLink.tag}</Tag> : null}
                </NextLink>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
