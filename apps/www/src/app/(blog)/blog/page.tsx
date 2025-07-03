import ArticleCard, { ArticleCardHorizontal } from '@/components/articleCard';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/head';

export default function BlogPage() {
  return (
    <>
      <Header />

      <div className="min-w-0 w-full max-w-5xl py-8 md:mx-auto px-6">
        {/* 置顶博客 - 横向布局 */}
        <div className="mb-16">
          <ArticleCardHorizontal
            render={<a href="/blog/how-claudes-memory-and-mcp-work" />}
            className="mb-8"
            coverImage="https://cdn.prod.website-files.com/66f29fc1a009998749da917b/67c8f2fe9738ee83e9414b90_Twitter%20post%20-%2087-p-800.png"
            title="Generate MCP servers from your docs"
            description="Enable AI apps to search, retrieve, and action your APIs & docs instantly."
            author={{
              name: 'Emma Adler',
              avatar:
                'https://cdn.prod.website-files.com/66f29fc1a009998749da917b/67e194a8a146973f04f9e8ca_Screenshot%202025-03-24%20at%2010.21.28%E2%80%AFAM.png',
            }}
            publishDate="June 24, 2025"
            readTime="3 min read"
          />
        </div>

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
          <ArticleCard
            render={<a href="/blog/replit-documentation" />}
            coverImage="https://cdn.prod.website-files.com/66f29fc1a009998749da917b/67c8f2fe9738ee83e9414b90_Twitter%20post%20-%2087-p-800.png"
            title="Behind Replit's Documentation Transformation"
            description="Overhauling docs, vibe documenting, and scaling with automations."
            author={{
              name: 'Tiffany Chen',
              avatar:
                'https://cdn.prod.website-files.com/66f29fc1a009998749da917b/67e194a8a146973f04f9e8ca_Screenshot%202025-03-24%20at%2010.21.28%E2%80%AFAM.png',
            }}
            publishDate="June 27, 2025"
          />

          <ArticleCard
            render={<a href="/blog/claude-memory-mcp" />}
            coverImage="https://cdn.prod.website-files.com/66f29fc1a009998749da917b/685dc3b3997b6a1821d54961_BLOG-3.jpg"
            title="How Claude's memory and MCP work (and when to use each)"
            description="How memory vs MCP works, when to use them, and how to structure docs for better..."
            author={{
              name: 'Emma Adler',
              avatar:
                'https://cdn.prod.website-files.com/66f29fc1a009998749da917b/67e194a8a146973f04f9e8ca_Screenshot%202025-03-24%20at%2010.21.28%E2%80%AFAM.png',
            }}
            publishDate="June 24, 2025"
          />

          <ArticleCard
            render={<a href="/blog/founder-advice" />}
            coverImage="https://cdn.prod.website-files.com/66f29fc1a009998749da917b/67c8f2fe9738ee83e9414b90_Twitter%20post%20-%2087-p-800.png"
            title="It's not a race"
            description="The best advice I've received as a founder."
            author={{
              name: 'Han Wang',
              avatar:
                'https://cdn.prod.website-files.com/66f29fc1a009998749da917b/67e194a8a146973f04f9e8ca_Screenshot%202025-03-24%20at%2010.21.28%E2%80%AFAM.png',
            }}
            publishDate="June 4, 2025"
          />

          <ArticleCard
            render={<a href="/blog/windsurf-docs" />}
            coverImage="https://cdn.prod.website-files.com/66f29fc1a009998749da917b/67c8f2fe9738ee83e9414b90_Twitter%20post%20-%2087-p-800.png"
            title="How Windsurf Writes Docs"
            description="Creating comprehensive documentation for AI-powered development tools."
            author={{
              name: 'Robert Hou',
              avatar:
                'https://cdn.prod.website-files.com/66f29fc1a009998749da917b/67e194a8a146973f04f9e8ca_Screenshot%202025-03-24%20at%2010.21.28%E2%80%AFAM.png',
            }}
            publishDate="June 20, 2025"
          />

          <ArticleCard
            render={<a href="/blog/geo-optimization" />}
            coverImage="https://cdn.prod.website-files.com/66f29fc1a009998749da917b/67c8f2fe9738ee83e9414b90_Twitter%20post%20-%2087-p-800.png"
            title="How to optimize docs for GEO"
            description="Strategies for global content optimization and localization."
            author={{
              name: 'MDXify Team',
              avatar:
                'https://cdn.prod.website-files.com/66f29fc1a009998749da917b/67e194a8a146973f04f9e8ca_Screenshot%202025-03-24%20at%2010.21.28%E2%80%AFAM.png',
            }}
            publishDate="June 18, 2025"
          />

          <ArticleCard
            render={<a href="/blog/anaconda-docs" />}
            coverImage="https://cdn.prod.website-files.com/66f29fc1a009998749da917b/67c8f2fe9738ee83e9414b90_Twitter%20post%20-%2087-p-800.png"
            title="How Anaconda Writes Docs"
            description="Best practices for technical documentation in data science."
            author={{
              name: 'Joan Englander',
              avatar:
                'https://cdn.prod.website-files.com/66f29fc1a009998749da917b/67e194a8a146973f04f9e8ca_Screenshot%202025-03-24%20at%2010.21.28%E2%80%AFAM.png',
            }}
            publishDate="June 15, 2025"
          />
        </div>
      </div>

      <Footer />
    </>
  );
}
