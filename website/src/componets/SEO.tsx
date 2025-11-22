import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  noindex?: boolean;
  breadcrumbs?: Array<{ name: string; url: string }>;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
  googleSiteVerification?: string;
}

const defaultTitle = 'Blackie Networks - IT Solutions, Network Infrastructure & Software Development | Kenya';
const defaultDescription = 'Blackie Networks provides affordable high-speed internet, network infrastructure, software development, and IT consulting services for campuses, businesses, and institutions in Kenya. Expert MikroTik configuration, Wi-Fi solutions, and custom software.';
const defaultKeywords = 'Blackie Networks, network infrastructure, software development, IT consulting, MikroTik, Wi-Fi solutions, campus internet, affordable internet Kenya, network setup, VPN services, cloud services, custom software development, Chuka University';
const siteUrl = 'https://www.blackie-networks.com';
const defaultImage = `${siteUrl}/src/assets/logo.png`;

export const SEO: React.FC<SEOProps> = ({
  title = defaultTitle,
  description = defaultDescription,
  keywords = defaultKeywords,
  image = defaultImage,
  url = siteUrl,
  type = 'website',
  noindex = false,
  breadcrumbs,
  article,
  googleSiteVerification,
}) => {
  const fullTitle = title.includes('Blackie Networks') ? title : `${title} | Blackie Networks`;
  const fullUrl = url.startsWith('http') ? url : `${siteUrl}${url}`;

  // Structured Data (JSON-LD)
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Blackie Networks',
    url: siteUrl,
    logo: `${siteUrl}/src/assets/logo.png`,
    description: 'IT Solutions, Network Infrastructure & Software Development Company in Kenya',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Chuka',
      addressRegion: 'Tharaka Nithi',
      addressCountry: 'KE',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+254-796-869-402',
      contactType: 'Customer Service',
      email: 'support@blackie-networks.com',
      areaServed: 'KE',
      availableLanguage: 'English',
    },
    sameAs: [
      'https://linkedin.com/company/blackienetworks',
      'https://twitter.com/blackienetworks',
      'https://facebook.com/blackienetworks',
      'https://instagram.com/blackienetworks',
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Blackie Networks',
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'IT Services',
    provider: {
      '@type': 'Organization',
      name: 'Blackie Networks',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Kenya',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'IT Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Network Setup and Infrastructure',
            description: 'Enterprise-grade network and IT infrastructure services',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Campus Wi-Fi Solutions',
            description: 'High-speed Wi-Fi networks for campuses and institutions',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Custom Software Development',
            description: 'Tailored software solutions for businesses and institutions',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Cloud Services',
            description: 'Cloud hosting and infrastructure services',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'IT Consultancy & VPN Services',
            description: 'IT consulting and secure VPN solutions',
          },
        },
      ],
    },
  };

  // LocalBusiness Schema for better local SEO
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteUrl}/#localbusiness`,
    name: 'Blackie Networks',
    image: `${siteUrl}/src/assets/logo.png`,
    url: siteUrl,
    telephone: '+254-796-869-402',
    email: 'support@blackie-networks.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Chuka University',
      addressLocality: 'Chuka',
      addressRegion: 'Tharaka Nithi',
      postalCode: '60400',
      addressCountry: 'KE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '-0.3322',
      longitude: '37.6373',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '00:00',
      closes: '23:59',
    },
    priceRange: '$$',
    servesCuisine: false,
  };

  // BreadcrumbList Schema for better navigation SEO
  const breadcrumbSchema = breadcrumbs
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((crumb, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: crumb.name,
          item: crumb.url.startsWith('http') ? crumb.url : `${siteUrl}${crumb.url}`,
        })),
      }
    : null;

  // Article Schema for blog posts
  const articleSchema = article
    ? {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: fullTitle,
        description: description,
        image: image,
        datePublished: article.publishedTime,
        dateModified: article.modifiedTime || article.publishedTime,
        author: {
          '@type': 'Person',
          name: article.author || 'Blackie Networks',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Blackie Networks',
          logo: {
            '@type': 'ImageObject',
            url: `${siteUrl}/src/assets/logo.png`,
          },
        },
        articleSection: article.section,
        keywords: article.tags?.join(', ') || keywords,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': fullUrl,
        },
      }
    : null;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {!noindex && <meta name="robots" content="index, follow" />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Blackie Networks" />
      <meta property="og:locale" content="en_KE" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />

      {/* Additional Meta Tags */}
      <meta name="geo.region" content="KE" />
      <meta name="geo.placename" content="Chuka, Tharaka Nithi, Kenya" />
      <meta name="geo.position" content="-0.3322;37.6373" />
      <meta name="ICBM" content="-0.3322, 37.6373" />
      <meta name="author" content="Blackie Networks" />
      <meta name="copyright" content="Blackie Networks" />
      <meta name="rating" content="general" />
      <meta name="distribution" content="global" />
      <meta name="coverage" content="worldwide" />
      <meta name="target" content="all" />
      <meta name="audience" content="all" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Google Search Console Verification */}
      {googleSiteVerification && (
        <meta name="google-site-verification" content={googleSiteVerification} />
      )}
      
      {/* Enhanced Open Graph */}
      <meta property="og:image:alt" content={fullTitle} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:secure_url" content={image} />
      
      {/* Enhanced Twitter */}
      <meta name="twitter:image:alt" content={fullTitle} />
      <meta name="twitter:creator" content="@blackienetworks" />
      <meta name="twitter:site" content="@blackienetworks" />
      
      {/* Apple Touch Icons */}
      <link rel="apple-touch-icon" href={`${siteUrl}/src/assets/logo.png`} />
      <link rel="apple-touch-icon" sizes="180x180" href={`${siteUrl}/src/assets/logo.png`} />
      
      {/* Article-specific Open Graph */}
      {article && (
        <>
          <meta property="article:published_time" content={article.publishedTime} />
          {article.modifiedTime && (
            <meta property="article:modified_time" content={article.modifiedTime} />
          )}
          {article.author && <meta property="article:author" content={article.author} />}
          {article.section && <meta property="article:section" content={article.section} />}
          {article.tags?.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Structured Data */}
      <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      {breadcrumbSchema && (
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      )}
      {articleSchema && (
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      )}
    </Helmet>
  );
};

