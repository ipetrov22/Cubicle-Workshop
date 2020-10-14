const { Router } = require("express");
const Accessory = require('../models/accessory');
const { getCube, updateCube } = require('../controllers/cubes');
const { getAllAccessories } = require('../controllers/accessories');
const { authAccess, checkLoggedIn } = require('../controllers/user');
const router = Router();

router.get('/create/accessory', authAccess, checkLoggedIn, (req, res) => {
    res.render('createAccessory', {
        title: 'Create Accessory',
        isLoggedIn: req.isLoggedIn
    });
})

router.post('/create/accessory', authAccess, async (req, res) => {
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

router.get('/attach/accessory/:id', authAccess, checkLoggedIn, async (req, res) => {
    const cube = await getCube(req.params.id);
    const accessories = (await getAllAccessories()).filter(acs => {
        return !cube.accessories.map(x => x.toString()).includes(acs._id.toString())
    });
    res.render('attachAccessory.hbs', {
        ...cube,
        accessories,
        title: 'Attach Accessory',
        isLoggedIn: req.isLoggedIn
    });
})

router.post('/attach/accessory/:id', authAccess, async (req, res) => {
    const { accessory } = req.body;
    await updateCube(req.params.id, accessory);
    res.redirect(`/details/${req.params.id}`);
})

module.exports = router;