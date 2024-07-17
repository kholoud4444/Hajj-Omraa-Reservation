const User = require('../models/user-model')
const jwt = require('jsonwebtoken');
const secretKey = 'secret_key';
//login user
checkUserAuth = async (req, res) => {
    const { username, password } = req.body;
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'username and password are required!',
        })
    }
    User.findOne({ username: username, password: password }, (err, user) => {
        if (err || !user) {
            return res.status(401).json({
                err,
                message: 'User is Unauthorized!',
            })
        } else {
            const token = jwt.sign({ userId: user._id, email: user.email }, secretKey, { expiresIn: '1h' });
            return res.status(200).json({
                success: true,
                id: user._id,
                email: user.email,
                token,
                message: 'User is authorized!',
            })
        }
    })
}
//register user
registerUser = async (req, res) => {
    const { username, password, email, phone } = req.body;

    try {
        // Check if the username already exists
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ success: false, error: 'Username already exists' });
        }

        // Create a new user
        const newUser = new User({ username, password, email, phone });
        await newUser.save();

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user: { id: newUser._id, username: newUser.username }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: 'User registration failed' });
    }
};

checkServiceRunning = (req, res) => {
    res.send('Hello World! - from users service');
}

module.exports = {
    checkUserAuth,
    checkServiceRunning,
    registerUser
}