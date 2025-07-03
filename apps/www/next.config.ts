import { type SentryBuildOptions, withSentryConfig } from '@sentry/nextjs';
import type { NextConfig } from 'next';

const isProd = process.env.NODE_ENV === 'production';

let nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: [],

  // https://nextjs.org/docs/app/api-reference/next-config-js/output#automatically-copying-traced-files
  output: 'standalone',
  // https://nextjs.org/docs/architecture/nextjs-compiler#remove-console
  compiler: {
    removeConsole: isProd
      ? {
          exclude: ['error'],
        }
      : false,
  },

  poweredByHeader: false,

  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/blog/:path*/:slug',
          destination: '/blogDetail/:path*/:slug',
        },
      ],
    };
  },
};

const sentryConfig: SentryBuildOptions = {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Automatically annotate React components to show their full name in breadcrumbs and session replay
  reactComponentAnnotation: {
    enabled: true,
  },

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: '/monitoring',

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Unables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: false,

  sourcemaps: {
    disable: !isProd,
  },
};

nextConfig = withSentryConfig(nextConfig, sentryConfig);

export default nextConfig;
