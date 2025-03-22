const { createUser, login } = require('../../services/userService');

const userController = require('express').Router();

userController.post('/auth/register', async (req, res) => {
    try {
        const { first_name, last_name, email, password, confirm_password } = req?.body;

        if (!first_name || !last_name || !password || !email || !confirm_password) {
            throw new Error('Invalid credentials!');
        };

        const registeredUser = await createUser({ first_name, last_name, email, password, confirm_password });


        res.status(200).send('ok')
    } catch (err) {
        console.log(err);
        res.status(400).send('Error registering user!');
    };
});

userController.post('/auth/login', async (req, res) => {
    try {
        const { email, password } = req?.body;

        const loggedIn = await login({ email, password });

        req.session.user = loggedIn;
        res.status(200).send('ok');
    } catch (err) {
        console.log(err);
        res.status(400).send('Login error!');
    };
});

userController.post('/auth/logout', async (req, res) => {
    try {
        req.session.destroy();
        res.clearCookie('auth');
        res.status(200).send('ok')
    } catch (err) {
        console.log(err);
        res.status(400).send('Logout error!');
    };
})

module.exports = userController;