# Job Fiction - Job Portal Application

A comprehensive job portal that connects job seekers with employers. Built with Node.js, Express, MongoDB, Handlebars, and a modular frontend.

---

## 🚀 Features
- User registration, login, and profile management
- Company registration, job posting, and company profiles
- Job search, application, and recommendations
- Saved jobs and application tracking
- Secure authentication (JWT, bcrypt)
- Email verification and password reset
- Responsive frontend served by the backend

---

## 🗂️ Project Structure

```
job fiction/
├── Frontend/           # All frontend HTML, CSS, JS, and assets
├── Source code/        # Backend (Node.js/Express/MongoDB)
│   ├── src/            # Controllers, models, routes, middlewares
│   ├── public/         # Static assets (legacy)
│   ├── templates/      # Handlebars templates
│   └── unit_testing/   # Test files
└── README.md           # This file
```

---

## ⚡ Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### 1. Clone and Install
```bash
git clone <your-repo-url>
cd "Source code"
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
# Edit .env with your MongoDB URI, email credentials, etc.
```

### 3. Start MongoDB
- Local: `mongod`
- Atlas: Update connection string in `.env`

### 4. Create Test User (optional)
```bash
npm run create-test-user
```

### 5. Start the Application
```bash
npm start
```

### 6. Access the App
- Open [http://localhost:3000](http://localhost:3000) in your browser
- The backend serves the frontend from the `Frontend/` directory

---

## 🖥️ Frontend
- All static files (HTML, CSS, JS, images) are in the `Frontend/` directory
- The backend serves these files automatically
- You can open any HTML file directly or via backend routes

---

## 🔐 Authentication & Email
- JWT-based login for users and companies
- Passwords are hashed with bcrypt
- Email verification and password reset via SMTP (Gmail recommended)
- See `.env.example` for required environment variables

---

## 🛠️ Scripts
```bash
npm start              # Start server
npm run setup          # Initial setup
npm run fix-port       # Resolve port conflicts
npm run create-test-user # Create a test user
npm run test-email     # Test email configuration
npm test               # Run unit tests
```

---

## 🧪 Testing
- Unit tests are in `Source code/unit_testing/`
- Run with `npm test`

---

## 🐛 Troubleshooting & Documentation
- **Login & Email Fixes:** `Source code/LOGIN_EMAIL_FIXES.md`
- **Login Troubleshooting:** `Source code/LOGIN_TROUBLESHOOTING.md`
- **Fix Summary:** `Source code/LOGIN_FIX_SUMMARY.md`
- **Port Issues:** `Source code/PORT_FIX_SUMMARY.md`
- **All Fixes:** `Source code/FIXES_APPLIED.md`

---

## 🤝 Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

## 📄 License
This project is licensed under the ISC License.

---

## 🆘 Support
- For issues, check the troubleshooting guides above
- Review console logs and browser developer tools
- Open an issue or pull request for help


