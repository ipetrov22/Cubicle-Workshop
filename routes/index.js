// TODO: Require Controllers...
const { Router } = require('express');
const { getAllCubes } = require('../controllers/cubes');
const { checkLoggedIn } = require('../controllers/user');
const router = Router();

router.get('/', checkLoggedIn, async (req, res) => {
    res.render('index', {
        title: 'Cubicle',
        cubes: await getAllCubes(),
        isLoggedIn: req.isLoggedIn
    });
})

router.get('/about', checkLoggedIn, (req, res) => {
    res.render('about', {
        title: 'About Page',
        isLoggedIn: req.isLoggedIn
    });
})

module.exports = router;