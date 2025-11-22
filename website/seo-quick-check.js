// Quick SEO Check Script
// Run this in your browser console on your website

console.log('=== SEO VERIFICATION ===\n');

// Check title
const title = document.querySelector('title');
console.log(title ? `✅ Title: ${title.textContent}` : '❌ Title: Missing');

// Check meta description
const desc = document.querySelector('meta[name="description"]');
console.log(desc ? `✅ Description: ${desc.content.substring(0, 60)}...` : '❌ Description: Missing');

// Check canonical
const canonical = document.querySelector('link[rel="canonical"]');
console.log(canonical ? `✅ Canonical: ${canonical.href}` : '❌ Canonical: Missing');

// Check Open Graph
const ogTitle = document.querySelector('meta[property="og:title"]');
const ogDesc = document.querySelector('meta[property="og:description"]');
const ogImage = document.querySelector('meta[property="og:image"]');
console.log(ogTitle && ogDesc && ogImage ? '✅ Open Graph: All tags present' : '❌ Open Graph: Missing tags');

// Check Twitter Cards
const twitterCard = document.querySelector('meta[name="twitter:card"]');
console.log(twitterCard ? '✅ Twitter Cards: Configured' : '⚠️ Twitter Cards: Not configured');

// Check structured data
const scripts = document.querySelectorAll('script[type="application/ld+json"]');
console.log(scripts.length > 0 ? `✅ Structured Data: ${scripts.length} schema(s) found` : '❌ Structured Data: None found');

// Check images with alt
const images = document.querySelectorAll('img');
const imagesWithoutAlt = Array.from(images).filter(img => !img.alt);
const altPercentage = images.length > 0 ? Math.round((images.length - imagesWithoutAlt.length) / images.length * 100) : 100;
console.log(altPercentage >= 90 ? `✅ Images: ${altPercentage}% have alt text` : `⚠️ Images: Only ${altPercentage}% have alt text`);

// Check H1
const h1 = document.querySelector('h1');
console.log(h1 ? `✅ H1: ${h1.textContent.substring(0, 50)}` : '❌ H1: Missing');

// Check viewport
const viewport = document.querySelector('meta[name="viewport"]');
console.log(viewport ? '✅ Viewport: Configured' : '❌ Viewport: Missing');

// Check robots
const robots = document.querySelector('meta[name="robots"]');
console.log(robots ? `✅ Robots: ${robots.content}` : '⚠️ Robots: Using default');

console.log('\n=== END VERIFICATION ===');
console.log('\nFor detailed checks, visit:');
console.log('- https://search.google.com/test/rich-results');
console.log('- https://pagespeed.web.dev/');
console.log('- https://search.google.com/test/mobile-friendly');
