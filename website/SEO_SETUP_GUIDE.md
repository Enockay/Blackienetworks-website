# SEO Setup Guide for Blackie Networks

This guide will help you complete the final SEO setup steps for your website at `https://www.blackie-networks.com`.

## 1. Google Search Console Verification

### Steps:
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click "Add Property" and enter your website URL: `https://www.blackie-networks.com`
3. Choose "HTML tag" verification method
4. Copy the verification code (looks like: `abc123def456...`)
5. Add it to your environment variables or directly in the code:

**Option A: Environment Variable (Recommended)**
- Create a `.env` file in the `website` directory
- Add: `REACT_APP_GOOGLE_SITE_VERIFICATION=your_verification_code_here`
- The code will automatically be added to the SEO component

**Option B: Direct in index.html**
- Open `website/index.html`
- Uncomment and replace the verification meta tag:
```html
<meta name="google-site-verification" content="YOUR_VERIFICATION_CODE_HERE" />
```

6. Click "Verify" in Google Search Console
7. Once verified, submit your sitemap: `https://www.blackie-networks.com/sitemap.xml`

## 2. Google Analytics Setup

### Steps:
1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new property for `www.blackie-networks.com`
3. Get your Measurement ID (format: `G-XXXXXXXXXX`)
4. Add it to your `.env` file:
```
REACT_APP_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

The Analytics component is already integrated and will automatically track page views and events.

### Track Custom Events:
```typescript
import { trackEvent } from './componets/Analytics';

// Track button clicks, form submissions, etc.
trackEvent('click', 'Button', 'Book Service', 1);
```

## 3. Facebook Pixel Setup

### Steps:
1. Go to [Facebook Events Manager](https://business.facebook.com/events_manager)
2. Create a new Pixel
3. Get your Pixel ID (format: `1234567890123456`)
4. Add it to your `.env` file:
```
REACT_APP_FB_PIXEL_ID=1234567890123456
```

The Facebook Pixel is already integrated and will automatically track page views.

### Track Custom Events:
```typescript
import { trackFacebookEvent } from './componets/Analytics';

// Track conversions, leads, etc.
trackFacebookEvent('Lead', { content_name: 'Service Booking' });
```

## 4. Bing Webmaster Tools

### Steps:
1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Sign in with your Microsoft account
3. Click "Add a site" and enter: `https://www.blackie-networks.com`
4. Verify ownership using one of these methods:
   - **HTML Meta Tag**: Add the verification code to `index.html`
   - **XML File**: Upload the provided XML file to your public folder
5. Once verified, submit your sitemap: `https://www.blackie-networks.com/sitemap.xml`

## 5. Environment Variables File

Create a `.env` file in the `website` directory with:

```env
# Google Search Console Verification
REACT_APP_GOOGLE_SITE_VERIFICATION=your_verification_code_here

# Google Analytics Measurement ID
REACT_APP_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Facebook Pixel ID
REACT_APP_FB_PIXEL_ID=1234567890123456
```

**Important**: 
- Add `.env` to your `.gitignore` file to keep credentials secure
- Restart your development server after adding environment variables
- For production, set these as environment variables in your hosting platform

## 6. Sitemap Submission Checklist

### Google Search Console:
- [ ] Verify website ownership
- [ ] Submit sitemap: `https://www.blackie-networks.com/sitemap.xml`
- [ ] Check for indexing issues
- [ ] Monitor search performance

### Bing Webmaster Tools:
- [ ] Verify website ownership
- [ ] Submit sitemap: `https://www.blackie-networks.com/sitemap.xml`
- [ ] Check for crawl errors
- [ ] Monitor search performance

## 7. Additional SEO Recommendations

### Content Optimization:
- [ ] Add more blog posts regularly (target: 2-4 per month)
- [ ] Update service descriptions with more keywords
- [ ] Add customer reviews/testimonials
- [ ] Create location-specific landing pages if serving multiple areas

### Technical SEO:
- [ ] Ensure all images have descriptive alt text (✅ Already done)
- [ ] Check mobile responsiveness (✅ Already optimized)
- [ ] Test page speed with [PageSpeed Insights](https://pagespeed.web.dev/)
- [ ] Set up SSL certificate (HTTPS) - Required for production
- [ ] Enable GZIP compression on server

### Local SEO:
- [ ] Create Google Business Profile
- [ ] Add business to local directories
- [ ] Encourage customer reviews on Google
- [ ] Use consistent NAP (Name, Address, Phone) across all platforms

### Link Building:
- [ ] Submit to relevant business directories
- [ ] Reach out to local tech blogs for guest posts
- [ ] Partner with universities and institutions
- [ ] Create shareable content (infographics, guides)

## 8. Monitoring & Maintenance

### Weekly:
- Check Google Search Console for errors
- Monitor analytics for traffic trends
- Review and respond to customer reviews

### Monthly:
- Update sitemap if new pages are added
- Review and update meta descriptions
- Analyze top-performing content
- Check for broken links

### Quarterly:
- Review and update structured data
- Analyze competitor SEO strategies
- Update FAQ section with new questions
- Refresh old blog content

## 9. Testing Your SEO

Use these tools to verify your SEO implementation:

1. **Google Rich Results Test**: https://search.google.com/test/rich-results
   - Test your structured data (Organization, LocalBusiness, FAQ, Reviews)

2. **Google Mobile-Friendly Test**: https://search.google.com/test/mobile-friendly

3. **PageSpeed Insights**: https://pagespeed.web.dev/
   - Test page speed and Core Web Vitals

4. **Schema Markup Validator**: https://validator.schema.org/
   - Validate your JSON-LD structured data

5. **SEO Checker Tools**:
   - [SEMrush](https://www.semrush.com/)
   - [Ahrefs](https://ahrefs.com/)
   - [Moz](https://moz.com/)

## 10. Support

If you need help with any of these steps:
- Google Search Console Help: https://support.google.com/webmasters
- Google Analytics Help: https://support.google.com/analytics
- Facebook Pixel Help: https://www.facebook.com/business/help

---

**Last Updated**: January 2025
**Website**: https://www.blackie-networks.com

