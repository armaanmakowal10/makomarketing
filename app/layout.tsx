import type { Metadata } from 'next'
import { Inter, IBM_Plex_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { SmoothScroll } from '@/components/smooth-scroll'
import { AnimatedBackground } from '@/components/animated-background'
import { ScrollProgress } from '@/components/scroll-progress'
import { IntroOverlay } from '@/components/intro-overlay'

// Titles
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
})

// Paragraph / body text
const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-ibm-plex',
  display: 'swap',
})

const SITE_URL = 'https://www.makomarketing.ca'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Mako Marketing | Turning Traffic Into Paying Customers',
    template: '%s | Mako Marketing',
  },
  description:
    'Mako Marketing builds high-performance websites and runs Google Ads, Meta Ads, and SEO campaigns for service-based businesses ready to grow. Turning traffic into paying customers.',
  keywords: [
    'digital marketing agency',
    'Google Ads',
    'Meta Ads',
    'web design',
    'SEO',
    'local service ads',
    'lead generation',
    'small business marketing',
  ],
  authors: [{ name: 'Mako Marketing' }],
  creator: 'Mako Marketing',
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: SITE_URL,
    siteName: 'Mako Marketing',
    title: 'Mako Marketing | Turning Traffic Into Paying Customers',
    description:
      'High-performance websites plus Google Ads, Meta Ads & SEO for service-based businesses. We turn traffic into paying customers.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mako Marketing | Turning Traffic Into Paying Customers',
    description:
      'High-performance websites plus Google Ads, Meta Ads & SEO for service-based businesses.',
  },
  icons: {
    icon: [
      { url: '/mako-favicon2.png', type: 'image/png' },
    ],
    shortcut: '/mako-favicon2.png',
    apple: '/mako-favicon2.png',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport = {
  themeColor: '#000000',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Mako Marketing',
      url: SITE_URL,
      logo: `${SITE_URL}/Mako-Marketing-logo-design.png`,
      email: 'makomarketing0@gmail.com',
      telephone: '+1-905-260-5457',
      sameAs: [],
    },
    {
      '@type': 'LocalBusiness',
      '@id': `${SITE_URL}/#localbusiness`,
      name: 'Mako Marketing',
      image: `${SITE_URL}/Mako-Marketing-logo-design.png`,
      url: SITE_URL,
      email: 'makomarketing0@gmail.com',
      telephone: '+1-905-260-5457',
      priceRange: '$$',
      description:
        'Digital marketing agency specializing in web design, Google Ads, Meta Ads, and SEO for service-based businesses.',
      areaServed: {
        '@type': 'Country',
        name: 'Canada',
      },
      address: {
        '@type': 'PostalAddress',
        addressRegion: 'ON',
        addressCountry: 'CA',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+1-905-260-5457',
        contactType: 'sales',
        email: 'makomarketing0@gmail.com',
        areaServed: 'CA',
        availableLanguage: 'English',
      },
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${ibmPlexSans.variable}`}>
      <body className="font-sans antialiased">
        {/* Land on the hero on every load/reload — never restore prior scroll. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{history.scrollRestoration='manual'}catch(e){}`,
          }}
        />
        {/* Raw style — bypasses Tailwind/Lightning CSS, which strips this pseudo.
            Hides the scrollbar up/down arrow buttons so only the thumb shows. */}
        <style
          dangerouslySetInnerHTML={{
            __html:
              "::-webkit-scrollbar-button{display:none!important;width:0!important;height:0!important}",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <IntroOverlay />
        <AnimatedBackground />
        <ScrollProgress />
        <SiteHeader />
        <SmoothScroll>
          {children}
          <SiteFooter />
        </SmoothScroll>
        <Analytics />
      </body>
    </html>
  )
}
