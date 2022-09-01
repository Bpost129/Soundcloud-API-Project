const express = require('express')

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Create a song
router.post('/', async (req, res, next) => {
    // Requires Authentication

})

// Edit a song
router.put('/:songId', async (req, res, next) => {
    // Requires Authentication

})

// Delete a song
router.delete('/:songId', async (req, res, next) => {
    // Requires Authentication

})

// Create a comment based on song id
router.post('/:songId/comments', async (req, res, next) => {
    // Requires Authentication

})





module.exports = router;