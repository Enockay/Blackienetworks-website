# Quick SEO Check - 5 Minute Verification

## Method 1: Browser Console (Fastest)

1. **Open your website** in a browser: `https://www.blackie-networks.com`
2. **Open Developer Tools** (F12 or Right-click → Inspect)
3. **Go to Console tab**
4. **Copy and paste** the code from `seo-quick-check.js`
5. **Press Enter**

You'll see a quick report showing what's working and what needs attention.

## Method 2: Online SEO Checker Tool

1. **Start your dev server**: `npm run dev`
2. **Visit**: `http://localhost:5174/seo-check.html`
3. **Enter your URL** (or use default)
4. **Click "Check SEO"**

This will give you a detailed visual report with scores.

## Method 3: Google's Official Tools (Most Accurate)

### A. Rich Results Test
1. Visit: https://search.google.com/test/rich-results
2. Enter: `https://www.blackie-networks.com`
3. Click "Test URL"
4. **Check for:**
   - ✅ Organization schema
   - ✅ LocalBusiness schema
   - ✅ Service schema
   - ✅ FAQ schema (on FAQ page)
   - ✅ Review schema

### B. PageSpeed Insights
1. Visit: https://pagespeed.web.dev/
2. Enter your URL
3. Click "Analyze"
4. **Target scores:**
   - Performance: 90+
   - SEO: 95+
   - Accessibility: 90+
   - Best Practices: 90+

### C. Mobile-Friendly Test
1. Visit: https://search.google.com/test/mobile-friendly
2. Enter your URL
3. **Should show:** "Page is mobile-friendly" ✅

## Method 4: Manual Check (View Source)

1. **Visit your homepage**
2. **Right-click → View Page Source** (Ctrl+U / Cmd+U)
3. **Search for these** (Ctrl+F / Cmd+F):

**Must Have:**
- `title` - Should see your page title
- `meta name="description"` - Should see description
- `link rel="canonical"` - Should see canonical URL
- `meta property="og:` - Should see Open Graph tags
- `script type="application/ld+json"` - Should see structured data

## Expected Results

### ✅ Your site should have:

1. **Meta Tags** ✅
   - Title tag on every page
   - Meta description on every page
   - Keywords meta tag
   - Canonical URLs

2. **Open Graph** ✅
   - og:title
   - og:description
   - og:image
   - og:url

3. **Twitter Cards** ✅
   - twitter:card
   - twitter:title
   - twitter:description

4. **Structured Data** ✅
   - Organization schema
   - LocalBusiness schema
   - Service schema
   - Website schema
   - FAQ schema (on FAQ page)
   - Review schema (on testimonials)

5. **Technical SEO** ✅
   - Sitemap.xml accessible
   - Robots.txt accessible
   - All images have alt text
   - Mobile responsive
   - HTTPS enabled

## Quick Checklist

Run through this checklist:

- [ ] Homepage has title and description
- [ ] All pages have unique titles
- [ ] Sitemap accessible at `/sitemap.xml`
- [ ] Robots.txt accessible at `/robots.txt`
- [ ] Images have descriptive alt text
- [ ] Structured data validates (use Rich Results Test)
- [ ] Mobile-friendly (use Mobile-Friendly Test)
- [ ] Fast page speed (use PageSpeed Insights)
- [ ] HTTPS enabled
- [ ] FAQ page has FAQ schema
- [ ] Testimonials have Review schema

## If Something is Missing

1. **Check the SEO component** - Make sure it's included in all routes
2. **Check environment variables** - If using Google verification
3. **Check console for errors** - React errors might prevent SEO tags
4. **Clear browser cache** - Old cached versions might show
5. **Check if site is built** - Run `npm run build` for production

## Success Indicators

### ✅ You'll know SEO is working when:

1. **Google Rich Results Test** shows all schemas detected
2. **PageSpeed Insights** shows SEO score 95+
3. **Mobile-Friendly Test** passes
4. **View Source** shows all meta tags
5. **Sitemap** is accessible and valid
6. **Structured data** validates without errors

## Need Help?

- Check `SEO_VERIFICATION_GUIDE.md` for detailed instructions
- Check `SEO_SETUP_GUIDE.md` for setup help
- Use the online tools mentioned above

---

**Remember:** SEO optimization is an ongoing process. These checks verify your technical foundation is solid!

