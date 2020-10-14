const { Router } = require("express");
const Cube = require('../models/cube');
const jwt = require('jsonwebtoken');
const { getCubeWithAccessories } = require('../controllers/cubes');

const router = Router();

router.get('/create/cube', (req, res) => {
    res.render('createCube', { title: 'Create Cube Page' });
})

router.post('/create/cube', async (req, res) => {
    const {
        name,
        description,
        imageUrl,
        difficulty
    } = req.body;

    const token = req.cookies['aid'];
    const decodedObj = jwt.verify(token, process.env.PRIVATE_KEY);

    const cube = new Cube({ name, description, imageUrl, difficulty, creatorId: decodedObj.userId });
    try {
        await cube.save();
        res.redirect('/');
    } catch (err) {
        console.log(err);
        res.redirect('/create/cube');
    }

})

router.get('/details/:id', async (req, res) => {
    const cube = await getCubeWithAccessories(req.params.id);
    res.render('details', {
        ...cube,
        title: 'Cube Details'
    });
})

router.get('/edit', (req, res) => {
    res.render('editCubePage', { title: 'Login Page' });
})

router.get('/delete', (req, res) => {
    res.render('deleteCubePage', { title: 'Register Page' });
})

module.exports = router;