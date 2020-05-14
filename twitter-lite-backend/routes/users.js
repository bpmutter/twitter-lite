const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const {
    asyncHandler,
    handleValidationErrors
} = require('./utils');
const bcrypt = require('bcryptjs');
const {User} = require('../db/models');
const {getUserToken, requireAuth} = require('../auth');

const validateUsername =
    check("username")
    .exists({
        checkFalsy: true
    })
    .withMessage("Please provide a username");

const validateEmailAndPassword = [
    check("email")
    .exists({
        checkFalsy: true
    })
    .isEmail()
    .withMessage("Please provide a valid email."),
    check("password")
    .exists({
        checkFalsy: true
    })
    .withMessage("Please provide a password."),
];

const validateCreateUser = [
    validateUsername,
    ...validateEmailAndPassword,
    handleValidationErrors
]

router.post('/', validateCreateUser, asyncHandler ( async (req, res) => {
    const {email, password, username} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        email,
        hashedPassword,
        username
    });
    const token = getUserToken(user);
    res.status(201).json({user: {id: user.id}, token });     
}));


module.exports = router;