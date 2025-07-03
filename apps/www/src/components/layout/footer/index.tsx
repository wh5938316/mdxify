import * as React from 'react';

import Logo from '../../logo';
import Legals from './legals';
import Socials from './socials';
import Topics from './topics';

// 状态组件
const StatusIndicator = () => {
  return (
    <div className="inline-flex items-center gap-2 bg-gray-200 rounded-full px-3 py-1.5">
      <div className="relative">
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping opacity-75"></div>
      </div>
      <span className="text-xs text-muted-foreground">All systems normal</span>
    </div>
  );
};

export default function Footer(): React.ReactElement {
  return (
    <footer className="bg-background text-primary border-t border-border">
      <div className="max-w-5xl border-l border-r border-border pt-18 pb-12 mx-auto flex flex-col justify-between gap-6 px-6">
        <div className="flex flex-row w-full justify-between pr-6">
          <div className="flex flex-col gap-4 mt-1 flex-1 w-0">
            <div>
              <Logo />
            </div>
            <p className="text-sm text-muted-foreground">© 2025 Mdxify Technologies Inc.</p>
            <div>
              <StatusIndicator />
            </div>
          </div>
          <div>
            <Topics />
          </div>
        </div>
        <div className="flex flex-row items-center justify-between mt-6">
          <Legals />
          <Socials />
        </div>
      </div>
    </footer>
  );
}
