#!/usr/bin/env node

const { sendEmail, verifySMTP } = require('./src/services/mailer');
require('dotenv').config();

async function testEmailConfiguration() {
    console.log('📧 Email Configuration Test');
    console.log('============================\n');

    // Check environment variables
    console.log('🔍 Checking environment variables:');
    console.log('EMAIL_HOST:', process.env.EMAIL_HOST || '❌ Not set');
    console.log('EMAIL_PORT:', process.env.EMAIL_PORT || '❌ Not set');
    console.log('EMAIL_USER:', process.env.EMAIL_USER || '❌ Not set');
    console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '✅ Set' : '❌ Not set');
    console.log('NODE_ENV:', process.env.NODE_ENV || 'development');
    console.log('');

    // Test SMTP connection
    console.log('🔌 Testing SMTP connection...');
    try {
        const isVerified = await verifySMTP();
        if (isVerified) {
            console.log('✅ SMTP connection successful!');
        } else {
            console.log('❌ SMTP connection failed');
        }
    } catch (error) {
        console.log('❌ SMTP test error:', error.message);
    }
    console.log('');

    // Test email sending
    console.log('📤 Testing email sending...');
    try {
        const testEmail = process.env.EMAIL_USER || 'test@example.com';
        const result = await sendEmail(
            testEmail,
            'Job Fiction - Email Test',
            `
            <h2>Email Test Successful!</h2>
            <p>This is a test email from Job Fiction application.</p>
            <p>If you received this, your email configuration is working correctly.</p>
            <p>Time: ${new Date().toLocaleString()}</p>
            `
        );
        console.log('✅ Email test completed');
        console.log('Message ID:', result.messageId);
    } catch (error) {
        console.log('❌ Email test failed:', error.message);
        
        if (process.env.NODE_ENV === 'development') {
            console.log('🔧 In development mode, emails are logged instead of sent');
        }
    }
    console.log('');

    // Configuration guide
    console.log('📋 Email Configuration Guide:');
    console.log('============================');
    console.log('');
    console.log('For Gmail:');
    console.log('1. Enable 2-Factor Authentication on your Google account');
    console.log('2. Generate an App Password:');
    console.log('   - Go to Google Account settings');
    console.log('   - Security > 2-Step Verification > App passwords');
    console.log('   - Generate password for "Mail"');
    console.log('3. Use the App Password in EMAIL_PASS');
    console.log('');
    console.log('For other providers:');
    console.log('- Check your email provider\'s SMTP settings');
    console.log('- Use appropriate host and port');
    console.log('- Some providers require specific security settings');
    console.log('');
    console.log('Example .env configuration:');
    console.log('EMAIL_HOST=smtp.gmail.com');
    console.log('EMAIL_PORT=587');
    console.log('EMAIL_USER=your-email@gmail.com');
    console.log('EMAIL_PASS=your-app-password');
    console.log('');
}

// Run the test
testEmailConfiguration().then(() => {
    console.log('🏁 Email configuration test completed');
    process.exit(0);
}).catch((error) => {
    console.error('❌ Test failed:', error);
    process.exit(1);
}); 