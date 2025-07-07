export interface Author {
  id: string;
  name: string;
  slug: string;
  bio: string | null;
  avatar: string;
  jobTitle: string;
  github: string | null;
  twitter: string | null;
  linkedin: string | null;
  facebook: string | null;
  instagram: string | null;
  youtube: string | null;
  tiktok: string | null;
  blueSky: string | null;
  mastodon: string | null;
  website: string | null;
  order: number;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  color: string | null;
  description: string | null;
}

export interface Category {
  id: string;
  key: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  domainName: string;
  slugPrefix: string;
}

export interface CoverImage {
  id: string;
  fileName: string;
  s3Key: string;
  alt: string | null;
  caption: string | null;
  width: number;
  height: number;
  fileSize: number;
  mimeType: string;
}

export interface Metadata {
  id: string;
  schemaId: string;
  fieldName: string;
  fieldType: string;
  isRequired: boolean;
  description: string;
  enumOptions: any;
  value: string;
}

export interface RelatedArticle {
  id: string;
  title: string;
  slug: string;
  seoTitle: string | null;
  seoDescription: string | null;
  publishedAt: string;
  readingTime: number;
  coverImage: {
    s3Key: string;
  };
  reason: string;
  authors: Author[];
  tags: Tag[];
}

export interface ArticleDetail {
  id: string;
  title: string;
  slug: string;
  status: string;
  publishedAt: string;
  seoTitle: string | null;
  seoDescription: string | null;
  seoKeywords: string | null;
  readingTime: number;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
  category: Category;
  series: any;
  tags: Tag[];
  metadata: Metadata[];
  authors: Author[];
  coverImage: CoverImage;
  relatedArticles: {
    type: string;
    articles: RelatedArticle[];
  };
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  status: string;
  publishedAt: string;
  seoTitle: string | null;
  seoDescription: string | null;
  seoKeywords: string | null;
  readingTime: number;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
  category: Category;
  series: any;
  tags: Tag[];
  metadata: Metadata[];
  authors: Author[];
  coverImage: CoverImage;
  description?: string;
}

export interface MdxifySDKConfig {
  apiUrl: string;
  accessToken: string;
  defaultRevalidate?: number;
}

export class MdxifySDK {
  private apiUrl: string;
  private accessToken: string;
  private defaultRevalidate: number;

  constructor(config: MdxifySDKConfig) {
    this.apiUrl = config.apiUrl;
    this.accessToken = config.accessToken;
    this.defaultRevalidate = config.defaultRevalidate || 120;
  }

  private async request<T>(
    endpoint: string,
    options: {
      revalidate?: number;
      cache?: RequestCache;
    } = {},
  ): Promise<T | null> {
    try {
      const response = await fetch(`${this.apiUrl}${endpoint}`, {
        headers: {
          'x-api-key': this.accessToken,
        },
        next: {
          revalidate: options.revalidate || this.defaultRevalidate,
        },
        cache: options.cache,
      });

      if (!response.ok) {
        console.error(`API request failed: ${response.status} ${response.statusText}`);
        return null;
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error making API request:', error);
      return null;
    }
  }

  /**
   * 获取文章详情
   */
  async getArticleDetail(
    slug: string,
    options?: { revalidate?: number },
  ): Promise<ArticleDetail | null> {
    return await this.request<ArticleDetail>(`/api/v1/categories/blog/${slug}`, options);
  }

  /**
   * 获取文章内容
   */
  async getArticleContent(slug: string, options?: { revalidate?: number }): Promise<string | null> {
    try {
      const response = await fetch(`${this.apiUrl}/api/v1/categories/blog/${slug}/content`, {
        headers: {
          'x-api-key': this.accessToken,
        },
        next: {
          revalidate: options?.revalidate || this.defaultRevalidate,
        },
      });

      if (!response.ok) {
        console.error(`Failed to fetch article content: ${response.status} ${response.statusText}`);
        return null;
      }

      return await response.text();
    } catch (error) {
      console.error('Error fetching article content:', error);
      return null;
    }
  }

  /**
   * 获取置顶文章
   */
  async getPinnedArticles(options?: { revalidate?: number }): Promise<Article[]> {
    const result = await this.request<Article[]>('/api/v1/categories/blog?isPinned=true', options);
    return result || [];
  }

  /**
   * 获取所有文章
   */
  async getAllArticles(options?: { revalidate?: number }): Promise<Article[]> {
    const result = await this.request<Article[]>('/api/v1/categories/blog', options);
    return result || [];
  }

  /**
   * 获取单个置顶文章（第一个）
   */
  async getFirstPinnedArticle(options?: { revalidate?: number }): Promise<Article | null> {
    const pinnedArticles = await this.getPinnedArticles(options);
    return pinnedArticles.length > 0 ? pinnedArticles[0] : null;
  }

  /**
   * 获取除置顶文章外的所有文章
   */
  async getRegularArticles(options?: { revalidate?: number }): Promise<Article[]> {
    const [pinnedArticles, allArticles] = await Promise.all([
      this.getPinnedArticles(options),
      this.getAllArticles(options),
    ]);

    const pinnedArticle = pinnedArticles.length > 0 ? pinnedArticles[0] : null;

    return allArticles.filter((article) => !pinnedArticle || article.id !== pinnedArticle.id);
  }
}

// 创建默认的SDK实例
export const mdxifySDK = new MdxifySDK({
  apiUrl: process.env.MDXIFY_API_URL!,
  accessToken: process.env.MDXIFY_ACCESS_TOKEN!,
  defaultRevalidate: 120,
});

// 导出便捷方法（绑定this上下文）
export const getArticleDetail = mdxifySDK.getArticleDetail.bind(mdxifySDK);
export const getArticleContent = mdxifySDK.getArticleContent.bind(mdxifySDK);
export const getPinnedArticles = mdxifySDK.getPinnedArticles.bind(mdxifySDK);
export const getAllArticles = mdxifySDK.getAllArticles.bind(mdxifySDK);
export const getFirstPinnedArticle = mdxifySDK.getFirstPinnedArticle.bind(mdxifySDK);
export const getRegularArticles = mdxifySDK.getRegularArticles.bind(mdxifySDK);
