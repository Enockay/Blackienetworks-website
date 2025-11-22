# Production Setup Guide

## ✅ Production-Ready Features Implemented

### 1. Security Enhancements
- **Helmet.js**: Protects against common web vulnerabilities
- **CORS**: Configured with environment-based origin whitelist
- **Rate Limiting**: Prevents API abuse (100 requests per 15 minutes in production)
- **Input Validation**: Express-validator for request validation
- **Error Handling**: Comprehensive error handling with proper status codes

### 2. Environment Configuration
- **Environment Validation**: Validates required variables on startup
- **Port Configuration**: Defaults to 3000 if not specified
- **Environment Detection**: Different behavior for development vs production

### 3. Database
- **Connection Timeouts**: Proper timeout configuration
- **Error Handling**: Graceful connection error handling
- **Graceful Shutdown**: Properly closes connections on shutdown

### 4. Logging & Monitoring
- **Morgan Logger**: Combined format for production, dev format for development
- **Error Logging**: Comprehensive error logging with stack traces in development
- **Health Check Endpoint**: `/health` endpoint for monitoring

### 5. API Improvements
- **Consistent Response Format**: All responses include `success` field
- **Proper HTTP Status Codes**: 201 for creation, proper error codes
- **Request Validation**: Automatic validation of booking requests
- **Error Messages**: User-friendly error messages

## 📋 Required Environment Variables

Create a `.env` file with:

```env
# Server Configuration
NODE_ENV=production
PORT=3010

# Database
MONGODB=your_mongodb_connection_string

# Security
JWT_SECRET=your_very_secure_jwt_secret_key_minimum_32_characters

# CORS (comma-separated list of allowed origins)
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

# Email (Brevo)
BREVO_API_KEY=your_brevo_api_key
BREVO_SENDER_EMAIL=noreply@yourdomain.com
BREVO_REPLY_TO_EMAIL=support@yourdomain.com
ADMIN_EMAIL=admin@yourdomain.com
```

## 🚀 Deployment Steps

### 1. Prepare for Production

```bash
# Install production dependencies only
npm install --production

# Or install all (including dev dependencies)
npm install
```

### 2. Set Environment Variables

Make sure all required environment variables are set in your production environment.

### 3. Start the Server

```bash
# Production mode
npm run production

# Or using PM2 (recommended)
npm install -g pm2
pm2 start index.js --name "blackie-backend" --env production
pm2 save
pm2 startup
```

### 4. Using PM2 (Recommended)

PM2 is a production process manager for Node.js:

```bash
# Install PM2 globally
npm install -g pm2

# Start your app
pm2 start index.js --name "blackie-backend"

# Save PM2 configuration
pm2 save

# Setup PM2 to start on system boot
pm2 startup

# Monitor your app
pm2 monit

# View logs
pm2 logs blackie-backend

# Restart app
pm2 restart blackie-backend

# Stop app
pm2 stop blackie-backend
```

## 🔒 Security Checklist

- [x] Helmet.js installed and configured
- [x] CORS properly configured
- [x] Rate limiting enabled
- [x] Input validation on all endpoints
- [x] Environment variables validated
- [x] Error messages don't expose sensitive info
- [x] X-Powered-By header removed
- [ ] SSL/HTTPS enabled (configure on your server/hosting)
- [ ] Firewall rules configured
- [ ] Database credentials secured
- [ ] API keys stored securely (never commit to git)

## 📊 Monitoring

### Health Check Endpoint

```bash
GET /health
```

Response:
```json
{
  "success": true,
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 3600,
  "environment": "production"
}
```

### Logs

- **Development**: Uses `morgan('dev')` - colored, detailed logs
- **Production**: Uses `morgan('combined')` - Apache combined log format

## 🔧 API Endpoints

### Public Endpoints

- `GET /health` - Health check
- `POST /api/bookings/book/public` - Create booking (public)

### Protected Endpoints

- `POST /api/bookings/book` - Create booking (authenticated)
- `GET /api/bookings` - List bookings

## ⚠️ Important Notes

1. **Never commit `.env` file** to version control
2. **Use strong JWT_SECRET** (minimum 32 characters, random)
3. **Enable HTTPS** in production
4. **Monitor logs** regularly
5. **Set up backups** for MongoDB
6. **Use PM2 or similar** for process management
7. **Configure firewall** to only allow necessary ports
8. **Regular security updates** for dependencies

## 🐛 Troubleshooting

### Server won't start
- Check all required environment variables are set
- Verify MongoDB connection string is correct
- Check port is not already in use

### Rate limiting too strict
- Adjust `max` value in `app.js` rate limiter configuration
- Or increase `windowMs` for longer time windows

### CORS errors
- Add your frontend URL to `ALLOWED_ORIGINS` in `.env`
- Or temporarily allow all origins in development

### Email not sending
- Verify `BREVO_API_KEY` is correct
- Check sender email is verified in Brevo
- Check Brevo account limits

## 📈 Performance Tips

1. **Enable MongoDB indexing** on frequently queried fields
2. **Use connection pooling** (already configured)
3. **Monitor memory usage** with PM2
4. **Set up load balancing** if needed
5. **Use CDN** for static assets
6. **Enable compression** (can add express compression middleware)

## 🔄 Updates & Maintenance

```bash
# Update dependencies
npm update

# Check for security vulnerabilities
npm audit

# Fix vulnerabilities (if safe)
npm audit fix
```

## 📞 Support

For issues or questions:
- Check logs: `pm2 logs blackie-backend`
- Check health endpoint: `curl http://localhost:3010/health`
- Review error messages in console

