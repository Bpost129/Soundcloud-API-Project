const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Album, Song, User, Comment, Playlist } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Edit a comment -------------------------- **
router.put('/:commentId', requireAuth, async (req, res, next) => {
    // Requires Authentication
    const { commentId } = req.params
    const { body } = req.body

    const comment = await Comment.findOne({
        where: {
            id: commentId
        }
    })

    if (!body) {
        res.status = 400;
        res.json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
                "body": "Comment body text is required"
            }
        })
    }

    if (!comment) {
        res.status = 404;
        res.json({
            "message": "Comment couldn't be found",
            "statusCode": 404
        })
    }

    // body = body.toJSON();
    comment.body = body;

    res.json(comment);
})

// Delete a comment -------------------------
router.delete('/:commentId', requireAuth, async (req, res, next) => {
    // Requires Authentication
    const { commentId } = req.params
    const comment = await Comment.findOne({
        where: {
            id: commentId
        }
    })

    if (!comment) {
        res.status = 404;
        res.json({
            "message": "Comment couldn't be found",
            "statusCode": 404
        })
    }

    comment.destroy();
    res.json({
        "message": "Succefully deleted",
        "statusCode": 200
    })
})

module.exports = router;