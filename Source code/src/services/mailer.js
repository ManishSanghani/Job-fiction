const nodemailer = require("nodemailer")
require('dotenv').config()

// Create transporter with better configuration
const createTransporter = () => {
    const config = {
        host: process.env.EMAIL_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.EMAIL_PORT) || 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false
        }
    };

    console.log('📧 SMTP Configuration:', {
        host: config.host,
        port: config.port,
        user: config.auth.user ? '***configured***' : '***missing***'
    });

    return nodemailer.createTransport(config);
};

const transporter = createTransporter();

// Verify SMTP connection
const verifySMTP = async () => {
    try {
        await transporter.verify();
        console.log('✅ SMTP connection verified successfully');
        return true;
    } catch (error) {
        console.error('❌ SMTP verification failed:', error.message);
        return false;
    }
};

async function sendEmail(toemail, sub, message) {
    try {
        // Check if email configuration is complete
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.error('❌ Email configuration missing. Check EMAIL_USER and EMAIL_PASS in .env file');
            throw new Error('Email configuration incomplete');
        }

        // Verify SMTP connection
        const isVerified = await verifySMTP();
        if (!isVerified) {
            throw new Error('SMTP connection failed');
        }

        const info = await transporter.sendMail({
            from: `"Job Fiction" <${process.env.EMAIL_USER}>`,
            to: toemail,
            subject: sub,
            html: message,
        });

        console.log('✅ Email sent successfully:', {
            to: toemail,
            subject: sub,
            messageId: info.messageId
        });

        return info;
    } catch (error) {
        console.error('❌ Email sending failed:', error.message);
        
        // In development mode, log the email content instead of failing
        if (process.env.NODE_ENV === 'development') {
            console.log('🔧 Development mode: Email content would be sent:');
            console.log('To:', toemail);
            console.log('Subject:', sub);
            console.log('Content:', message);
            return { messageId: 'dev-mode-simulated' };
        }
        
        throw error;
    }
}

module.exports = { sendEmail, verifySMTP };