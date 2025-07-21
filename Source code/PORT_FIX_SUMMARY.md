# 🔧 Port Issue Fix Summary

## Problem
The application was failing to start with the error:
```
Error: listen EADDRINUSE: address already in use :::5000
```

## Root Cause
1. **Frontend JavaScript** was trying to connect to `http://localhost:5000`
2. **Backend** was configured to run on port 3000
3. **Port 5000** was already in use by another process

## Solutions Applied

### 1. **Fixed Frontend API Endpoint**
**File:** `Frontend/Main/jobs/script.js`
```javascript
// Before
const response = await fetch("http://localhost:5000/jobs_main", {

// After  
const response = await fetch("http://localhost:3000/jobs_main", {
```

### 2. **Enhanced Backend Port Handling**
**File:** `Source code/src/app.js`
- Added automatic port finding functionality
- Server now automatically finds an available port if default port is busy
- Better error handling and user feedback

### 3. **Created Port Fix Script**
**File:** `Source code/fix-port.js`
- Automated script to identify and kill processes on port 5000
- Interactive prompts for user confirmation
- Cross-platform compatibility

### 4. **Updated Package Scripts**
**File:** `Source code/package.json`
```json
{
  "scripts": {
    "fix-port": "node fix-port.js"
  }
}
```

## How to Use

### Quick Fix
```bash
cd "Source code"
npm run fix-port
```

### Manual Fix
```bash
# Option 1: Use different port
PORT=3001 npm start

# Option 2: Kill process on port 5000 (Windows)
netstat -ano | findstr :5000
taskkill /f /pid <PID>

# Option 3: Kill process on port 5000 (Linux/Mac)
lsof -ti:5000 | xargs kill -9
```

## Benefits
- ✅ Application starts automatically on available port
- ✅ Clear error messages and port information
- ✅ Automated port conflict resolution
- ✅ Better user experience with helpful scripts
- ✅ Cross-platform compatibility

## Testing
After applying the fix:
1. Run `npm start` in the Source code directory
2. Application should start on port 3000 (or next available port)
3. Frontend should connect successfully to backend
4. No more EADDRINUSE errors

---
**Note:** The application now handles port conflicts gracefully and provides clear feedback about which port is being used. 