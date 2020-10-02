// TODO: Require Controllers...
const { Router } = require('express');
const Cube = require('../models/cube');
const Accessory = require('../models/accessory');
const { getAllCubes, getCube, updateCube, getCubeWithAccessories } = require('../controllers/cubes');
const { getAllAccessories } = require('../controllers/accessories');
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

router.post('/create/cube', async (req, res) => {
    const {
        name,
        description,
        imageUrl,
        difficulty
    } = req.body;

    const cube = new Cube({ name, description, imageUrl, difficulty });
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

router.get('/create/accessory', (req, res) => {
    res.render('createAccessory', { title: 'Create Accessory' });
})

router.post('/create/accessory', async (req, res) => {
    const {
        name,
        description,
        imageUrl
    } = req.body;

    const accessory = new Accessory({ name, description, imageUrl })

    try {
        await accessory.save();
        res.redirect('/');
    } catch (err) {
        console.log(err);
        res.redirect('/create/accessory');
    }
})

router.get('/attach/accessory/:id', async (req, res) => {
    const cube = await getCube(req.params.id);
    const accessories = (await getAllAccessories()).filter(acs => {
        return !cube.accessories.map(x => x.toString()).includes(acs._id.toString())
    });
    res.render('attachAccessory.hbs', {
        ...cube,
        accessories,
        title: 'Attach Accessory'
    });
})

router.post('/attach/accessory/:id', async (req, res) => {
    const { accessory } = req.body;
    await updateCube(req.params.id, accessory);
    res.redirect(`/details/${req.params.id}`);
})

router.get('*', (req, res) => {
    res.render('404', { title: 'Page Not Found' });
})

module.exports = router;