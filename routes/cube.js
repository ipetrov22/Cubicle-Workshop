const { Router } = require("express");
const Cube = require('../models/cube');
const jwt = require('jsonwebtoken');
const { getCubeWithAccessories } = require('../controllers/cubes');
const { authAccess, checkLoggedIn, authAccessJSON } = require('../controllers/user');

const router = Router();

router.get('/create/cube', authAccess, checkLoggedIn, (req, res) => {
    res.render('createCube', {
        title: 'Create Cube Page',
        isLoggedIn: req.isLoggedIn
    });
})

router.post('/create/cube', authAccess, async (req, res) => {
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

router.get('/details/:id', checkLoggedIn, async (req, res) => {
    const cube = await getCubeWithAccessories(req.params.id);
    res.render('details', {
        ...cube,
        title: 'Cube Details',
        isLoggedIn: req.isLoggedIn
    });
})

router.get('/edit', authAccess, checkLoggedIn, (req, res) => {
    res.render('editCubePage', {
        title: 'Edit Cube Page',
        isLoggedIn: req.isLoggedIn
    });
})

router.get('/delete', authAccess, checkLoggedIn, (req, res) => {
    res.render('deleteCubePage', {
        title: 'Delete Cube Page',
        isLoggedIn: req.isLoggedIn
    });
})

module.exports = router;