import ArticleCard, { ArticleCardHorizontal } from '@/components/articleCard';

interface Article {
  id: string;
  title: string;
  description: string;
  coverImage: {
    s3Key: string;
  };
  authors: {
    name: string;
    avatar: string;
    jobTitle?: string;
  }[];
  publishedAt: string;
  readingTime?: string;
  slug: string;
  isPinned?: boolean;
  metadata: {
    fieldName: string;
    value: string;
  }[];
}

async function getPinnedArticles(): Promise<Article[]> {
  try {
    const response = await fetch(
      `${process.env.MDXIFY_API_URL}/api/v1/categories/blog?isPinned=true`,
      {
        headers: {
          'x-api-key': process.env.MDXIFY_ACCESS_TOKEN!,
        },
        // cache: 'no-store',
        next: { revalidate: 60 },
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch pinned articles: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching pinned articles:', error);
    return [];
  }
}

async function getAllArticles(): Promise<Article[]> {
  try {
    const response = await fetch(`${process.env.MDXIFY_API_URL}/api/v1/categories/blog`, {
      headers: {
        'x-api-key': process.env.MDXIFY_ACCESS_TOKEN!,
      },
      // cache: 'no-store',
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch articles: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

// 置顶文章组件
export const PinnedArticleSection = async () => {
  const pinnedArticles = await getPinnedArticles();
  const pinnedArticle = pinnedArticles[0];

  if (pinnedArticle && pinnedArticle.authors) {
    pinnedArticle.authors = pinnedArticle.authors.map((author) => ({
      ...author,
      avatar: `${process.env.NEXT_PUBLIC_CDN_ENDPOINT}/${author.avatar}`,
    }));
  }

  if (!pinnedArticle) {
    return null;
  }

  return (
    <div className="mb-16">
      <ArticleCardHorizontal
        render={<a href={`/blog/${pinnedArticle.slug}`} />}
        className="mb-8"
        coverImage={`${process.env.NEXT_PUBLIC_CDN_ENDPOINT}/${pinnedArticle.coverImage.s3Key}`}
        title={pinnedArticle.title}
        description={
          pinnedArticle.metadata.find((item) => item.fieldName === 'Summary')?.value ?? ''
        }
        authors={pinnedArticle.authors}
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
  const [pinnedArticles, allArticles] = await Promise.all([getPinnedArticles(), getAllArticles()]);

  const pinnedArticle = pinnedArticles[0];
  const regularArticles = allArticles
    .filter((article) => !pinnedArticle || article.id !== pinnedArticle.id)
    .map((article) => ({
      ...article,
      coverImage: `${process.env.NEXT_PUBLIC_CDN_ENDPOINT}/${article.coverImage.s3Key}`,
      authors: article.authors.map((author) => ({
        ...author,
        avatar: `${process.env.NEXT_PUBLIC_CDN_ENDPOINT}/${author.avatar}`,
      })),
    }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {regularArticles.map((article) => (
        <ArticleCard
          key={article.id}
          render={<a href={`/blog/${article.slug}`} />}
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
