const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Album, Song, User, Comment, Playlist } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


// Get all songs
router.get('/', async (req, res, next) => {
    const songs = await Song.findAll()

    const songList = [];
    for (let song of songs) {
        songList.push(song.toJSON())
    }

    return res.json(songs);
})

// Get all songs created by the current user
router.get('/current', restoreUser, requireAuth, async (req, res, next) => {
    // Requires Authentication
    let { id } = req.user;

    let songs = await Song.findAll({
       where: {
        userId: id,
       }
    })

    let songList = [];
    for (let song of songs) {
        songList.push(song.toJSON())
    }

    return res.json(songList);
})

// Get details of a song from an id
router.get('/:songId', async (req, res, next) => {
    let { songId } = req.params
    
    let song = await Song.findOne({
        where: {
            id: songId,
        }
    })

    song = song.toJSON();
    return res.json(song);
})

// Create a song
router.post('/', restoreUser, requireAuth, async (req, res, next) => {
    // Requires Authentication
    let { id } = req.user;
    // let { albumId } = req.album.id;
    const { title, description, url, imageUrl, albumId } = req.body;

    // albumId = parseInt(albumId);

    let song = await Song.create({
        // albumId: id,
        // albumId,
        userId: id,
        albumId,
        title,
        description,
        url,
        imageUrl,
    })

    song = song.toJSON();

    res.json(song);
})

// Edit a song
router.put('/:songId', requireAuth, async (req, res, next) => {
    // Requires Authentication
    let { songId } = req.params
    let { title, description, url, imageUrl } = req.body
    let song = await Song.findOne({
        where: {
            id: songId,
        }
    })

    song.title = title;
    song.description = description;
    song.url = url;
    song.imageUrl = imageUrl;

    res.json(song);
})

// Delete a song
router.delete('/:songId', requireAuth, async (req, res, next) => {
    // Requires Authentication
    const { id } = req.params.songId;
    const song = await Song.findOne({
        where: {
            id
        }
    })

    song.destroy();
})

// Create a comment for a song based on its id
router.post('/:songId/comments', restoreUser, requireAuth, async (req, res, next) => {
    let { id } = req.user;
    let { songId } = req.params;
    let { body } = req.body;

    let comment = await Comment.create({ 
        userId: id, 
        songId, 
        body 
    });

    comment = comment.toJSON();

    return res.json(comment);
})

// Get all comments of a song by its id
router.get('/:songId/comments', async (req, res, next) => {
    const { songId } = req.params
    
    const comments = await Comment.findAll({
        where: {
            songId
        }
    })

    let commentList = [];
    comments.forEach(comment => {
        commentList.push(comment.toJSON())
    })

    res.json(commentList);
})


module.exports = router;