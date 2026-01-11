// app/layout.tsx
import './globals.css'
import { ReactNode } from 'react'
import type { Metadata } from 'next'
import Script from 'next/script'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.glovtechghana.com'),
  title: {
    default: 'Glovtech Ghana | AI Solutions & Web Development in Ghana',
    template: '%s | Glovtech Ghana'
  },
  description: 'Leading provider of AI automation, web development, pharmacy management systems, and IT solutions in Ghana. Transform your business with cutting-edge technology and innovation.',
  keywords: [
    'Glovtech Ghana',
    'AI solutions Ghana',
    'web development Ghana',
    'pharmacy management system Ghana',
    'hostel management software',
    'IT consulting Ghana',
    'AI automation Ghana',
    'custom web development Kumasi',
    'tech solutions Africa',
    'Glovi AI language tutor',
    'digital transformation Ghana',
    'software development Ghana',
    'mobile app development Ghana'
  ],
  authors: [{ name: 'Glovtech Ghana', url: 'https://www.glovtechghana.com' }],
  creator: 'Glovtech Ghana',
  publisher: 'Glovtech Ghana',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  
  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://www.glovtechghana.com',
    siteName: 'Glovtech Ghana',
    title: 'Glovtech Ghana | AI Solutions & Software/App Development',
    description: 'Leading provider of AI automation, web development and IT solutions in Ghana. Empowering African businesses with cutting-edge technology.',
    images: [
      {
        url: '/favicon.png',
        width: 1200,
        height: 630,
        alt: 'Glovtech Ghana - AI Solutions & Software/App Development',
        type: 'image/png',
      }
    ],
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    site: '@glovtechghana',
    creator: '@glovtechghana',
    title: 'Glovtech Ghana | AI Solutions & Web Development',
    description: 'Leading provider of AI automation, web development, and IT solutions in Ghana.',
    images: ['/favicon.png'],
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Verification codes
  verification: {
    google: 'your-google-verification-code-here',
  },

  // Alternate languages
  alternates: {
    canonical: 'https://www.glovtechghana.com',
    languages: {
      'en-GB': 'https://www.glovtechghana.com',
    },
  },

  // Icons - FIXED VERSION
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', type: 'image/png', sizes: 'any' },
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon.png',
  },

  // Manifest
  manifest: '/site.webmanifest',

  // Additional metadata
  category: 'technology',
  applicationName: 'Glovtech Ghana',
}

// Structured Data for Organization
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://www.glovtechghana.com/#organization',
  name: 'Glovtech Ghana',
  alternateName: 'Glovtech',
  url: 'https://www.glovtechghana.com',
  logo: {
    '@type': 'ImageObject',
    url: 'https://www.glovtechghana.com/favicon.png',
    width: 512,
    height: 512
  },
  description: 'Leading provider of AI automation, web development, pharmacy management systems and IT solutions in Ghana.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Your Street Address',
    addressLocality: 'Kumasi',
    addressRegion: 'Ashanti',
    postalCode: '00233',
    addressCountry: 'GH'
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+233-54-080-8755',
    contactType: 'Customer Service',
    areaServed: 'GH',
    availableLanguage: ['English']
  },
  sameAs: [
    'https://www.facebook.com/glovtechghana',
    'https://www.twitter.com/glovtechghana',
    'https://www.linkedin.com/company/glovtechghana',
    'https://www.instagram.com/glovtechghana'
  ],
  foundingDate: '2020',
  founders: [
    {
      '@type': 'Person',
      name: 'Ian titus-Glover'
    }
  ],
  areaServed: {
    '@type': 'Country',
    name: 'Ghana'
  },
  knowsAbout: [
    'AI Solutions',
    'Web Development',
    'Pharmacy Management Systems',
    'Hostel Management Software',
    'IT Consulting',
    'Digital Transformation'
  ]
}

// Website Schema
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://www.glovtechghana.com/#website',
  url: 'https://www.glovtechghana.com',
  name: 'Glovtech Ghana',
  description: 'AI Solutions & Web Development in Ghana',
  publisher: {
    '@id': 'https://www.glovtechghana.com/#organization'
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://www.glovtechghana.com/search?q={search_term_string}'
    },
    'query-input': 'required name=search_term_string'
  }
}

// Breadcrumb Schema
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://www.glovtechghana.com'
    }
  ]
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Explicit Favicon Links - ADDED FOR COMPATIBILITY */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />

        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        
        {/* Theme Color */}
        <meta name="theme-color" content="#10b981" />
        <meta name="msapplication-TileColor" content="#10b981" />
        
        {/* iOS Web App */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Glovtech Ghana" />
      </head>
      
      <body>
        {children}

        {/* Google Analytics - Replace with your GA4 ID */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        {/* Microsoft Clarity (Optional) - Replace with your project ID */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "YOUR_CLARITY_ID");
          `}
        </Script>
      </body>
    </html>
  )
}