import { compileMDX } from '@fumadocs/mdx-remote';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getMDXComponents } from '@mdxify/mdx-components';

import ArticleCard from '@/components/articleCard';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/head';
import { type ArticleDetail, getArticleContent, getArticleDetail } from '@/lib/mdxify-sdk';

export interface Frontmatter {
  title: string;
  coverImage?: string;
  seoTitle?: string;
  seoDescription?: string;
  publishedAt?: string;
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
  const slugString = slug.join('/');

  // 获取文章详情
  const articleDetail = await getArticleDetail(slugString);

  // 获取文章内容
  const content = await getArticleContent(slugString);

  if (!content) {
    notFound();
  }

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

  // 格式化发布日期
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  console.log(123, frontmatter);
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
          <div className="pt-0.5 flex-1 prose max-w-2xl mx-auto">
            <div className="not-prose flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <div className="text-sm text-muted-foreground">
                  {frontmatter.publishedAt ? formatDate(frontmatter.publishedAt) : 'Unknown date'}
                  {articleDetail?.readingTime ? ` • ${articleDetail.readingTime} min read` : ''}
                </div>
                <h1 className="text-3xl font-bold">{frontmatter.title}</h1>
              </div>

              <div>
                {articleDetail?.authors?.map((author) => (
                  <div key={author.id} className="flex items-center gap-4">
                    <img
                      src={`${process.env.NEXT_PUBLIC_CDN_ENDPOINT}/${author.avatar}`}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex flex-col">
                      <div className="text-sm font-semibold">{author.name}</div>
                      <div className="text-sm text-muted-foreground">{author.jobTitle}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <img
                  src={`${process.env.NEXT_PUBLIC_CDN_ENDPOINT}/${articleDetail?.coverImage.s3Key || frontmatter.coverImage}`}
                  className="aspect-16/9 object-cover overflow-hidden rounded-xl"
                />
              </div>
            </div>

            <MdxContent components={{ ...getMDXComponents() }} />
          </div>
          <div className="w-24"></div>
        </div>

        {/* 相关文章区域 */}
        {articleDetail?.relatedArticles?.articles &&
          articleDetail.relatedArticles.articles.length > 0 && (
            <div className="max-w-2xl mx-auto flex flex-col gap-6 border-t border-border pt-12 my-12">
              <h2 className="text-xl font-semibold">More blog posts to read</h2>
              <div className="grid grid-cols-2 gap-6 w-full">
                {articleDetail.relatedArticles.articles.slice(0, 2).map((relatedArticle) => (
                  <ArticleCard
                    key={relatedArticle.id}
                    render={<Link href={`/blog/${relatedArticle.slug}`} />}
                    className="col-span-1"
                    coverImage={
                      relatedArticle.coverImage.s3Key
                        ? `${process.env.NEXT_PUBLIC_CDN_ENDPOINT}/${relatedArticle.coverImage.s3Key}`
                        : ''
                    }
                    title={relatedArticle.title}
                    description={relatedArticle.seoDescription || ''}
                    authors={relatedArticle.authors.map((author) => ({
                      name: author.name,
                      avatar: `${process.env.NEXT_PUBLIC_CDN_ENDPOINT}/${author.avatar}`,
                    }))}
                    publishDate={formatDate(relatedArticle.publishedAt)}
                  />
                ))}
              </div>
            </div>
          )}
      </div>

      {/* divider */}
      <div className="h-px bg-gray-200" />
      <Footer />
    </>
  );
}
