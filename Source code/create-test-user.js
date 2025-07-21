#!/usr/bin/env node

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();

// Import the Register model
const Register = require("./src/models/jobseekers");

async function createTestUser() {
    try {
        console.log('🔧 Creating Test User...');
        
        // Check if test user already exists
        const existingUser = await Register.findOne({ email: 'test@jobfiction.com' });
        if (existingUser) {
            console.log('✅ Test user already exists');
            console.log('📧 Email: test@jobfiction.com');
            console.log('🔑 Password: Test123!@#');
            console.log('✅ User is verified and ready to login');
            return;
        }

        // Create test user data
        const testUserData = {
            name: 'Test User',
            email: 'test@jobfiction.com',
            password: 'Test123!@#',
            number: '1234567890',
            gender: 'male',
            DOB: '1990-01-01',
            experience: 2,
            token: 'test-token',
            verified: true, // Set to true for development
            profile: '/images/default-profile.png',
            project: 'Test Project',
            class12: 'Test School',
            class10: 'Test School',
            college: 'Test College',
            highest_edu: 'Bachelor',
            field: 'Computer Science',
            language_skills: ['English', 'Hindi'],
            technical_skills: ['JavaScript', 'Node.js', 'MongoDB']
        };

        // Hash the password
        const hashedPassword = await bcrypt.hash(testUserData.password, 10);
        testUserData.password = hashedPassword;

        // Create JWT token
        const token = jwt.sign({ _id: 'test-id', flag: false }, process.env.SECRET_KEY || 'fallback-secret');
        testUserData.token = token;

        // Save user to database
        const newUser = new Register(testUserData);
        await newUser.save();

        console.log('✅ Test user created successfully!');
        console.log('📧 Email: test@jobfiction.com');
        console.log('🔑 Password: Test123!@#');
        console.log('✅ User is verified and ready to login');
        console.log('\n🌐 You can now login at: http://localhost:3000/login');

    } catch (error) {
        console.error('❌ Error creating test user:', error);
        
        if (error.code === 11000) {
            console.log('ℹ️  Test user already exists');
        } else {
            console.log('💡 Make sure MongoDB is running and .env file is configured');
        }
    }
}

// Run the script
createTestUser().then(() => {
    process.exit(0);
}).catch((error) => {
    console.error('❌ Script failed:', error);
    process.exit(1);
}); 