const mongoose = require('mongoose');
require('dotenv').config();
const jobs = require('./src/models/jobs');

const MONGO_URI = process.env.DATABASE_URL || 'mongodb://localhost:27017/job_fiction';

async function insertSampleJob() {
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  const sampleJob = {
    id: Math.floor(Math.random() * 100000),
    company: 'Sample Company',
    job_title: 'Software Engineer',
    role: 'Develop and maintain web applications',
    experience: 2,
    skills: ['JavaScript', 'Node.js', 'MongoDB'],
    industry_type: 'IT',
    employment_type: 'Full-time',
    perk: ['Health Insurance', 'Remote Work'],
    salary: 600000,
    location: 'Gandhinagar',
    last_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    degree: 'B.Tech',
    work_mode: 'Hybrid',
    company_email: 'hr@samplecompany.com',
    profile: 'https://samplecompany.com/profile.png',
  };

  try {
    await jobs.create(sampleJob);
    console.log('✅ Sample job inserted successfully!');
  } catch (err) {
    console.error('❌ Failed to insert sample job:', err.message);
  } finally {
    await mongoose.disconnect();
  }
}

insertSampleJob(); 