const jobs = require("../models/jobs");
const Register = require("../models/jobseekers");
const jwt = require("jsonwebtoken");
module.exports = {

    get:async (req,res)=>{
        try {
            const data = await jobs.find().limit(10);
            const defaultJobTitles = await jobs.distinct('job_title');
            const defaultWorkModes = await jobs.distinct('work_mode');
            const defaultLocations = await jobs.distinct('location');
            
            if(req.cookies.jwt){
                jwt.verify(req.cookies.jwt, process.env.SECRET_KEY, async(err, decoded) => {
                    if(err) {
                        console.error('JWT verification error:', err);
                        return res.status(400).send('<script>alert("Session expired. Please login again."); window.location = "/login";</script>');
                    } else {
                        try {
                            const check = await Register.findOne({_id: decoded._id});
                            if (!check) {
                                return res.status(400).send('<script>alert("User not found. Please login again."); window.location = "/login";</script>');
                            }
                            
                            const profile = check.profile;
                            const name = check.name;
                            
                            console.log('✅ Home page loaded for user:', name);
                            res.render("home.hbs", {
                                profile, 
                                data: data, 
                                logged: true,
                                defaultJobTitles: defaultJobTitles, 
                                defaultLocations: defaultLocations, 
                                defaultWorkModes: defaultWorkModes,
                                name
                            });
                        } catch (dbError) {
                            console.error('Database error:', dbError);
                            return res.status(500).send('<script>alert("Database error. Please try again."); window.location = "/login";</script>');
                        }
                    }
                });
            } else {
                console.log('📄 Home page loaded for guest user');
                res.render("home.hbs", {
                    data: data,
                    defaultJobTitles: defaultJobTitles, 
                    defaultLocations: defaultLocations, 
                    defaultWorkModes: defaultWorkModes
                });
            }
        } catch (error) {
            console.error('Home controller error:', error);
            res.status(500).send('<script>alert("Server error. Please try again."); window.location = "/";</script>');
        }
    },
}