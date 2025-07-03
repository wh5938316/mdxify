interface FooterLinkItem {
  title: string;
  href?: string;
  tag?: string;
}

interface FooterCol {
  title: string;
  links: FooterLinkItem[];
}

export const footerData: FooterCol[] = [
  {
    title: 'Product',
    links: [
      {
        title: 'Content Editor',
        href: '/editor',
      },
      {
        title: 'API',
        href: '/api',
      },
      {
        title: 'Headless Framwork',
        tag: 'COMING SOON',
      },
      {
        title: 'Cloud Hosting',
        tag: 'COMING SOON',
      },
    ],
  },
  {
    title: 'Company',
    links: [
      {
        title: 'About Us',
        href: '/about-us',
      },
      {
        title: 'FAQs',
        href: '/faqs',
      },
      {
        title: 'Careers',
        href: '/careers',
      },
    ],
  },
  {
    title: 'Support',
    links: [
      {
        title: 'Contact Us',
        href: '/contact-us',
      },
    ],
  },
];
