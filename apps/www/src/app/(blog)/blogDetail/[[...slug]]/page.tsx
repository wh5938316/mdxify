import { compileMDX, parseFrontmatter } from '@fumadocs/mdx-remote';
import { ArrowLeftIcon } from 'lucide-react';
import { notFound } from 'next/navigation';

import { getMDXComponents } from '@mdxify/mdx-components';

import ArticleCard from '@/components/articleCard';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/head';

export interface Frontmatter {
  title: string;
  coverImage?: string;
  seoTitle?: string;
  seoDescription?: string;
  authors?: {
    name: string;
    slug: string;
    avatar?: string;
    role?: string;
  }[];
}

export const revalidate = 3600;

export default async function Page(props: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await props.params;

  const data = await fetch(`${process.env.MDXIFY_API_URL}/api/v1/articles/${slug}/content`, {
    headers: {
      'x-api-key': process.env.MDXIFY_ACCESS_TOKEN!,
    },
  });

  if (!data.ok) {
    notFound();
  }

  let content = await data.text();

  const {
    frontmatter,
    body: MdxContent,
    toc,
  } = await compileMDX<Frontmatter>({
    source: content,
    mdxOptions: {
      remarkImageOptions: {
        external: false,
        useImport: true,
      },
    },
  });

  return (
    <>
      <Header />
      <div className="min-w-0 w-full max-w-5xl pt-8 md:mx-auto">
        <div className="flex">
          <div className="w-28 pl-4 pt-0">
            <a
              href="/blog"
              className="sticky top-8 flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              <span> All Blogs</span>
            </a>
          </div>
          <div className="pt-1 flex-1 prose max-w-2xl mx-auto">
            <div className="not-prose flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <div className="text-sm text-muted-foreground">June 23, 2025 • 1 min read</div>
                <h1 className="text-3xl font-bold">{frontmatter.title}</h1>
              </div>

              <div>
                {frontmatter.authors?.map((author) => (
                  <div key={author.name} className="flex items-center gap-4">
                    <img src={author.avatar} className="w-10 h-10 rounded-full" />
                    <div className="flex flex-col">
                      <div className="text-sm font-semibold">{author.name}</div>
                      <div className="text-sm text-muted-foreground">{author.role}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <img
                  src={`https://mtxwzacie9ujiton.public.blob.vercel-storage.com/${frontmatter.coverImage}`}
                  className="aspect-16/9 object-cover overflow-hidden rounded-xl"
                />
              </div>
            </div>

            <MdxContent components={{ ...getMDXComponents() }} />
          </div>
          <div className="w-24"></div>
        </div>

        <div className="max-w-2xl mx-auto flex flex-col gap-6 border-t border-border pt-12 my-12">
          <h2 className="text-xl font-semibold">More blog posts to read</h2>
          <div className="grid grid-cols-2 gap-6 w-full">
            <ArticleCard
              render={<a href="/blog/how-claudes-memory-and-mcp-work" />}
              className="col-span-1"
              coverImage="https://cdn.prod.website-files.com/66f29fc1a009998749da917b/685dc3b3997b6a1821d54961_BLOG-3.jpg"
              title="How Claude's memory and MCP work (and when to use each)"
              description="How memory vs MCP works, when to use them, and how to structure docs for better AI performance."
              author={{
                name: 'Emma Adler',
                avatar:
                  'https://cdn.prod.website-files.com/66f29fc1a009998749da917b/67e194a8a146973f04f9e8ca_Screenshot%202025-03-24%20at%2010.21.28%E2%80%AFAM.png',
              }}
              publishDate="June 24, 2025"
            />
            <ArticleCard
              render={<a href="/blog/how-claudes-memory-and-mcp-work" />}
              className="col-span-1"
              coverImage="https://cdn.prod.website-files.com/66f29fc1a009998749da917b/67c8f2fe9738ee83e9414b90_Twitter%20post%20-%2087-p-800.png"
              title="Generate MCP servers from your docs"
              description="Enable AI apps to search, retrieve, and action your APIs & docs instantly. "
              author={{
                name: 'Emma Adler',
                avatar:
                  'https://cdn.prod.website-files.com/66f29fc1a009998749da917b/67e194a8a146973f04f9e8ca_Screenshot%202025-03-24%20at%2010.21.28%E2%80%AFAM.png',
              }}
              publishDate="June 24, 2025"
            />
          </div>
        </div>
      </div>

      {/* divider */}
      <div className="h-px bg-gray-200" />
      <Footer />
    </>
  );
}
