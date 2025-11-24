# Coolify Deployment Guide

This guide explains how to deploy the Blackie Networks backend to Coolify after the network IP changes.

## 🔧 Changes Made for Coolify

After updating the server to listen on `0.0.0.0:3010`, the following configurations are needed for Coolify:

### 1. Server Configuration ✅
- Server now listens on `0.0.0.0` (all interfaces) - **Already done**
- Port is configurable via `PORT` environment variable
- Default port is `3010`

### 2. Docker Configuration ✅
- Dockerfile updated with proper health check
- Port 3010 exposed
- Health check uses `0.0.0.0` for Docker compatibility

---

## 🚀 Coolify Deployment Steps

### Step 1: Prepare Your Repository

1. **Commit the changes**:
   ```bash
   git add .
   git commit -m "Update server to listen on 0.0.0.0 for Coolify deployment"
   git push
   ```

### Step 2: Configure in Coolify

1. **Go to your Coolify dashboard**
2. **Select your application** (notify.api.blackie-networks.com)
3. **Go to Settings/Configuration**

### Step 3: Set Environment Variables

Add these environment variables in Coolify:

```env
# Server Configuration
PORT=3010
NODE_ENV=production
HOST=0.0.0.0

# Database
MONGODB=your_mongodb_connection_string

# JWT
JWT_SECRET=your_jwt_secret_key

# Brevo Email Service
BREVO_API_KEY=your_brevo_api_key
BREVO_SENDER_EMAIL=your_sender_email
BREVO_SENDER_NAME=Blackie Networks
BREVO_REPLY_TO_EMAIL=your_reply_email
BREVO_SMS_SENDER=BlackieNet

# Admin
ADMIN_EMAIL=admin@blackie-networks.com

# CORS - Important for Coolify!
ALLOWED_ORIGINS=https://blackie-networks.com,https://www.blackie-networks.com,https://notify.api.blackie-networks.com
```

**Important**: 
- `HOST=0.0.0.0` is critical - this allows the server to accept connections from Coolify's reverse proxy
- `ALLOWED_ORIGINS` should include your frontend domain and the API domain

### Step 4: Configure Port

In Coolify settings:

1. **Port Configuration**:
   - **Internal Port**: `3010` (the port your app listens on)
   - **External Port**: Leave as default (Coolify handles this)

2. **Health Check**:
   - **Path**: `/health`
   - **Port**: `3010`
   - **Interval**: `30` seconds

### Step 5: Build Settings

1. **Build Command**: (Leave empty - Dockerfile handles this)
2. **Dockerfile Path**: `Backend/Dockerfile`
3. **Build Context**: `Backend/` (or root if deploying from root)

### Step 6: Domain Configuration

1. **Domain**: `notify.api.blackie-networks.com`
2. **SSL**: Enable automatic SSL (Let's Encrypt)
3. **Force HTTPS**: Enable

---

## 🔍 Troubleshooting "No Available Server" Error

### Issue: "No available server" in Coolify

This error usually means Coolify can't reach your application. Here's how to fix it:

### Solution 1: Verify Port Configuration

1. **Check Internal Port**:
   - In Coolify, go to your application settings
   - Verify **Internal Port** is set to `3010`
   - This must match the `PORT` environment variable

2. **Check Environment Variables**:
   ```bash
   # In Coolify, verify these are set:
   PORT=3010
   HOST=0.0.0.0
   ```

### Solution 2: Check Health Check

1. **Health Check Path**: Should be `/health`
2. **Health Check Port**: Should be `3010`
3. **Test manually**:
   ```bash
   # After deployment, test the health endpoint
   curl https://notify.api.blackie-networks.com/health
   ```

### Solution 3: Check Application Logs

1. **In Coolify**, go to **Logs** tab
2. **Look for**:
   - `🚀 Server running on port 3010`
   - `🌐 Listening on: 0.0.0.0:3010`
   - `✅ Mongoose connected successfully`

3. **If you see errors**:
   - MongoDB connection issues → Check `MONGODB` env variable
   - Port already in use → Check if another service is using port 3010
   - Missing env variables → Check all required variables are set

### Solution 4: Verify Docker Configuration

1. **Check Dockerfile**:
   ```dockerfile
   EXPOSE 3010
   ```

2. **Check Health Check**:
   ```dockerfile
   HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
     CMD node -e "require('http').get('http://0.0.0.0:' + (process.env.PORT || 3010) + '/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"
   ```

### Solution 5: Rebuild and Redeploy

1. **In Coolify**:
   - Go to your application
   - Click **Redeploy**
   - Or **Force Rebuild** if needed

2. **Wait for build to complete**
3. **Check logs** for startup messages

---

## ✅ Verification Checklist

After deployment, verify:

- [ ] Application builds successfully
- [ ] Container starts without errors
- [ ] Health check endpoint responds: `https://notify.api.blackie-networks.com/health`
- [ ] API docs accessible: `https://notify.api.blackie-networks.com/api-docs`
- [ ] MongoDB connection successful (check logs)
- [ ] Environment variables are set correctly
- [ ] SSL certificate is active
- [ ] CORS is configured for frontend domain

---

## 🧪 Testing the Deployment

### Test Health Endpoint

```bash
curl https://notify.api.blackie-networks.com/health
```

**Expected Response**:
```json
{
  "success": true,
  "status": "OK",
  "timestamp": "2024-...",
  "uptime": 123.45,
  "environment": "production"
}
```

### Test API Endpoint

```bash
curl https://notify.api.blackie-networks.com/api/bookings
```

### Test from Frontend

Update your frontend `.env`:
```env
VITE_API_URL=https://notify.api.blackie-networks.com
```

---

## 🔐 Security Considerations

1. **Environment Variables**: Never commit `.env` files
2. **JWT Secret**: Use a strong, random secret
3. **CORS**: Only allow your frontend domains
4. **Rate Limiting**: Already configured in the app
5. **HTTPS**: Always use HTTPS in production

---

## 📊 Monitoring

### Check Application Status

1. **Coolify Dashboard**: Monitor container status
2. **Application Logs**: Check for errors
3. **Health Check**: Monitor `/health` endpoint
4. **MongoDB**: Verify database connections

### Common Log Messages

**Success**:
```
✅ Environment variables validated
🚀 Server running on port 3010
🌐 Listening on: 0.0.0.0:3010
✅ Mongoose connected successfully
```

**Errors to Watch For**:
```
❌ MongoDB connection error
❌ Environment validation failed
❌ Port already in use
```

---

## 🔄 Updating the Deployment

When you make changes:

1. **Commit and push** your changes
2. **In Coolify**: Click **Redeploy**
3. **Or**: Enable **Auto Deploy** on git push

---

## 📞 Support

If you continue to have issues:

1. Check Coolify documentation: https://coolify.io/docs
2. Review application logs in Coolify
3. Verify all environment variables
4. Test health endpoint manually
5. Check MongoDB connection

---

## 🎯 Quick Reference

### Required Environment Variables
```env
PORT=3010
HOST=0.0.0.0
NODE_ENV=production
MONGODB=your_connection_string
JWT_SECRET=your_secret
BREVO_API_KEY=your_key
ALLOWED_ORIGINS=your_domains
```

### Port Configuration
- **Internal Port**: `3010`
- **External Port**: Auto (Coolify handles)

### Health Check
- **Path**: `/health`
- **Port**: `3010`
- **Expected**: `200 OK` with JSON response

---

**Last Updated**: 2024
**For**: Coolify Deployment

