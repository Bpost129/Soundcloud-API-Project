const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Album, Song, User, Comment, Playlist } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Get all albums
router.get('/', async (req, res, next) => {
    const albums = await Album.findAll()
    const albumsList = [];
    albums.forEach(album => {
        albumsList.push(toJSON(album))
    });
    res.json(albumsList);
})

// Get all albums created by the user
router.get('/current', requireAuth, async (req, res, next) => {
    // Requires Authentication
    const userId = req.user.id

    const albums = await Album.findAll({
       where: {
        attributes: {
            userId,
        }
       }
    })

    const albumList = [];
    for (let album of albums) {
        albumList.push(album.toJSON())
    }

    res.json(albumList);
})

// Get all albums from an artist by id
router.get('/artists/:artistId/albums', async (req, res, next) => {
    const { userId } = req.params.artistId
    const albums = await Album.findAll({
        where: {
            userId
        }
    })

    const albumList = [];
    for (let album of albums) {
        albumList.push(album.toJSON())
    }

    res.json(albumList);
})

// Get details of an album by its id
router.get('/:albumId', async (req, res, next) => {
    const { id } = req.params.albumId
    const album = await Album.findOne({
        where: {
            id
        }
    })
    res.json(album);
})

// Create an album
router.post('/', restoreUser, requireAuth, async (req, res, next) => {
    // Requires Authentication
    const { title, description, imageUrl } = req.body;

    const album = await Album.create({
        title,
        description,
        imageUrl,
    })
    album = toJSON(album);
    // album[0].toJSON()

    res.json(album);
})

// Edit an album
router.put('/:albumId', requireAuth, async (req, res, next) => {
    // Requires Authentication
    const { id } = req.params.albumId
    const { title, description, imageUrl } = req.body
    const album = await Album.findOne({
        where: {
            id
        }
    })

    album.title = title;
    album.description = description;
    album.imageUrl = imageUrl;

    res.json(album);
})

// Delete an album
router.delete('/:albumId', requireAuth, async (req, res, next) => {
    // Requires Authentication
    const { id } = req.params.albumId;
    const album = await Album.findOne({
        where: {
            id
        }
    })

    album.destroy();

})




module.exports = router;