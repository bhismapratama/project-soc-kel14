import type { Metadata } from 'next';

// TODO: ADJUST CONFIGURATION FOR PRODUCTION

const config: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: { default: 'kel 14', template: '%s | kel 14' },
  description:
    'kel 14',
  openGraph: {
    url: 'http://localhost:3000',
    title: 'kel 14',
    description:
      'kel 14',
    siteName: 'kel 14',
    images: [{ url: '/images/og.jpeg' }],
    type: 'website',
    locale: 'in_ID',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@kel_4',
    title: 'kel 14',
    description:
      'kel 14',
    site: 'http://localhost:3000',
    images: [{ url: '/images/og.jpeg' }],
  },
  keywords: ['kel 14'],
  robots: 'index, follow',
  icons: [
    {
      rel: 'icon',
      url: '/favicon.ico',
      type: 'image/x-icon',
    },
    {
      rel: 'shortcut icon',
      url: '/favicon.ico',
      type: 'image/x-icon',
    },
  ],
};

export default config;
