// TODO: Require Controllers...
const { Router } = require('express');
const Cube = require('../models/cube');
const { getAllCubes, getCube } = require('../controllers/cubes');
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

router.get('/create/cube', (req, res) => {
    res.render('createCube', { title: 'Create Cube Page' });
})

router.post('/create/cube', (req, res) => {
    const {
        name,
        description,
        imageUrl,
        difficulty
    } = req.body;

    const cube = new Cube({ name, description, imageUrl, difficulty });
    cube.save((err) => {
        if (err) {
            console.log(err);
            return;
        }

        res.redirect('/');
    });
})

router.get('/details/:id', async (req, res) => {
    const cube = await getCube(req.params.id);
    cube.title = 'Cubicle Details';
    res.render('details', cube);
})

router.get('*', (req, res) => {
    res.render('404', { title: 'Page Not Found' });
})

module.exports = router;