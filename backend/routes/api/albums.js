const express = require('express')

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Get all albums created by the user
router.get('/current', async (req, res, next) => {
    // Requires Authentication

})

// Create an album
router.post('/', async (req, res, next) => {
    // Requires Authentication

})

// Edit an album
router.put('/:albumId', async (req, res, next) => {
    // Requires Authentication

})

// Delete an album
router.delete('/:albumId', async (req, res, next) => {
    // Requires Authentication
    
})




module.exports = router;