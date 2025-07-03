'use client';

import * as React from 'react';

interface TagProps {
  children: React.ReactNode;
}

export const Tag = ({ children }: TagProps) => {
  return (
    <button className="text-[9px] font-bold bg-gray-900 border-0 text-muted! rounded px-1 py-0.5">
      {children}
    </button>
  );
};
