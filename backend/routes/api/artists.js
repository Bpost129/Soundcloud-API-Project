const express = require('express')

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Album, Comment, Song, Playlist } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Get details of an artist from an id
router.get('/:artistId', async (req, res, next) => {
    let { userId } = req.params;

    let user = await User.findOne({
        where: {
            id: userId
        }
    })

    user = user.toJSON();

    res.json(user);
})

// Get all songs of an artist from an id
router.get('/:artistId/songs', async (req, res, next) => {
    const { userId } = req.params
    const user = await User.findOne({
        where: {
            id: userId
        }
    })

    user = user.toJSON();

    // const songList = [];
    // for (let song of songs) {
    //     songList.push(song.toJSON())
    // }

    return res.json(user);
})

// Get all playlists of an artist from an id
router.get('/:artistId/playlists', async (req, res, next) => {
    const { userId } = req.params
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


module.exports = router;