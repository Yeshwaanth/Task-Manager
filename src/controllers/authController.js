const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/env');

exports.register = async (req, res) => {
    const { error } = registerSchema.validate(req.body)
    if (error) return res.status(400).json({ message: error.details[0].message })
    try {
        const user = await User.create(req.body);
        res.status(201).json({ message: "User registered", user });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
        { userId: user._id },
        jwtSecret,
        { expiresIn: "1d" }
    );

    res.json({ token });
}