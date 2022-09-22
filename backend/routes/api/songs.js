const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Album, Song, User, Comment, Playlist } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Create a comment for a song based on its id --------------------------------
router.post('/:songId/comments', restoreUser, requireAuth, async (req, res, next) => {
    let { id } = req.user;
    let { songId } = req.params;
    let { body } = req.body;

    const song = await Song.findOne({
        where: {
            id: songId
        }
    })

    if (!song) {
        res.status = 404;
        res.json({
            "message": "Song couldn't be found",
            "statusCode": 404
        })
    }

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

    let comment = await Comment.create({
        userId: id,
        songId,
        body
    });

    comment = comment.toJSON();

    return res.json(comment);
})

// Get all comments of a song by its id ----------------------------
router.get('/:songId/comments', async (req, res, next) => {
    const { songId } = req.params

    const song = await Song.findOne({
        where: {
            id: songId
        }
    })

    if (!song) {
        res.status = 404;
        res.json({
            "message": "Song couldn't be found",
            "statusCode": 404
        })
    }

    const comments = await Comment.findAll({
        where: {
            songId
        },
        include: [
            {
                model: User,
                attributes: ['id', 'username']
            }
        ]
    })

    let commentList = [];
    comments.forEach(comment => {
        commentList.push(comment.toJSON())
    })

    res.json(commentList);
})

// Get all songs created by the current user -------------------- ***
router.get('/current', restoreUser, requireAuth, async (req, res, next) => {
    // Requires Authentication
    let { user } = req;

    user = user.toJSON();
    
    let songs = await Song.findAll({
        where: {
            userId: user.id,
        }
    })

    let songList = [];
    for (let song of songs) {
        songList.push(song.toJSON())
    }

    return res.json(songList);
})

// Get details of a song from its id --------------------
router.get('/:songId', async (req, res, next) => {
    let { songId } = req.params

    let song = await Song.findOne({
        where: {
            id: songId,
        },
        include: [
            { 
                model: User,
                attributes: ['id', 'username', 'imageUrl']
            },
            { 
                model: Album, 
                attributes: ['id', 'title', 'imageUrl']
            },
        ]
    })

    if (!song) {
        res.status = 404;
        res.json({
            "message": "Song couldn't be found",
            "statusCode": 404
        })
    }

    song = song.toJSON();
    return res.json(song);
})

// Edit a song -----------------------
router.put('/:songId', requireAuth, async (req, res, next) => {
    // Requires Authentication
    let { songId } = req.params
    let { title, description, url, imageUrl } = req.body
    let song = await Song.findOne({
        where: {
            id: songId,
        }
    })

    if (!song) {
        res.status = 400;
        res.json({
            "message": "Song couldn't be found",
            "statusCode": 404
        })
    }

    if (!title || !url) {
        res.status = 400;
        res.json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
                "title": "Song title is required",
                "url": "Audio is required"
            }
        })
    }

    song.title = title;
    song.description = description;
    song.url = url;
    song.imageUrl = imageUrl;

    res.json(song);
})

// Delete a song -----------------------
router.delete('/:songId', requireAuth, async (req, res, next) => {
    // Requires Authentication
    const { songId } = req.params;
    const song = await Song.findOne({
        where: {
            id: songId
        }
    })

    if (!song) {
        res.status = 404;
        res.json({
            "message": "Song couldn't be found",
            "statusCode": 404
        })
    }

    await song.destroy();
    res.json({
        "message": "Succefully deleted",
        "statusCode": 200
    })
})



// Get all songs ----------------- ***
router.get('/', async (req, res, next) => {
    let { size, page } = req.query;

    if (!size && !page) {
        const songs = await Song.findAll({});
        return res.json(songs)
    }

    if (!size) size = 1;
    if (!page) page = 1;

    let pagination = {};
    size = parseInt(size);
    page = parseInt(page);

    if (size >= 1 && page >= 1) {
        pagination.limit = size
        pagination.offset = size * (page - 1);
    }

    

    const songs = await Song.findAll({
        ...pagination
    })

    const songList = [];
    for (let song of songs) {
        songList.push(song.toJSON())
    }


    if (page < 0 || size < 0) {
        res.status = 400;
        res.json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
                "page": "Page must be greater than or equal to 0",
                "size": "Size must be greater than or equal to 0",
                "createdAt": "CreatedAt is invalid"
            }
        })
    } else {
        return res.json({
            songs,
            page,
            size
        });
    }
    
    
})

// Create a song ------------------- ***
router.post('/', restoreUser, requireAuth, async (req, res, next) => {
    // Requires Authentication
    let { id } = req.user;

    const { title, description, url, imageUrl, albumId } = req.body;

    // let album = await Album.findOne({
    //     where: {
    //         id: albumId
    //     }
    // })

    

    let song = await Song.create({
        userId: id,
        albumId,
        title,
        description,
        url,
        imageUrl,
    })

    song = song.toJSON();


    if (!album && albumId) {
        res.status = 404;
        res.json({
            "message": "Album couldn't be found",
            "statusCode": 404
        })
    } else if (!title || !url) {
        res.status = 400;
        res.json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
                "title": "Song title is required",
                "url": "Audio is required"
            }
        })
    } else {
        res.json(song);
    }

    
})

module.exports = router;