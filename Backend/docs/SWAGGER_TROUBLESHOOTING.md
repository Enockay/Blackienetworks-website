# Swagger UI SSL Error Troubleshooting

## Issue: SSL Errors Loading Swagger UI Resources

If you're seeing errors like:
```
Failed to load resource: An SSL error has occurred and a secure connection to the server cannot be made.
(swagger-ui.css, swagger-ui-bundle.js, etc.)
```

## Solutions

### 1. Verify Server is Running on Correct Port

Make sure your server is running on port 3010 (or the port specified in your `.env` file):

```bash
PORT=3010 npm start
```

### 2. Clear Browser Cache

Sometimes cached resources cause issues:
- Hard refresh: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows/Linux)
- Or clear browser cache completely

### 3. Check Browser Console

Open browser DevTools (F12) and check:
- Network tab: See which resources are failing to load
- Console tab: Check for specific error messages

### 4. Verify Swagger UI Assets are Served Locally

`swagger-ui-express` should serve all assets locally from `node_modules`. If you're still seeing CDN URLs:

1. Check that `swagger-ui-express` is installed:
   ```bash
   npm list swagger-ui-express
   ```

2. Verify the Swagger setup in `/utils/swagger.js` is correct

### 5. Access Swagger UI Directly

Try accessing:
- Swagger UI: `http://localhost:3010/api-docs`
- Swagger JSON: `http://localhost:3010/api-docs.json`

If the JSON loads but the UI doesn't, it's likely a browser/SSL issue.

### 6. Try Different Browser

Sometimes browser-specific SSL settings cause issues. Try:
- Chrome
- Firefox
- Safari
- Edge

### 7. Check for Mixed Content

If you're accessing via HTTPS but the server is HTTP, you might get mixed content errors. Ensure:
- Server URL in Swagger config matches your actual server URL
- All resources are served over the same protocol (HTTP or HTTPS)

### 8. Reinstall Dependencies

If nothing else works:
```bash
rm -rf node_modules package-lock.json
npm install
```

## Current Configuration

- **Port**: 3010 (configurable via `PORT` env variable)
- **Swagger UI Path**: `/api-docs`
- **Swagger JSON Path**: `/api-docs.json`
- **Assets**: Served locally from `node_modules/swagger-ui-express`

## Still Having Issues?

1. Check server logs for errors
2. Verify MongoDB connection (Swagger doesn't need it, but app might fail to start)
3. Ensure all environment variables are set correctly
4. Try accessing Swagger JSON directly to verify the spec is generated correctly

