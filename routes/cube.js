const { Router } = require("express");
const Cube = require('../models/cube');
const jwt = require('jsonwebtoken');
const { getCubeWithAccessories, getCube, editCube, deleteCube } = require('../controllers/cubes');
const { authAccess, checkLoggedIn, checkIsCreator } = require('../controllers/user');

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
    try {
        const token = req.cookies['aid'];
        const decodedObj = jwt.verify(token, process.env.PRIVATE_KEY);

        if (cube.creatorId.toString() === decodedObj.userId.toString()) {
            cube.isCreator = true;
        } else {
            cube.isCreator = false;
        }

    } catch (error) {
        cube.isCreator = false;
    }

    res.render('details', {
        ...cube,
        title: 'Cube Details',
        isLoggedIn: req.isLoggedIn
    });
})

router.get('/edit/cube/:id', authAccess, checkLoggedIn, checkIsCreator, async (req, res) => {
    const cube = await getCube(req.params.id);
    res.render('editCubePage', {
        ...cube,
        title: 'Edit Cube Page',
        isLoggedIn: req.isLoggedIn
    });
})

router.get('/delete/cube/:id', authAccess, checkLoggedIn, checkIsCreator, async (req, res) => {
    const cube = await getCube(req.params.id);
    res.render('deleteCubePage', {
        ...cube,
        title: 'Delete Cube Page',
        isLoggedIn: req.isLoggedIn
    });
})

router.post('/edit/cube/:id', authAccess, checkIsCreator, async (req, res) => {
    const cube = await getCube(req.params.id);

    const {
        name,
        description,
        imageUrl,
        difficulty
    } = req.body;

    await editCube(req.params.id, {...cube, name, description, imageUrl, difficulty});
    res.redirect(`/details/${req.params.id}`);
});

router.post('/delete/cube/:id', authAccess, checkIsCreator, async (req, res) => {
    await deleteCube(req.params.id);
    res.redirect('/');
})

module.exports = router;