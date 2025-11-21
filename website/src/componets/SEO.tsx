import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  noindex?: boolean;
}

const defaultTitle = 'Blackie Networks - IT Solutions, Network Infrastructure & Software Development | Kenya';
const defaultDescription = 'Blackie Networks provides affordable high-speed internet, network infrastructure, software development, and IT consulting services for campuses, businesses, and institutions in Kenya. Expert MikroTik configuration, Wi-Fi solutions, and custom software.';
const defaultKeywords = 'Blackie Networks, network infrastructure, software development, IT consulting, MikroTik, Wi-Fi solutions, campus internet, affordable internet Kenya, network setup, VPN services, cloud services, custom software development, Chuka University';
const siteUrl = 'https://blackienetworks.co.ke';
const defaultImage = `${siteUrl}/src/assets/logo.png`;

export const SEO: React.FC<SEOProps> = ({
  title = defaultTitle,
  description = defaultDescription,
  keywords = defaultKeywords,
  image = defaultImage,
  url = siteUrl,
  type = 'website',
  noindex = false,
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
      email: 'support@blackienetworks.co.ke',
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

      {/* Structured Data */}
      <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
    </Helmet>
  );
};

