import ArticleCard, { ArticleCardHorizontal } from '@/components/articleCard';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/head';

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

export default async function BlogPage() {
  // 并行获取置顶文章和所有文章
  const [pinnedArticles, allArticles] = await Promise.all([getPinnedArticles(), getAllArticles()]);

  // 获取第一个置顶文章（UI只显示一个置顶）
  const pinnedArticle = pinnedArticles[0];

  // 从所有文章中过滤掉已显示的置顶文章
  const regularArticles = allArticles.filter(
    (article) => !pinnedArticle || article.id !== pinnedArticle.id,
  );
  console.log(pinnedArticle, regularArticles);
  return (
    <>
      <Header />

      <div className="min-w-0 w-full max-w-5xl py-8 md:mx-auto px-6">
        {/* 置顶博客 - 横向布局 */}
        {pinnedArticle && (
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
        )}

        {/* 搜索和分类区域 */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          {/* 左侧分类标签 */}
          <div className="flex flex-wrap items-center gap-2">
            <button className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium">
              All
            </button>
            <button className="px-4 py-2 rounded-full hover:bg-muted text-muted-foreground text-sm font-medium transition-colors">
              AI Trends
            </button>
            <button className="px-4 py-2 rounded-full hover:bg-muted text-muted-foreground text-sm font-medium transition-colors">
              Announcements
            </button>
            <button className="px-4 py-2 rounded-full hover:bg-muted text-muted-foreground text-sm font-medium transition-colors">
              For Founders
            </button>
            <button className="px-4 py-2 rounded-full hover:bg-muted text-muted-foreground text-sm font-medium transition-colors">
              Best Practices
            </button>
          </div>

          {/* 右侧搜索框 */}
          <div className="relative max-w-sm w-full">
            <input
              type="text"
              placeholder="Search posts"
              className="w-full pl-10 pr-4 py-2 border border-input rounded-full bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* 博客文章网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularArticles.map((article) => (
            <ArticleCard
              key={article.id}
              render={<a href={`/blog/${article.slug}`} />}
              coverImage={`${process.env.NEXT_PUBLIC_CDN_ENDPOINT}${article.coverImage.s3Key}`}
              title={article.title}
              description={article.description}
              authors={article.authors}
              publishDate={new Date(pinnedArticle.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            />
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}
