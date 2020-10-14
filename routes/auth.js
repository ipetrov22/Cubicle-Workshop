const { Router } = require("express");
const { saveUser, verifyUser } = require('../controllers/user');
const { authAccess, guestAccess } = require('../controllers/user');

const router = Router();

router.get('/login', guestAccess, (req, res) => {
    res.render('loginPage', { title: 'Login Page' });
})

router.get('/register', guestAccess, (req, res) => {
    res.render('registerPage', { title: 'Register Page' });
})

router.post('/login', async (req, res) => {
    const status = await verifyUser(req, res);

    if (status) {
        res.redirect('/');
        return;
    }

    res.redirect('/login');
})

router.post('/register', async (req, res) => {
    const status = await saveUser(req, res);

    if (status) {
        res.redirect('/');
        return;
    }

    res.redirect('/register');
})

router.get('/logout', authAccess, (req, res) => {
    res.clearCookie('aid');
    res.redirect('/');
})

module.exports = router;