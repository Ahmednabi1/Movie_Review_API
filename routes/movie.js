const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const authenticateJWT = require('../controllers/jwtController');
const multer = require('multer');
const path = require('path');
const Director=require('../models/Director')
const Genre=require('../models/Genre')
const { Op } = require('sequelize');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Set the filename
    }
});

const upload = multer({ storage: storage });


router.post('/', authenticateJWT, upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'gallery', maxCount: 10 }
]), async (req, res) => {
    try {
        const { title, description, releaseDate, directorId, genreId } = req.body;
        const thumbnail = req.files['thumbnail'] ? req.files['thumbnail'][0].filename : null;
        const galleryImages = req.files['gallery'] ? req.files['gallery'].map(file => file.filename) : [];

        const newMovie = await Movie.create({
            title,
            description,
            releaseDate,
            directorId,
            genreId,
            thumbnail,
            gallery: galleryImages
        });

        if (!newMovie) {
            return res.status(400).json({ error: 'Error creating new movie!' });
        }

        return res.status(201).json(newMovie);
    } catch (error) {
        console.error('Error creating movie:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/', async (req, res) => {
    const whereClause = {};

    try {
        if (req.query.title) {
            whereClause.title = req.query.title;
        }

        if (req.query.director) {
            const director = await Director.findOne({
                where: { name: { [Op.like]: `%${req.query.director}%` } }
            });
            if (director) {
                whereClause.directorId = director.id;
            } else {
                return res.status(404).json({ error: 'Director not found' });
            }
        }

        if (req.query.genre) {
            const genre = await Genre.findOne({
                where: { name: { [Op.like]: `%${req.query.genre}%` } }
            });
            if (genre) {
                whereClause.genreId = genre.id;
            } else {
                return res.status(404).json({ error: 'Genre not found' });
            }
        }

        const movies = await Movie.findAll({
            where: whereClause,
        });

        return res.status(200).json({ movies });
    } catch (error) {
        console.error('Error fetching movies:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findByPk(id);
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        await movie.destroy();
        return res.status(200).json({ message: 'Movie deleted successfully' });
    } catch (error) {
        console.error('Error deleting movie:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findByPk(id);
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        return res.status(200).json(movie);
    } catch (error) {
        console.error('Error fetching movie details:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



module.exports = router;
