import NextLink from 'next/link';
import * as React from 'react';

export default function Legals(): React.ReactElement {
  return (
    <ul className="flex flex-row space-x-2 pl-0 list-none justify-center items-center [&>li:not(:last-child)]:after:content-['|'] [&>li:not(:last-child)]:after:text-muted-foreground [&>li:not(:last-child)]:after:ml-2">
      <LegalItem href="/privacy-policy">Privacy Policy</LegalItem>
      <LegalItem href="/terms-of-service">Terms of Use</LegalItem>
      <LegalItem>Status</LegalItem>
      <LegalItem>Do Not Sell My Info</LegalItem>
    </ul>
  );
}

interface LegalItemProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
}

function LegalItem(props: LegalItemProps): React.ReactElement {
  const { children, href, ...rest } = props;

  return (
    <li
      className="text-xs/6 line cursor-pointer inline-flex items-center hover:underline"
      {...rest}
    >
      {href ? (
        <NextLink
          href={href}
          className="text-muted-foreground no-underline hover:underline hover:text-foreground"
        >
          {children}
        </NextLink>
      ) : (
        <span className="text-muted-foreground hover:text-foreground">{children}</span>
      )}
    </li>
  );
}
