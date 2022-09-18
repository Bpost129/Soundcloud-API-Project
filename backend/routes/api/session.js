const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateLogin = [
    check('credential')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Please provide a valid email or username.'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a password.'),
    handleValidationErrors
];

// Restore session user ---------------
router.get(
    '/',
    restoreUser,
    (req, res) => {
        const { user } = req;
        //Require Authentication

        if (user) {
            return res.json({
                user: user.toSafeObject()
            });
        } else return res.json({});
    }
);

// Login -------------------
router.post(
    '/',
    validateLogin,
    async (req, res, next) => {
        const { credential, password } = req.body;

        let user = await User.login({ credential, password });

        if (!user) {
            res.status = 401;
            res.json({
                "message": "Invalid credentials",
                "statusCode": 401
            })
        }

        if (!credential || !password) {
            res.status = 400;
            res.json({
                "message": "Validation error",
                "statusCode": 400,
                "errors": {
                    "credentials": "Email or username is required",
                    "password": "Password is required"
                }
            })
        }

        let token = await setTokenCookie(res, user);
        user = user.toJSON();
        user.token = token;

        user = {
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            token: user.token,
        }

        return res.json({
            user,
        });
    }
);

// Log out
router.delete(
    '/',
    (_req, res) => {
        res.clearCookie('token');
        return res.json({ message: 'success' });
    }
);

module.exports = router;