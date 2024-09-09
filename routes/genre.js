const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');
const Director = require('../models/Director');
const Genre=require('../models/Genre')
const authenticateJWT = require('../controllers/JWTController');

router.post('/',authenticateJWT,async (req,res)=>{
    try {
        const {name}=req.body
        const newGenre=await Genre.create({name})
        if(!newGenre){
            return res.send("error creating genre !")
        }
        return res.status(201).json(newGenre)
    }
    catch (error){
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
})
router.get('/', async (req, res) => {
    try {
        const allGenres = await Genre.findAll();
        return res.json(allGenres);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const genre = await Genre.findByPk(req.params.id);
        if (!genre) {
            return res.status(404).json({ error: 'Genre not found' });
        }
        return res.json(genre);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});


router.put('/:id', authenticateJWT, async (req, res) => {
    try {
        const { name } = req.body;
        const genre = await Genre.findByPk(req.params.id);
        if (!genre) {
            return res.status(404).json({ error: 'Genre not found' });
        }
        genre.name = name || genre.name;
        await genre.save();
        return res.json({ message: 'Genre updated successfully', updatedGenre: genre });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});
router.delete('/:id', authenticateJWT, async (req, res) => {
    try {
        const genre = await Genre.findByPk(req.params.id);
        if (!genre) {
            return res.status(404).json({ error: 'Genre not found' });
        }
        await genre.destroy();
        return res.json({ message: 'Genre deleted successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});


module.exports=router