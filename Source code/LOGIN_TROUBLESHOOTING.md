# 🔐 Login Troubleshooting Guide

## Common Login Issues and Solutions

### 1. **"User not found" Error**
**Problem:** User tries to login but gets "User not found" error

**Solutions:**
```bash
# Create a test user for development
npm run create-test-user

# Test credentials:
# Email: test@jobfiction.com
# Password: Test123!@#
```

### 2. **Email Verification Required**
**Problem:** User gets "You have not Verified" error

**Solutions:**
```bash
# Option 1: Development mode (auto-verifies users)
# Set in .env file:
NODE_ENV=development

# Option 2: Create verified test user
npm run create-test-user

# Option 3: Manually verify user in database
# Connect to MongoDB and update user:
db.registers.updateOne(
  {email: "user@example.com"}, 
  {$set: {verified: true}}
)
```

### 3. **Password Requirements**
**Problem:** Password validation fails

**Requirements:**
- 8-15 characters
- At least 1 uppercase letter
- At least 1 lowercase letter  
- At least 1 number
- At least 1 special character (@#$%^&+=)

**Example valid passwords:**
- `Test123!@#`
- `MyPass1$word`
- `Secure2@pass`

### 4. **Email Format Issues**
**Problem:** Email validation fails

**Requirements:**
- Valid email format (user@domain.com)
- No uppercase letters in local part
- Must be a real email format

**Valid examples:**
- `test@jobfiction.com`
- `user123@gmail.com`
- `john.doe@company.org`

### 5. **Database Connection Issues**
**Problem:** Can't connect to database

**Solutions:**
```bash
# Check if MongoDB is running
mongod

# Check .env file has correct DATABASE_URL
DATABASE_URL=mongodb://localhost:27017/job_fiction

# Test database connection
node -e "
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/job_fiction')
  .then(() => console.log('✅ Database connected'))
  .catch(err => console.log('❌ Database error:', err));
"
```

### 6. **Environment Variables Missing**
**Problem:** Application fails due to missing environment variables

**Required .env variables:**
```env
DATABASE_URL=mongodb://localhost:27017/job_fiction
SECRET_KEY=your_secure_jwt_secret_key
NODE_ENV=development
Base_Url=http://localhost:3000
PORT=3000
```

### 7. **JWT Token Issues**
**Problem:** Cookie/token problems

**Solutions:**
```bash
# Clear browser cookies
# Or use incognito/private browsing

# Check if SECRET_KEY is set in .env
SECRET_KEY=your_secure_jwt_secret_key
```

## Quick Setup for Testing

### Step 1: Environment Setup
```bash
cd "Source code"
cp env.example .env
# Edit .env with your configuration
```

### Step 2: Create Test User
```bash
npm run create-test-user
```

### Step 3: Start Application
```bash
npm start
```

### Step 4: Login
- Go to: http://localhost:3000/login
- Email: `test@jobfiction.com`
- Password: `Test123!@#`

## Development Mode Features

When `NODE_ENV=development` is set:

✅ **Auto-verification:** Users are automatically verified on first login
✅ **Skip email verification:** No need to verify email before login
✅ **Detailed error logging:** More verbose error messages
✅ **Test user creation:** Easy test user setup

## Production Mode

When `NODE_ENV=production` is set:

🔒 **Strict verification:** Email verification required
🔒 **Secure cookies:** HTTPS required for cookies
🔒 **Error hiding:** Generic error messages for security

## Debug Steps

### 1. Check Application Logs
```bash
npm start
# Look for error messages in console
```

### 2. Check Database
```bash
# Connect to MongoDB
mongo
use job_fiction
db.registers.find({})  # List all users
```

### 3. Test API Endpoints
```bash
# Test login endpoint
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "email=test@jobfiction.com&password=Test123!@#"
```

### 4. Check Environment
```bash
# Verify .env file exists and has required variables
cat .env
```

## Common Error Messages

| Error Message | Cause | Solution |
|---------------|-------|----------|
| "User not found" | User doesn't exist | Create test user or register |
| "You have not Verified" | Email not verified | Use development mode or verify email |
| "Invalid password" | Password doesn't meet requirements | Use valid password format |
| "Invalid email format" | Email format incorrect | Use valid email format |
| "Database connection failed" | MongoDB not running | Start MongoDB service |
| "Cookies decoding Error" | JWT secret missing | Set SECRET_KEY in .env |

## Still Having Issues?

1. **Check the console logs** for detailed error messages
2. **Verify MongoDB is running** and accessible
3. **Ensure .env file is properly configured**
4. **Try the test user** created by the script
5. **Use development mode** for easier testing
6. **Clear browser cookies** and try again

---

**Need more help?** Check the main README.md file or create an issue in the repository. 