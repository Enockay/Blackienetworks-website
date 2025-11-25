# Admin User Creation

There are two ways to create a test admin user for the admin dashboard:

## Method 1: Using the Script (Recommended)

### Option 1: Use Default Credentials

Run the script with default credentials:
```bash
npm run create-admin
```

This will create an admin user with:
- **Email**: `admin@blackie-networks.com`
- **Password**: `admin123`

### Option 2: Custom Credentials

Run the script with custom email and password:
```bash
node scripts/createAdmin.js your-email@example.com your-password
```

Or using npm:
```bash
npm run create-admin:custom your-email@example.com your-password
```

## Method 2: Using the API Endpoint (Development Only)

⚠️ **Note**: This endpoint is only available in development mode. It's disabled in production.

You can create an admin user via API:

```bash
curl -X POST http://localhost:3002/api/admin/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "your-password"
  }'
```

Or using JavaScript/fetch:
```javascript
fetch('http://localhost:3002/api/admin/signup', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'admin@example.com',
    password: 'your-password'
  })
})
.then(res => res.json())
.then(data => console.log(data));
```

## Prerequisites

1. Make sure your `.env` file has the `MONGODB` connection string set
2. Ensure MongoDB is running and accessible
3. The backend should have all dependencies installed (`npm install`)

## Example

```bash
# Create admin with default credentials
npm run create-admin

# Create admin with custom credentials
node scripts/createAdmin.js admin@test.com MySecurePassword123
```

## What the Script Does

1. Connects to MongoDB using the `MONGODB` environment variable
2. Checks if an admin user with the same email already exists
3. Hashes the password using bcrypt
4. Creates a new user with `role: 'admin'`
5. Displays the credentials for you to use

## After Creating Admin

Once the admin user is created, you can:

1. Navigate to the login page: `http://localhost:5173/login` (or your frontend URL)
2. Login with the credentials you just created
3. Access the admin dashboard at `/admin/dashboard`

## Security Note

⚠️ **Important**: This script is for development/testing purposes. In production:
- Use strong, unique passwords
- Consider implementing a more secure admin creation process
- Never commit admin credentials to version control
- Use environment variables for sensitive data

## Troubleshooting

### Error: MONGODB environment variable is not set
- Make sure you have a `.env` file in the Backend directory
- Add `MONGODB=your_connection_string` to the `.env` file

### Error: Admin user already exists
- The script will inform you if an admin with that email already exists
- You can either use the existing account or delete it first from MongoDB

### Error: Connection failed
- Check that MongoDB is running
- Verify your MongoDB connection string is correct
- Ensure network connectivity to your MongoDB instance

