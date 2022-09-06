const express = require('express')

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Album, Comment, Song, Playlist } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('firstName')
    .exists({ checkFalsy: true })
    .isLength({ min: 2 })
    .withMessage('Please provide a first name with at least 2 characters'),
  check('lastName')
    .exists({ checkFalsy: true })
    .isLength({ min: 3 })
    .withMessage('Please provide a last name with at least 3 characters'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

// Sign up --------------------- **
router.post(
  '/',
  validateSignup,
  async (req, res) => {
    let { email, password, lastName, firstName, username } = req.body;

    let emailUser = await User.findOne({
      where: {
        email
      }
    })

    let nameUser = await User.findOne({
      where: {
        username
      }
    })

    if (emailUser) {
      res.status = 403;
      res.json({
        "message": "User already exists",
        "statusCode": 403,
        "errors": {
          "email": "User with that email already exists"
        }
      })
    }

    if (nameUser) {
      res.status = 403;
      res.json({
        "message": "User already exists",
        "statusCode": 403,
        "errors": {
          "email": "User with that username already exists"
        }
      })
    }

    if (!email || !firstName || !lastName || !username) {
      res.status = 400;
      res.json({
        "message": "Validation error",
        "statusCode": 400,
        "errors": {
          "email": "Invalid email",
          "username": "Username is required",
          "firstName": "First name is required",
          "lastName": "Last name is required"
        }
      })
    }

    let user = await User.signup({ email, firstName, lastName, username, password });

    let token = await setTokenCookie(res, user);
    user = user.toJSON();
    user.token = token;

    user = {
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      imageUrl: user.imageUrl,
      token: user.token,
    }

    return res.json({
      user,
    });
  }
);

module.exports = router;