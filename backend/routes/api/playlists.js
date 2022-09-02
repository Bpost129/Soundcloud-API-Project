const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Album, Song, User, Comment, Playlist } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Get all playlists of an artist from an id
router.get('/artists/:artistId/playlists', async (req, res, next) => {
    const { userId } = req.params.artistId
    const playlists = await Playlist.findAll({
        where: {
            userId
        }
    })

    const playlistArr = [];
    for (let playlist of playlists) {
        playlistArr.push(playlist.toJSON())
    }

    res.json(playlistArr);
})

// Get details of a playlist based on id
router.get('/:playlistId', async (req, res, next) => {
    const { id } = req.params.playlistId
    const playlist = await Playlist.findOne({
        where: {
            id
        }
    })
    res.json(playlist);
})

// Create a playlist
router.post('/', requireAuth, async (req, res, next) => {
    // Requires Authentication
    const { title, description, imageUrl } = req.body;

    const album = Album.create({
        title,
        description,
        imageUrl,
    })

    // album[0].toJSON()

    res.json(album);
})

// Add a song based on playlist id
router.post('/:playlistId/songs', requireAuth, async (req, res, next) => {
    // Requires Authentication


})

// Edit a playlist
router.put('/:playlistId', requireAuth, async (req, res, next) => {
    // Requires Authentication
    const { id } = req.params.playlistId
    const { name, imageUrl } = req.body
    const playlist = await Playlist.findOne({
        where: {
            id
        }
    })

    playlist.name = name;
    playlist.imageUrl = imageUrl;

    res.json(playlist);
})

// Delete a playlist
router.delete('/:playlistId', requireAuth, async (req, res, next) => {
    // Requires Authentication
    const { id } = req.params.playlistId;
    const playlist = await Playlist.findOne({
        where: {
            id
        }
    })

    playlist.destroy();
})

// Get all playlists from the current user
router.get('/current', requireAuth, async (req, res, next) => {
    // Requires Authentication
    const userId = req.user.id

    const playlists = await Playlist.findAll({
       where: {
        attributes: {
            userId,
        }
       }
    })

    const playlistArr = [];
    for (let playlist of playlists) {
        playlistArr.push(playlist.toJSON())
    }

    res.json(playlistArr);
})



module.exports = router;