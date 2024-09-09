const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');
const Director = require('../models/Director');
const authenticateJWT = require('../controllers/JWTController');

router.post('/', authenticateJWT, async (req, res) => {
    try {
        const { name, bio } = req.body;
        const newDirector = await Director.create({name,bio});
        if (!newDirector) {
            return res.status(400).json({ error: 'Error creating new director!' });
        }

        return res.json({ newDirector });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});

router.put('/:id', authenticateJWT, async (req, res) => {
    try {
        const id = req.params.id;
        const { name,bio} = req.body;
        console.log("ID :: ",id);
        const existingDirector = await Director.findByPk(id);
        console.log("Director :: ",existingDirector);
        if (!existingDirector) {
            return res.status(404).json({ error: 'User not found' });
        }

        await Director.update({
            name,
            bio
        },{
            where: {id}
        })

        return res.json({ message: 'Director updated successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});
router.delete('/:id', authenticateJWT, async (req, res) => {
    try {
        const existingDirector = await Director.findByPk(req.params.id);
        if (!existingDirector) {
            return res.status(404).json({ error: 'Director not found' });
        }
        await existingDirector.destroy();
        return res.json({ message: 'Director deleted successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});
router.get('/',async (req,res)=>{
    try{
        const allDirectors=await Director.findAll();
        if(!allDirectors){
            return res.status(401).send('directors not found !')
        }
        return res.status(200).json({allDirectors})
    }
    catch (error){
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
})
router.get('/:id',async (req,res)=>{
    try{
        const director=await Director.findByPk(req.params.id)
        if(!director){
            return res.status(404).send("director not found !")
        }
        return res.status(200).json({director})
    }
    catch (error){
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
})

module.exports = router;











module.exports=router