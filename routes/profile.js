const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');
const authenticateJWT=require('../controllers/JWTController')

router.get('/:id', authenticateJWT, async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/:id', authenticateJWT, async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const { username, email } = req.body;
        user.username = username || user.username;
        user.email = email || user.email;
        await user.save();
        res.json({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.delete('/:id', authenticateJWT, async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        await user.destroy();
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});










module.exports=router