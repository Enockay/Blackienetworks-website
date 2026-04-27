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
  faq?: Array<{ question: string; answer: string }>;
  googleSiteVerification?: string;
}

const SITE = 'https://www.blackie-networks.com';
const OG_IMAGE = `${SITE}/logo.png`;

const defaultTitle = 'Blackie Networks — IT Solutions, Network Infrastructure & Software Development | Kenya';
const defaultDescription =
  "Kenya's trusted IT company: campus Wi-Fi, network infrastructure, MikroTik, cloud hosting, custom software, mobile apps & AI automation. Serving businesses and universities across Kenya.";
const defaultKeywords = [
  // Brand
  'Blackie Networks', 'Blackie Networks Kenya', 'IT company Kenya', 'IT solutions Kenya',
  'IT consulting Kenya', 'managed IT services Kenya', 'IT support Kenya',
  'IT solutions Nairobi', 'best IT company Kenya',

  // Internet & networking
  'internet service provider Kenya', 'campus internet Kenya', 'campus WiFi Kenya',
  'campus WiFi installation Kenya', 'WiFi installation Kenya', 'office WiFi Nairobi',
  'business WiFi solutions Kenya', 'affordable internet Kenya',

  // Network infrastructure
  'network infrastructure Kenya', 'network infrastructure Nairobi', 'network setup Kenya',
  'network design Kenya', 'structured cabling Kenya', 'LAN cabling Kenya',
  'fiber optic installation Kenya', 'router configuration Kenya',

  // MikroTik, VPN, security
  'MikroTik configuration Kenya', 'MikroTik VPN Kenya', 'MikroTik hotspot Kenya',
  'VPN solutions Kenya', 'remote access VPN Kenya', 'network security Kenya',
  'firewall configuration Kenya', 'cyber security Kenya',

  // Billing & ISP
  'ISP billing system Kenya', 'hotspot billing Kenya', 'radius billing Kenya',
  'voucher billing system Kenya',

  // Cloud & hosting
  'cloud hosting Kenya', 'cloud infrastructure Kenya', 'VPS hosting Kenya',
  'AWS hosting Kenya', 'backup solutions Kenya', 'disaster recovery Kenya',

  // Software development
  'software development Kenya', 'custom software development Kenya',
  'web development Kenya', 'website design Kenya', 'website design Nairobi',
  'custom web portals Kenya', 'school management systems Kenya',

  // Mobile & AI
  'mobile app development Kenya', 'Android app development Kenya',
  'iOS app development Kenya', 'AI systems Kenya', 'AI automation Kenya',
  'business automation Kenya',

  // Local
  'IT solutions Chuka', 'Chuka University internet', 'Tharaka Nithi IT services',
  'Nairobi IT solutions', 'internet for campuses Kenya', 'internet for schools Kenya',
].join(', ');

export const SEO: React.FC<SEOProps> = ({
  title = defaultTitle,
  description = defaultDescription,
  keywords = defaultKeywords,
  image = OG_IMAGE,
  url = SITE,
  type = 'website',
  noindex = false,
  breadcrumbs,
  article,
  faq,
  googleSiteVerification,
}) => {
  const fullTitle = title.includes('Blackie Networks') ? title : `${title} | Blackie Networks`;
  const fullUrl   = url.startsWith('http') ? url : `${SITE}${url}`;
  const fullImage = image.startsWith('http') ? image : `${SITE}${image}`;

  // ── Structured Data ──────────────────────────────────────────────────────

  const breadcrumbSchema = breadcrumbs
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((crumb, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: crumb.name,
          item: crumb.url.startsWith('http') ? crumb.url : `${SITE}${crumb.url}`,
        })),
      }
    : null;

  const articleSchema = article
    ? {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: fullTitle,
        description,
        image: fullImage,
        datePublished: article.publishedTime,
        dateModified: article.modifiedTime || article.publishedTime,
        author: {
          '@type': 'Person',
          name: article.author || 'Blackie Networks',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Blackie Networks',
          logo: { '@type': 'ImageObject', url: OG_IMAGE },
        },
        articleSection: article.section,
        keywords: article.tags?.join(', ') || keywords,
        mainEntityOfPage: { '@type': 'WebPage', '@id': fullUrl },
      }
    : null;

  const faqSchema = faq && faq.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faq.map(({ question, answer }) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: { '@type': 'Answer', text: answer },
        })),
      }
    : null;

  const webpageSchema = {
    '@context': 'https://schema.org',
    '@type': type === 'article' ? 'Article' : 'WebPage',
    '@id': fullUrl,
    name: fullTitle,
    description,
    url: fullUrl,
    image: fullImage,
    isPartOf: { '@id': `${SITE}/#website` },
    breadcrumb: breadcrumbs
      ? { '@id': `${fullUrl}#breadcrumb` }
      : undefined,
  };

  return (
    <Helmet>
      {/* Primary */}
      <html lang="en-KE" />
      <title>{fullTitle}</title>
      <meta name="title"       content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords"    content={keywords} />
      <meta name="robots"      content={noindex ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'} />
      <meta name="author"      content="Blackie Networks" />
      <meta name="copyright"   content="Blackie Networks" />
      <meta name="revisit-after" content="7 days" />

      {/* Geo */}
      <meta name="geo.region"    content="KE" />
      <meta name="geo.placename" content="Chuka, Tharaka Nithi, Kenya" />
      <meta name="geo.position"  content="-0.3322;37.6373" />
      <meta name="ICBM"          content="-0.3322, 37.6373" />

      {/* Canonical */}
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph */}
      <meta property="og:type"        content={type} />
      <meta property="og:url"         content={fullUrl} />
      <meta property="og:site_name"   content="Blackie Networks" />
      <meta property="og:title"       content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image"       content={fullImage} />
      <meta property="og:image:secure_url" content={fullImage} />
      <meta property="og:image:width"  content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt"   content={fullTitle} />
      <meta property="og:locale"      content="en_KE" />

      {/* Twitter */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:site"        content="@blackienetworks" />
      <meta name="twitter:creator"     content="@blackienetworks" />
      <meta name="twitter:url"         content={fullUrl} />
      <meta name="twitter:title"       content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={fullImage} />
      <meta name="twitter:image:alt"   content={fullTitle} />

      {/* Article-specific OG */}
      {article && (
        <>
          <meta property="og:type"                content="article" />
          <meta property="article:published_time" content={article.publishedTime} />
          {article.modifiedTime && (
            <meta property="article:modified_time" content={article.modifiedTime} />
          )}
          {article.author  && <meta property="article:author"  content={article.author} />}
          {article.section && <meta property="article:section" content={article.section} />}
          {article.tags?.map((tag, i) => (
            <meta key={i} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Google Search Console */}
      {googleSiteVerification && (
        <meta name="google-site-verification" content={googleSiteVerification} />
      )}

      {/* Structured Data */}
      <script type="application/ld+json">{JSON.stringify(webpageSchema)}</script>
      {breadcrumbSchema && (
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      )}
      {articleSchema && (
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      )}
      {faqSchema && (
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      )}
    </Helmet>
  );
};
