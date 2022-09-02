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

    res.json(songs);
})

// Get all songs created by the current user
router.get('/current', requireAuth, async (req, res, next) => {
    // Requires Authentication
    // const { current } = req.query;
    // const id = current.id;
    const userId = req.user.id

    const songs = await Song.findAll({
       where: {
        attributes: {
            userId,
        }
       }
    })

    const songList = [];
    for (let song of songs) {
        songList.push(song.toJSON())
    }

    res.json(songList);
})

// Get all songs of an artist from an id
router.get('/artists/:artistId/songs', async (req, res, next) => {
    const { userId } = req.params.artistId
    const songs = await Song.findAll({
        where: {
            userId
        }
    })

    const songList = [];
    for (let song of songs) {
        songList.push(song.toJSON())
    }

    res.json(songList);
})

// Get details of a song from an id
router.get('/:songId', async (req, res, next) => {
    const { id } = req.params.songId
    const song = await Song.findOne({
        where: {
            id
        }
    })
    res.json(song);
})

// Create a song
router.post('/', requireAuth, async (req, res, next) => {
    // Requires Authentication
    const { title, description, url, imageUrl } = req.body;

    const song = Song.create({
        title,
        description,
        url,
        imageUrl,
    })

    song = song.toJSON();

    res.json(song);
})

// Create a song based on album id
router.post('/', requireAuth, async (req, res, next) => {
    // Requires Authentication
    const { albumId } = req.album.id
    const { title, description, url, imageUrl } = req.body;

    const song = Song.create({
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
    const { id } = req.params.songId
    const { title, description, url, imageUrl } = req.body
    const song = await Song.findOne({
        where: {
            id
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

// Create a comment based on song id
router.post('/:songId/comments', requireAuth, async (req, res, next) => {
    // Requires Authentication

})





module.exports = router;