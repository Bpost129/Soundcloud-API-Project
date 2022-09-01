const express = require('express')

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Create a playlist
router.post('/', async (req, res, next) => {
    // Requires Authentication

})

// Add a song based on playlist id
router.post('/:playlistId/songs', async (req, res, next) => {
    // Requires Authentication

})

// Edit a playlist
router.put('/:playlistId', async (req, res, next) => {
    // Requires Authentication

})

// Delete a playlist
router.delete('/:playlistId', async (req, res, next) => {
    // Requires Authentication
    
})

// Get all playlists from the current user
router.get('/current', async (req, res, next) => {
    // Requires Authentication

})



module.exports = router;