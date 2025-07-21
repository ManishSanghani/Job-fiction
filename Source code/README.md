# Job Fiction - Job Portal Application

A comprehensive job portal built with Node.js, Express, MongoDB, and Handlebars templating.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Email service (Gmail recommended)

### Installation

1. **Clone and Setup**
```bash
cd "Source code"
npm install
```

2. **Environment Configuration**
```bash
# Copy environment template
cp .env.example .env

# Edit .env with your settings
# See Email Configuration section below
```

3. **Database Setup**
```bash
# Start MongoDB (if local)
mongod

# Or use MongoDB Atlas (update connection string in .env)
```

4. **Create Test User**
```bash
npm run create-test-user
```

5. **Start Application**
```bash
npm start
```

6. **Access Application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:3000/api

## 📧 Email Configuration

### Gmail Setup (Recommended)

1. **Enable 2-Factor Authentication**
   - Go to Google Account settings
   - Security > 2-Step Verification > Turn on

2. **Generate App Password**
   - Go to Google Account settings
   - Security > 2-Step Verification > App passwords
   - Select "Mail" and generate password

3. **Update .env file**
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-digit-app-password
NODE_ENV=development
```

### Test Email Configuration
```bash
npm run test-email
```

## 🔐 Login System

### Test Credentials
```
Email: test@example.com
Password: TestPass123!
```

### Login Flow
1. Go to http://localhost:3000/login
2. Enter credentials
3. Should redirect to /home after successful login

### Development Mode
- Email verification bypassed for easier testing
- Emails logged to console instead of sent
- Detailed debugging information

## 🛠️ Available Scripts

```bash
npm start              # Start development server
npm run setup          # Initial setup and configuration
npm run fix-port       # Resolve port conflicts
npm run create-test-user # Create test user account
npm run test-email     # Test email configuration
npm test               # Run unit tests
npm run test-report    # Generate test reports
```

## 📁 Project Structure

```
Source code/
├── src/
│   ├── controllers/   # Route controllers
│   ├── models/        # MongoDB schemas
│   ├── routes/        # Express routes
│   ├── middlewares/   # Custom middlewares
│   ├── services/      # Business logic (email, etc.)
│   └── app.js         # Main application file
├── public/            # Static assets
├── templates/         # Handlebars templates
├── unit_testing/      # Test files
└── scripts/           # Utility scripts
```

## 🔧 Key Features

### User Management
- ✅ User registration with email verification
- ✅ Secure login with JWT tokens
- ✅ Password hashing with bcrypt
- ✅ Profile management
- ✅ Session management

### Job Management
- ✅ Job posting for companies
- ✅ Job search and filtering
- ✅ Job applications
- ✅ Saved jobs functionality
- ✅ Job recommendations

### Security Features
- ✅ JWT-based authentication
- ✅ Password validation
- ✅ Email verification
- ✅ Secure cookie settings
- ✅ Input validation and sanitization

### Email System
- ✅ SMTP email configuration
- ✅ Email verification
- ✅ Password reset functionality
- ✅ Development mode logging

## 🐛 Troubleshooting

### Common Issues

1. **Port Already in Use**
```bash
npm run fix-port
```

2. **Login Not Working**
- Check console logs for error messages
- Verify test user exists: `npm run create-test-user`
- Check browser network tab for redirect issues

3. **Email Not Sending**
```bash
npm run test-email
```
- Verify .env configuration
- Check Gmail app password setup
- Ensure 2FA is enabled

4. **Database Connection Issues**
- Verify MongoDB is running
- Check connection string in .env
- Ensure network connectivity

### Debug Mode
```bash
# Enable detailed logging
NODE_ENV=development npm start
```

## 📚 Documentation

- [Login & Email Fixes](LOGIN_EMAIL_FIXES.md) - Detailed fixes for login redirect and SMTP issues
- [Login Troubleshooting](LOGIN_TROUBLESHOOTING.md) - Comprehensive login debugging guide
- [Fix Summary](LOGIN_FIX_SUMMARY.md) - Summary of all fixes applied

## 🧪 Testing

### Unit Tests
```bash
npm test
```

### Test Reports
```bash
npm run test-report
# Reports generated in unit_testing/*/mochawesome-report/
```

### Manual Testing
1. **User Registration**: Test new user signup
2. **Email Verification**: Check email delivery
3. **Login Flow**: Test authentication
4. **Job Posting**: Test company features
5. **Job Application**: Test candidate features

## 🔒 Security Notes

- JWT tokens expire after 30 minutes
- Passwords must meet complexity requirements
- Email verification required in production
- Secure cookie settings enabled
- Input validation on all forms

## 🌐 Deployment

### Production Checklist
- [ ] Set NODE_ENV=production
- [ ] Configure secure email settings
- [ ] Set up MongoDB Atlas
- [ ] Configure domain and SSL
- [ ] Set secure JWT secret
- [ ] Enable email verification

### Environment Variables
```env
NODE_ENV=production
MONGODB_URI=your-mongodb-atlas-uri
SECRET_KEY=your-secure-jwt-secret
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For issues and questions:
1. Check troubleshooting guides
2. Review console logs
3. Test with provided scripts
4. Check browser developer tools 