import Link from 'next/link';

import ArticleCard, { ArticleCardHorizontal } from '@/components/articleCard';
import { type Article, getFirstPinnedArticle, getRegularArticles } from '@/lib/mdxify-sdk';

// 置顶文章组件
export const PinnedArticleSection = async () => {
  const pinnedArticle = await getFirstPinnedArticle({ revalidate: 60 });

  if (!pinnedArticle) {
    return null;
  }

  // 处理作者头像URL
  const processedAuthors = pinnedArticle.authors.map((author) => ({
    ...author,
    avatar: `${process.env.NEXT_PUBLIC_CDN_ENDPOINT}/${author.avatar}`,
  }));

  return (
    <div className="mb-16">
      <ArticleCardHorizontal
        render={<Link href={`/blog/${pinnedArticle.slug}`} />}
        className="mb-8"
        coverImage={`${process.env.NEXT_PUBLIC_CDN_ENDPOINT}/${pinnedArticle.coverImage.s3Key}`}
        title={pinnedArticle.title}
        description={
          pinnedArticle.metadata.find((item) => item.fieldName === 'Summary')?.value ?? ''
        }
        authors={processedAuthors}
        publishDate={new Date(pinnedArticle.publishedAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
        readTime={`${pinnedArticle.readingTime} min read`}
      />
    </div>
  );
};

// 所有文章组件
export const AllArticlesSection = async () => {
  const regularArticles = await getRegularArticles({ revalidate: 60 });

  const processedArticles = regularArticles.map((article) => ({
    ...article,
    coverImage: `${process.env.NEXT_PUBLIC_CDN_ENDPOINT}/${article.coverImage.s3Key}`,
    authors: article.authors.map((author) => ({
      ...author,
      avatar: `${process.env.NEXT_PUBLIC_CDN_ENDPOINT}/${author.avatar}`,
    })),
    description: article.metadata.find((item) => item.fieldName === 'Summary')?.value ?? '',
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {processedArticles.map((article) => (
        <ArticleCard
          key={article.id}
          render={<Link href={`/blog/${article.slug}`} />}
          coverImage={article.coverImage}
          title={article.title}
          description={article.description}
          authors={article.authors}
          publishDate={new Date(article.publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        />
      ))}
    </div>
  );
};

// 加载状态组件
export const LoadingPinnedArticle = () => (
  <div className="mb-16">
    <div className="flex flex-col md:flex-row gap-6 p-6 border rounded-lg animate-pulse">
      <div className="md:w-1/2">
        <div className="aspect-video bg-gray-200 rounded-lg mb-4"></div>
      </div>
      <div className="md:w-1/2 space-y-4">
        <div className="h-8 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      </div>
    </div>
  </div>
);

export const LoadingArticleGrid = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: 6 }).map((_, index) => (
      <div key={index} className="border rounded-lg overflow-hidden animate-pulse">
        <div className="aspect-video bg-gray-200"></div>
        <div className="p-4 space-y-3">
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    ))}
  </div>
);
