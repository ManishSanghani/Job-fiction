#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('🚀 Job Fiction - Setup Script');
console.log('==============================\n');

// Check if .env file exists
const envPath = path.join(__dirname, '.env');
const envExamplePath = path.join(__dirname, 'env.example');

if (fs.existsSync(envPath)) {
    console.log('✅ .env file already exists');
} else {
    if (fs.existsSync(envExamplePath)) {
        console.log('📋 Creating .env file from template...');
        fs.copyFileSync(envExamplePath, envPath);
        console.log('✅ .env file created successfully');
        console.log('⚠️  Please edit .env file with your configuration before starting the application');
    } else {
        console.log('❌ env.example file not found');
        process.exit(1);
    }
}

// Check if node_modules exists
const nodeModulesPath = path.join(__dirname, 'node_modules');
if (fs.existsSync(nodeModulesPath)) {
    console.log('✅ Dependencies already installed');
} else {
    console.log('📦 Installing dependencies...');
    const { execSync } = require('child_process');
    try {
        execSync('npm install', { stdio: 'inherit' });
        console.log('✅ Dependencies installed successfully');
    } catch (error) {
        console.log('❌ Failed to install dependencies');
        console.log('Please run: npm install');
    }
}

console.log('\n📝 Next Steps:');
console.log('1. Edit .env file with your configuration');
console.log('2. Start MongoDB: mongod');
console.log('3. Run the application: npm start');
console.log('4. Open http://localhost:3000 in your browser');

console.log('\n🔧 Required Environment Variables:');
console.log('- DATABASE_URL: MongoDB connection string');
console.log('- SECRET_KEY: JWT secret key');
console.log('- EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS: Email configuration');
console.log('- Base_Url: Application base URL');
console.log('- Adminuser, Adminpass: Admin credentials');

console.log('\n📚 For more information, see README.md');

rl.close(); 