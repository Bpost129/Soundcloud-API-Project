const express = require('express')

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Edit a comment
router.put('/:commentId', async (req, res, next) => {
    // Requires Authentication

})

// Delete a comment
router.delete('/:commentId', async (req, res, next) => {
    // Requires Authentication

})



module.exports = router;