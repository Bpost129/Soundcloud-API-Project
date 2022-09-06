const express = require('express')

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Album, Comment, Song, Playlist } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Get all songs of an artist from an id ----------------------
router.get('/:artistId/songs', async (req, res, next) => {
    const { artistId } = req.params
    const user = await User.findOne({
        where: {
            id: artistId
        }
    })

    if (!user) {
        res.status = 404;
        res.json({
            "message": "Artist couldn't be found",
            "statusCode": 404
        })
    }

    // user = user.toJSON();

    const songs = await Song.findAll({
        where: {
            userId: artistId
        }
    })

    const songList = [];
    for (let song of songs) {
        songList.push(song.toJSON())
    }

    return res.json(songList);
})


// Get all albums from an artist by id ------------------------
router.get('/:artistId/albums', async (req, res, next) => {
    const { artistId } = req.params
    const user = await User.findOne({
        where: {
            id: artistId
        }
    })

    if (!user) {
        res.status = 404;
        res.json({
            "message": "Artist couldn't be found",
            "statusCode": 404
        })
    }

    const albums = await Album.findAll({
        where: {
            userId: artistId
        }
    })

    const albumList = [];
    for (let album of albums) {
        albumList.push(album.toJSON())
    }

    res.json(albumList);
})

// Get all playlists of an artist from an id -----------------------
router.get('/:artistId/playlists', async (req, res, next) => {
    const { artistId } = req.params
    const user = await User.findOne({
        where: {
            id: artistId
        }
    })

    if (!user) {
        res.status = 404;
        res.json({
            "message": "Artist couldn't be found",
            "statusCode": 404
        })
    }

    // user = user.toJSON();

    const playlists = await Playlist.findAll({
        where: {
            userId: artistId
        }
    })

    const playlistArr = [];
    for (let playlist of playlists) {
        playlistArr.push(playlist.toJSON())
    }

    res.json(playlistArr);
})

// Get details of an artist from an id ------------------------------ ** adjust query params
router.get('/:artistId', restoreUser, async (req, res, next) => {
    let { artistId } = req.params;

    let user = await User.findOne({
        where:{
            id: artistId
        },
        include: [
            {
                model: Song
            },
            {
                model: Album
            },
            {
                model: Playlist
            }
        ]
    })

    if (!user) {
        res.status = 404;
        res.json({
            "message": "Artist couldn't be found",
            "statusCode": 404
        })
    }

    user = user.toJSON();

    res.json(user);
})

module.exports = router;