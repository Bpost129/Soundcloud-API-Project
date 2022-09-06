const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Album, Song, User, Comment, Playlist } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Get all albums created by the user --------------------------
router.get('/current', requireAuth, async (req, res, next) => {
    // Requires Authentication
    let { id } = req.user;

    const albums = await Album.findAll({
        where: {
            userId: id
        }
    })

    const albumList = [];
    for (let album of albums) {
        albumList.push(album.toJSON())
    }

    res.json(albumList);
})

// Get details of an album by its id ------------------------
router.get('/:albumId', async (req, res, next) => {
    let { albumId } = req.params

    let album = await Album.findOne({
        where: {
            id: albumId
        },
        include: [
            {
                model: User,
                attributes: ['id', 'username', 'imageUrl']
            },
            {
                model: Song
            }
        ]
    })

    if (!album) {
        res.status = 404;
        res.json({
            "message": "Album couldn't be found",
            "statusCode": 404
        })
    }

    album = album.toJSON();
    res.json(album);
})



// Edit an album ----------------------------
router.put('/:albumId', requireAuth, async (req, res, next) => {
    // Requires Authentication
    const { albumId } = req.params
    const { title, description, imageUrl } = req.body
    const album = await Album.findOne({
        where: {
            id: albumId
        }
    })

    if (!title) {
        res.status = 400;
        res.json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
                "title": "Album title is required"
            }
        })
    }

    if (!album) {
        res.status = 404;
        res.json({
            "message": "Album couldn't be found",
            "statusCode": 404
        })
    }

    album.title = title;
    album.description = description;
    album.imageUrl = imageUrl;

    res.json(album);
})

// Delete an album ------------------------------
router.delete('/:albumId', requireAuth, async (req, res, next) => {
    // Requires Authentication
    const { albumId } = req.params;
    const album = await Album.findOne({
        where: {
            id: albumId
        }
    })

    if (!album) {
        res.status = 404;
        res.json({
            "message": "Album couldn't be found",
            "statusCode": 404
        })
    }

    album.destroy();
    res.json({
        "message": "Succefully deleted",
        "statusCode": 200
    })
})



// Get all albums -------------------------
router.get('/', async (req, res, next) => {
    const albums = await Album.findAll()

    const albumsList = [];
    albums.forEach(album => {
        albumsList.push(album.toJSON())
    });

    res.json(albumsList);
})

// Create an album --------------------------------
router.post('/', restoreUser, requireAuth, async (req, res, next) => {
    // Requires Authentication
    const { id } = req.user;
    const { title, description, imageUrl } = req.body;

    if (!title) {
        res.status = 400;
        res.json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
                "title": "Album title is required"
            }
        })
    }

    let album = await Album.create({
        userId: id,
        title,
        description,
        imageUrl,
    })
    album = album.toJSON();
    // album[0].toJSON()

    res.json(album);
})

module.exports = router;