const bcrypt = require('bcryptjs');
const User = require('../models/user'); 

// Register a new user
exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send("User already exists!");
        }
        
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create a new user
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();
        
        res.status(201).send("Registered successfully!");
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

// Log in an existing user
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send("Wrong email or password!");
        }
        
        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send("Wrong email or password!");
        }
        
        res.status(200).send("Logged in successfully!");
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};
