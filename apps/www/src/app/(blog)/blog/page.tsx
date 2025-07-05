import { Suspense } from 'react';

import { AllArticlesSection, PinnedArticleSection } from './components/articleList';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/head';

export default function BlogPage() {
  return (
    <>
      <Header />

      <div className="min-w-0 w-full max-w-5xl py-8 md:mx-auto px-6">
        {/* 置顶博客 - 横向布局 */}
        <Suspense>
          <PinnedArticleSection />
        </Suspense>

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
        <Suspense>
          <AllArticlesSection />
        </Suspense>
      </div>

      <Footer />
    </>
  );
}
