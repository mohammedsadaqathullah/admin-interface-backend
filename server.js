const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors());
app.use(express.json());

// Mongoose Schema and Model
const userSchema = new mongoose.Schema({
    _id: String,
    profile: String,
    jobRole: String,
    experience: String,
    workLocation: String,
    salaryLPA: String,
    descriptionOne: String,
    descriptionTwo: String,
    __v: Number,
    jobs: Array,
});
const User = mongoose.model('User', userSchema);

// Default Users Data
const defaultUsers = [
    {
        "_id": "677ad7cef5e186356ad5672c",
        "profile": "http://localhost:5000/profile1.png",
        "jobRole": "Full Stack Developer",
        "experience": "1-3 yr Exp",
        "workLocation": "Onsite",
        "salaryLPA": "12LPA",
        "descriptionOne": "A user-friendly interface lets you browse stunning photos and videos",
        "descriptionTwo": "Filter destinations based on interests and travel style, and create personalized",
        "__v": 0,
        "jobs": []
    },
    {
        "_id": "677ad7cef5e186356ad5672d",
        "profile": "http://localhost:5000/profile2.png",
        "jobRole": "Node Js Developer",
        "experience": "1-3 yr Exp",
        "workLocation": "Onsite",
        "salaryLPA": "12LPA",
        "descriptionOne": "A user-friendly interface lets you browse stunning photos and videos",
        "descriptionTwo": "Filter destinations based on interests and travel style, and create personalized",
        "__v": 0,
        "jobs": []
    },
    {
        "_id": "677ad7cef5e186356ad5672e",
        "profile": "http://localhost:5000/profile3.png",
        "jobRole": "UX/UI Designer",
        "experience": "1-3 yr Exp",
        "workLocation": "Onsite",
        "salaryLPA": "12LPA",
        "descriptionOne": "A user-friendly interface lets you browse stunning photos and videos",
        "descriptionTwo": "Filter destinations based on interests and travel style, and create personalized",
        "__v": 0,
        "jobs": []
    },
    {
        "_id": "677ad7cef5e186356ad5672f",
        "profile": "http://localhost:5000/profile4.png",
        "jobRole": "Full Stack Developer",
        "experience": "1-3 yr Exp",
        "workLocation": "Onsite",
        "salaryLPA": "12LPA",
        "descriptionOne": "A user-friendly interface lets you browse stunning photos and videos",
        "descriptionTwo": "Filter destinations based on interests and travel style, and create personalized",
        "__v": 0,
        "jobs": []
    },
    {
        "_id": "677ad7cef5e186356ad56730",
        "profile": "http://localhost:5000/profile5.png",
        "jobRole": "Node Js Developer",
        "experience": "1-3 yr Exp",
        "workLocation": "Onsite",
        "salaryLPA": "12LPA",
        "descriptionOne": "A user-friendly interface lets you browse stunning photos and videos",
        "descriptionTwo": "Filter destinations based on interests and travel style, and create personalized",
        "__v": 0,
        "jobs": []
    },
    {
        "_id": "677ad7cef5e186356ad56731",
        "profile": "http://localhost:5000/profile6.png",
        "jobRole": "UX/UI Designer",
        "experience": "1-3 yr Exp",
        "workLocation": "Onsite",
        "salaryLPA": "12LPA",
        "descriptionOne": "A user-friendly interface lets you browse stunning photos and videos",
        "descriptionTwo": "Filter destinations based on interests and travel style, and create personalized",
        "__v": 0,
        "jobs": []
    },
    {
        "_id": "677ad7cef5e186356ad56732",
        "profile": "http://localhost:5000/profile7.png",
        "jobRole": "Full Stack Developer",
        "experience": "1-3 yr Exp",
        "workLocation": "Onsite",
        "salaryLPA": "12LPA",
        "descriptionOne": "A user-friendly interface lets you browse stunning photos and videos",
        "descriptionTwo": "Filter destinations based on interests and travel style, and create personalized",
        "__v": 0,
        "jobs": []
    },
    {
        "_id": "677ad7cef5e186356ad56733",
        "profile": "http://localhost:5000/profile8.png",
        "jobRole": "Node Js Developer",
        "experience": "1-3 yr Exp",
        "workLocation": "Onsite",
        "salaryLPA": "12LPA",
        "descriptionOne": "A user-friendly interface lets you browse stunning photos and videos",
        "descriptionTwo": "Filter destinations based on interests and travel style, and create personalized",
        "__v": 0,
        "jobs": []
    }
];

// Load Default Data into MongoDB
const loadDefaultData = async () => {
    try {
        console.log('Checking for existing data...');
        await User.deleteMany(); // Clear all existing data
        await User.insertMany(defaultUsers); // Insert default data
        console.log('Default data loaded into MongoDB');
    } catch (error) {
        console.error('Error loading default data:', error.message);
    }
};

// Connect to MongoDB and Start Server
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        loadDefaultData();
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => console.error('Error connecting to MongoDB:', error.message));

// Endpoint to Fetch Users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users', details: error.message });
    }
});

// POST Endpoint to Add New User
app.post('/users', async (req, res) => {
    const { _id, profile, jobRole, experience, workLocation, salaryLPA, descriptionOne, descriptionTwo, jobs } = req.body;

    if (!_id || !profile || !jobRole || !experience || !workLocation || !salaryLPA || !descriptionOne || !descriptionTwo) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const newUser = new User({
            _id,
            profile,
            jobRole,
            experience,
            workLocation,
            salaryLPA,
            descriptionOne,
            descriptionTwo,
            jobs
        });

        await newUser.save();
        res.status(201).json({ message: 'User added successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add user', details: error.message });
    }
});


