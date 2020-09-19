// TODO: Require Controllers...
const { Router } = require('express');
const Cube = require('../models/cube.js');
const getCubes = require('../controllers/get-cubes');
const getCube = require('../controllers/get-cube');
const router = Router();

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Cubicle',
        cubes: getCubes()
    });
})

router.get('/about', (req, res) => {
    res.render('about', { title: 'About Page' });
})

router.get('/create', (req, res) => {
    res.render('create', { title: 'Create Cube Page' });
})

router.post('/create', (req, res) => {
    const {
        name,
        description,
        imageUrl,
        difficulty
    } = req.body;

    const cube = new Cube(name, description, imageUrl, difficulty);
    cube.save(() => res.redirect('/'));
})

router.get('/details/:id', (req, res) => {
    const cube = getCube(req.params.id);
    cube.title = 'Cubicle Details';
    res.render('details', cube);
})

router.get('*', (req, res) => {
    res.render('404', { title: 'Page Not Found' });
})

module.exports = router;