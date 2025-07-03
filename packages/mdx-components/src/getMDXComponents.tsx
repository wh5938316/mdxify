import { MDXComponents } from "mdx/types";
import { HTMLAttributes } from "react";

import { Accordion, Accordions } from "./accordion";
import { Card } from "./card";
import Carousel from "./carousel";
import { CodeBlock, Pre } from "./codeBlock";
import Grids, { Grid } from "./grid";
import { Heading } from "./heading";
import { Image } from "./image";
import { ImageZoom } from "./imageZoom";
import { Link } from "./link";
import { Quote } from "./quote";
import { Table } from "./table";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    a: Link,
    h1: (props: HTMLAttributes<HTMLHeadingElement>) => (
      <Heading as="h1" {...props} />
    ),
    h2: (props: HTMLAttributes<HTMLHeadingElement>) => (
      <Heading as="h2" {...props} />
    ),
    h3: (props: HTMLAttributes<HTMLHeadingElement>) => (
      <Heading as="h3" {...props} />
    ),
    h4: (props: HTMLAttributes<HTMLHeadingElement>) => (
      <Heading as="h4" {...props} />
    ),
    h5: (props: HTMLAttributes<HTMLHeadingElement>) => (
      <Heading as="h5" {...props} />
    ),
    h6: (props: HTMLAttributes<HTMLHeadingElement>) => (
      <Heading as="h6" {...props} />
    ),
    img: Image,
    ImageZoom: ImageZoom,
    table: Table,
    Accordion,
    Accordions,
    Grids,
    Grid,
    pre: (props: HTMLAttributes<HTMLPreElement>) => (
      <CodeBlock {...props}>
        <Pre>{props.children}</Pre>
      </CodeBlock>
    ),
    Quote,
    Carousel,
    Card,
    ...components,
  };
}
