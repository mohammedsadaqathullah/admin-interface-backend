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
        "profile": "https://i.postimg.cc/hP5pL48n/amazonlogo.png",
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
        "profile": "https://i.postimg.cc/Yq9dLLW8/teslalogo.png",
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
        "profile": "https://i.postimg.cc/bYL6v9ss/swiggylogo.png",
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
        "profile": "https://i.postimg.cc/hP5pL48n/amazonlogo.png",
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
        "profile": "https://i.postimg.cc/Yq9dLLW8/teslalogo.png",
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
        "profile": "https://i.postimg.cc/bYL6v9ss/swiggylogo.png",
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
        "profile": "https://i.postimg.cc/hP5pL48n/amazonlogo.png",
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
        "profile": "https://i.postimg.cc/Yq9dLLW8/teslalogo.png",
        "jobRole": "Node Js Developer",
        "experience": "1-3 yr Exp",
        "workLocation": "Onsite",
        "salaryLPA": "12LPA",
        "descriptionOne": "A user-friendly interface lets you browse stunning photos and videos",
        "descriptionTwo": "Filter destinations based on interests and travel style, and create personalized",
        "__v": 0,
        "jobs": []
    },
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

// Endpoint to Add a User
app.post('/users', async (req, res) => {
    const { _id, profile, jobRole, experience, workLocation, salaryLPA, descriptionOne, descriptionTwo, jobs } = req.body;

    // Log the request body for debugging purposes
    console.log(req.body);

    // Check if required fields are missing
    if (!_id || !profile || !jobRole || !experience || !workLocation || !salaryLPA || !descriptionOne || !descriptionTwo) {
        return res.status(400).json({ error: 'Missing required fields', details: req.body });
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
        console.error('Error saving user:', error);  // Log the error
        res.status(500).json({ error: 'Failed to add user', details: error.message });
    }
});

// Endpoint to Update User by ID
app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { profile, jobRole, experience, workLocation, salaryLPA, descriptionOne, descriptionTwo, jobs } = req.body;

    try {
        // Validate input fields
        if (!profile && !jobRole && !experience && !workLocation && !salaryLPA && !descriptionOne && !descriptionTwo && !jobs) {
            return res.status(400).json({ error: 'No fields provided for update' });
        }

        // Find and update the user
        const updatedUser = await User.findByIdAndUpdate(
            id,
            {
                ...(profile && { profile }),
                ...(jobRole && { jobRole }),
                ...(experience && { experience }),
                ...(workLocation && { workLocation }),
                ...(salaryLPA && { salaryLPA }),
                ...(descriptionOne && { descriptionOne }),
                ...(descriptionTwo && { descriptionTwo }),
                ...(jobs && { jobs }),
            },
            { new: true } // Return the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user', details: error.message });
    }
});

// Endpoint to Delete User by ID
app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user', details: error.message });
    }
});
