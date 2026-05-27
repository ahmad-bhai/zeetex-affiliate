// app.js - Backend
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
app.use(express.json());

// MongoDB connection (Replace with your URI)
mongoose.connect('mongodb://localhost:27017/zeetex_affiliate');

const UserSchema = new mongoose.Schema({ email: { type: String, unique: true }, password: String });
const User = mongoose.model('User', UserSchema);

app.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: "This Email ID is already Registered" });
    
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ email, password: hashedPassword });
    res.status(201).json({ message: "Success" });
});

app.listen(3000, () => console.log('Zeetex Backend Running...'));
