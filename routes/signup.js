const express=require('express')
const bcrypt=require('bcrypt')
const router=express.Router()
const User=require('../models/User')

router.post('/', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const userExists = await User.count({ where: { email } });
        if (userExists) {
            return res.status(400).json({ error: 'This email already exists' });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            email,
            password: hashPassword,
        });

        return res.status(201).json({ message: 'User created successfully', newUser });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports=router