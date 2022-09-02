const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Album, Song, User, Comment, Playlist } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Get all comments of a song by its id
router.get('/songs/:songId/comments', async (req, res, next) => {
    const { id } = req.params.songId
    const comments = await Comment.findAll({
        include: {
            model: {
                Song,
                where: {
                    attributes: {
                        id
                    }
                }
            }
        }
    })

    let commentList = [];
    comments.forEach(comment => {
        commentList.push(toJSON(comment))
    })

    res.json(commentList);
})

// Create a comment for a song based on its id
router.post('/songs/:songId/comments', async (req, res, next) => {
    const { id } = req.params.songId
    const { body } = req.body;

    const song = await Song.findOne({
        where: {
            attributes: {
                id
            }
        }
    })

})

// Edit a comment
router.put('/:commentId', requireAuth, async (req, res, next) => {
    // Requires Authentication
    const { id } = req.params.commentId
    const { body } = req.body
    const comment = await Comment.findOne({
        where: {
            id
        }
    })

    comment.body = body;

    res.json(comment);
})

// Delete a comment
router.delete('/:commentId', requireAuth, async (req, res, next) => {
    // Requires Authentication
    const { id } = req.params.commentId;
    const comment = await Comment.findOne({
        where: {
            id
        }
    })

    comment.destroy();
})



module.exports = router;