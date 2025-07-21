const Register = require("../models/jobseekers");
const emailValidator = require('email-validator');
const bcrypt = require("bcryptjs");
const express = require("express");
const app = express()
const cookieParser=require("cookie-parser");
const jobs = require("../models/jobs");
app.use(cookieParser());

module.exports = {

    get:async (req,res)=>{


        if(req.cookies.jwt){
            res.redirect("/home");
        }
        else
        res.render("login.hbs");

    },
    post: async(req,res)=>{
        try{
            // console.log(req.body)
            const { password, email } = req.body;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const emailRegexNotupper = /^[^A-Z]+@[^\s@]+\.[^\s@]+$/;
            const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?!.*\s).{8,15}$/;
            
            // Input validation
            if (!email) {
                return res.status(400).send('<script>alert("Email is required"); window.location = "/login";</script>');
            }
            if (!password) {
                return res.status(400).send('<script>alert("Password is required"); window.location = "/login";</script>');
            }
            if (!emailRegexNotupper.test(email)) {
                return res.status(400).send('<script>alert("Invalid email format. Uppercase letters are not allowed in the local part"); window.location = "/login";</script>');
            }
            if (!passwordPattern.test(password)) {
                return res.status(400).send('<script>alert("Invalid password. Please ensure it has at least 8 characters, at most 15 characters, at least one number, at least one uppercase letter, at least one lowercase letter, and at least one special character."); window.location = "/login";</script>');
            }
            if (!emailValidator.validate(email)) {
                return res.status(400).send('<script>alert("Invalid email format"); window.location = "/login";</script>');
            }
            if (!emailRegex.test(email)) {
                return res.status(400).send('<script>alert("Invalid email format"); window.location = "/login";</script>');
            }

            // Check if user exists
            const check = await Register.findOne({email: req.body.email});
            if (!check) {
                return res.status(400).send('<script>alert("User not found. Please check your email or register."); window.location = "/login";</script>');
            }

            // Development mode: Auto-verify users if not verified
            if (process.env.NODE_ENV === 'development' && !check.verified) {
                console.log('🔧 Development mode: Auto-verifying user');
                await Register.updateOne({ _id: check._id }, { verified: true });
                check.verified = true;
            }

            // Check if user is verified (only in production)
            if (process.env.NODE_ENV === 'production' && !check.verified) {
                return res.status(400).send('<script>alert("Please verify your email before logging in. Check your inbox for verification link."); window.location = "/login";</script>');
            }

            // Verify password
            const match = await bcrypt.compare(req.body.password, check.password);
            if(match) {
                console.log('✅ Login successful for:', email);
                res.cookie("jwt", check.token, {
                    maxAge: 1800000,
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict'
                });

                console.log('🔄 Redirecting to /home');
                return res.redirect("/home"); 
            } else {
                console.log('❌ Login failed: Incorrect password for:', email);
                return res.status(400).send('<script>alert("Incorrect Password or Email."); window.location = "/login";</script>');
            }
        }
        catch (error) {
            console.error("Login error:", error);
            return res.status(500).send('<script>alert("Server error. Please try again later."); window.location = "/login";</script>');
        }
    }
}