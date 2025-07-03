'use client';

import { mergeProps } from '@base-ui-components/react/merge-props';
import { useRender } from '@base-ui-components/react/use-render';
import { useMemo } from 'react';

import { cn } from '@mdxify/ui';

type ArticleCardProps = {
  coverImage: string;
  title: string;
  description: string;
  author: {
    name: string;
    avatar: string;
  };
  publishDate: string;
} & Omit<React.ComponentProps<'div'>, 'children'> &
  Omit<useRender.ComponentProps<'div'>, 'children'>;

export default function ArticleCard(props: ArticleCardProps) {
  const {
    render = <div />,
    className,
    coverImage,
    title,
    description,
    author,
    publishDate,
    ...restProps
  } = props;

  const content = useMemo(() => {
    return (
      <>
        <div className="aspect-[16/9] overflow-hidden">
          <img
            src={coverImage}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="py-4">
          <h3 className="text-xl font-semibold text-primary mb-3 line-clamp-2 transition-colors duration-200">
            {title}
          </h3>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed mb-4">
            {description}
          </p>
          <div className="flex items-center gap-3">
            <img
              src={author.avatar}
              alt={author.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex items-center text-sm text-gray-500 gap-2">
              <span className="font-medium text-gray-700">{author.name}</span>
              <span>•</span>
              <span>{publishDate}</span>
            </div>
          </div>
        </div>
      </>
    );
  }, []);

  const element = useRender({
    render,
    props: mergeProps<'div'>(
      {
        className: cn(
          'group block rounded-2xl overflow-hidden transition-all duration-300',
          className,
        ),
      },
      restProps,
      {
        children: content,
      },
    ),
  });

  return element;
}

// 横向文章卡片组件
type ArticleCardHorizontalProps = {
  coverImage: string;
  title: string;
  description: string;
  author: {
    name: string;
    avatar: string;
    role?: string;
  };
  publishDate: string;
  readTime?: string;
} & Omit<React.ComponentProps<'div'>, 'children'> &
  Omit<useRender.ComponentProps<'div'>, 'children'>;

export function ArticleCardHorizontal(props: ArticleCardHorizontalProps) {
  const {
    render = <div />,
    className,
    coverImage,
    title,
    description,
    author,
    publishDate,
    readTime,
    ...restProps
  } = props;

  const content = useMemo(() => {
    return (
      <>
        {/* 左侧封面图片 */}
        <div className="w-full overflow-hidden rounded-2xl">
          <img
            src={coverImage}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* 右侧内容区域 */}
        <div className="flex-1 flex flex-col justify-center py-2 pl-8">
          {/* 顶部：日期和阅读时间 */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <span>{publishDate}</span>
            {readTime && (
              <>
                <span>•</span>
                <span>{readTime}</span>
              </>
            )}
          </div>

          {/* 中间：标题和描述 */}
          <div className="">
            <h2 className="text-2xl font-bold text-primary mb-4 line-clamp-3 leading-tight">
              {title}
            </h2>
            <p className="text-muted-foreground text-md leading-relaxed line-clamp-2 mb-6">
              {description}
            </p>
          </div>

          {/* 底部：作者信息 */}
          <div className="flex items-center gap-4">
            <img
              src={author.avatar}
              alt={author.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <div className="font-semibold text-primary text-base">{author.name}</div>
              {author.role && <div className="text-muted-foreground text-sm">{author.role}</div>}
            </div>
          </div>
        </div>
      </>
    );
  }, [coverImage, title, description, author, publishDate, readTime]);

  const element = useRender({
    render,
    props: mergeProps<'div'>(
      {
        className: cn(
          'group grid grid-cols-[1.75fr_1fr] items-stretch gap-4 transition-all duration-300 hover:bg-muted/50 rounded-3xl',
          className,
        ),
      },
      restProps,
      {
        children: content,
      },
    ),
  });

  return element;
}

/*
使用示例:
垂直版本:
<ArticleCard
  render={<a href="/blog/how-claudes-memory-and-mcp-work" />}
  className='col-span-1'
  coverImage="https://cdn.prod.website-files.com/66f29fc1a009998749da917b/67c8f2fe9738ee83e9414b90_Twitter%20post%20-%2087-p-800.png"
  title="Generate MCP servers from your docs"
  description="Enable AI apps to search, retrieve, and action your APIs & docs instantly."
  author={{
    name: "Emma Adler",
    avatar: "https://cdn.prod.website-files.com/66f29fc1a009998749da917b/67e194a8a146973f04f9e8ca_Screenshot%202025-03-24%20at%2010.21.28%E2%80%AFAM.png"
  }}
  publishDate="June 24, 2025"
/>

横向版本:
<ArticleCardHorizontal
  render={<a href="/blog/introducing-ai-assistant" />}
  className="mb-8"
  coverImage="https://example.com/cover-image.jpg"
  title="Introducing AI Assistant: Turning docs into your product expert"
  description="An agentic, conversational assistant that delivers instant answers."
  author={{
    name: "Han Wang",
    avatar: "https://example.com/avatar.jpg",
    role: "Co-founder"
  }}
  publishDate="June 23, 2025"
  readTime="2 min read"
/>
*/
