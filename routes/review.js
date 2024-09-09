const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const authenticateJWT = require('../controllers/jwtController');
const multer = require('multer');
const path = require('path');
const Director=require('../models/Director')
const Genre=require('../models/Genre')
const { Op } = require('sequelize');
const Review=require('../models/Review')


router.post('/', authenticateJWT, async (req, res) => {
    const { rating, comment, movieId } = req.body;
    const userId = req.user.id;

    try {
        const movie = await Movie.findByPk(movieId);
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        const newReview = await Review.create({
            rating,
            comment,
            movieId,
            userId,
        });

        return res.status(201).json({ review: newReview });
    } catch (error) {
        console.error('Error creating review:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.put('/:id', authenticateJWT, async (req, res) => {
    const reviewId = req.params.id;
    const { rating, comment } = req.body;
    const userId = req.user.id;

    try {
        const review = await Review.findByPk(reviewId);
        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }
        if (review.userId !== userId) {
            return res.status(403).json({ error: 'You are not authorized to update this review' });
        }
        review.rating = rating !== undefined ? rating : review.rating;
        review.comment = comment !== undefined ? comment : review.comment;

        await review.save();

        return res.status(200).json({ review });
    } catch (error) {
        console.error('Error updating review:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.delete('/:id', authenticateJWT, async (req, res) => {
    const reviewId = req.params.id;
    const userId = req.user.id;

    try {
        const review = await Review.findByPk(reviewId);
        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }
        if (review.userId !== userId) {
            return res.status(403).json({ error: 'You are not authorized to delete this review' });
        }
        await review.destroy();
        return res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        console.error('Error deleting review:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.get('/:id', authenticateJWT, async (req, res) => {
    const reviewId = req.params.id;

    try {
        const review = await Review.findByPk(reviewId);

        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }

        return res.status(200).json({ review });
    } catch (error) {
        console.error('Error fetching review:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.get('/',authenticateJWT, async (req, res) => {
    const whereClause = {};

    try {
        if (req.query.rating) {
            whereClause.rating = req.query.rating;
        }

        if (req.query.movie) {
            const movie = await Movie.findOne({
                where: { title: { [Op.like]: `%${req.query.movie}%` } }
            });
            if (movie) {
                whereClause.movieId = movie.id;
            } else {
                return res.status(404).json({ error: 'Movie not found' });
            }
        }

        if (req.query.user) {
            const user = await User.findOne({
                where: { username: { [Op.like]: `%${req.query.user}%` } }
            });
            if (user) {
                whereClause.userId = user.id;
            } else {
                return res.status(404).json({ error: 'User not found' });
            }
        }

        const reviews = await Review.findAll({
            where: whereClause,
        });

        return res.status(200).json({ reviews });
    } catch (error) {
        console.error('Error fetching reviews:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports=router
