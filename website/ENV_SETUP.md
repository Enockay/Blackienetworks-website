# Environment Variables Setup for Vite

## Important: Vite Environment Variables

Vite uses a different system for environment variables than Create React App:

1. **Prefix Required**: All environment variables must start with `VITE_`
2. **Access Method**: Use `import.meta.env.VITE_*` (not `process.env.REACT_APP_*`)
3. **File Location**: Create `.env` file in the `website` directory

## Setup Instructions

### Step 1: Create `.env` file

Create a file named `.env` in the `website` directory:

```bash
cd Blackienetworks-website/website
touch .env
```

### Step 2: Add Environment Variables

Add these variables to your `.env` file:

```env
# Google Search Console Verification
# Get from: https://search.google.com/search-console
VITE_GOOGLE_SITE_VERIFICATION=your_verification_code_here

# Google Analytics Measurement ID
# Get from: https://analytics.google.com/
# Format: G-XXXXXXXXXX
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Facebook Pixel ID
# Get from: https://business.facebook.com/events_manager
# Format: 1234567890123456
VITE_FB_PIXEL_ID=1234567890123456
```

### Step 3: Add to .gitignore

Make sure `.env` is in your `.gitignore` file to keep credentials secure:

```gitignore
# Environment variables
.env
.env.local
.env.production
```

### Step 4: Restart Development Server

After adding environment variables:

```bash
# Stop the server (Ctrl+C)
# Then restart
npm run dev
```

## Environment Variable Names

| Purpose | Variable Name | Example |
|---------|--------------|---------|
| Google Search Console | `VITE_GOOGLE_SITE_VERIFICATION` | `abc123def456...` |
| Google Analytics | `VITE_GA_MEASUREMENT_ID` | `G-XXXXXXXXXX` |
| Facebook Pixel | `VITE_FB_PIXEL_ID` | `1234567890123456` |

## Important Notes

1. **VITE_ Prefix Required**: Without the `VITE_` prefix, variables won't be accessible
2. **Restart Required**: You must restart the dev server after changing `.env`
3. **No Quotes Needed**: Don't wrap values in quotes in `.env` file
4. **Case Sensitive**: Variable names are case-sensitive

## Testing Environment Variables

To verify your environment variables are loaded:

1. Open browser console (F12)
2. Type: `console.log(import.meta.env)`
3. You should see your `VITE_*` variables

**Note**: Only variables with `VITE_` prefix will be visible.

## Production Deployment

For production, set these as environment variables in your hosting platform:

### Vercel
- Go to Project Settings → Environment Variables
- Add each variable with `VITE_` prefix

### Netlify
- Go to Site Settings → Build & Deploy → Environment
- Add each variable with `VITE_` prefix

### Docker
- Add to `docker-compose.yml` or use `-e` flag:
```yaml
environment:
  - VITE_GOOGLE_SITE_VERIFICATION=your_code
  - VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
  - VITE_FB_PIXEL_ID=1234567890123456
```

## Troubleshooting

### Issue: Variables not accessible
**Solution:**
- Check variable names start with `VITE_`
- Restart dev server after adding variables
- Check `.env` file is in `website` directory (not root)

### Issue: `process is not defined`
**Solution:**
- Use `import.meta.env` instead of `process.env`
- This is already fixed in the code

### Issue: Variables undefined in browser
**Solution:**
- Only `VITE_*` variables are exposed to browser
- Check variable names match exactly (case-sensitive)

## Example .env File

```env
# ============================================
# Blackie Networks - Environment Variables
# ============================================
# 
# IMPORTANT: All variables must start with VITE_
# Restart dev server after making changes
#
# ============================================

# Google Search Console Verification
# Get from: https://search.google.com/search-console
# After adding property, choose "HTML tag" verification
VITE_GOOGLE_SITE_VERIFICATION=

# Google Analytics Measurement ID
# Get from: https://analytics.google.com/
# Create property → Get Measurement ID (format: G-XXXXXXXXXX)
VITE_GA_MEASUREMENT_ID=

# Facebook Pixel ID
# Get from: https://business.facebook.com/events_manager
# Create Pixel → Get Pixel ID
VITE_FB_PIXEL_ID=
```

---

**Last Updated:** January 2025
**Framework:** Vite (not Create React App)

