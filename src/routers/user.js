const express = require('express');
const auth    = require('../middleware/auth');
const User    = require('../models/user');

const router = new express.Router();

// Create a new user
router.post('/users', async (req, res) => {
    try {
        let user  = new User(req.body);
        let token = await user.generateWebToken();

        res.status(201).send({ user, token });
    } catch (e) {
        res.status(400).send(e);
    }
});

// Log in a user
router.post('/users/login', async ({ body } = {}, res) => {
    try {
        let user = await User.findByCredentials(body.login_email, body.password);
        if (!user) {
            return res.status(404).send();
        }

        let token = await user.generateWebToken();

        res.send({ user, token });

    } catch (e) {
        res.status(500).send(e);
    }
});

router.get('/users/auth', auth, async (req, res) => {
    res.send({
        user: req.user,
        token: req.token
    });
});

module.exports = router;