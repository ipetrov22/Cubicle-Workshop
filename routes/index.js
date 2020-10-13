// TODO: Require Controllers...
const { Router } = require('express');
const { getAllCubes } = require('../controllers/cubes');
const router = Router();

router.get('/', async (req, res) => {
    res.render('index', {
        title: 'Cubicle',
        cubes: await getAllCubes()
    });
})

router.get('/about', (req, res) => {
    res.render('about', { title: 'About Page' });
})

module.exports = router;