const { Router } = require("express");
const Accessory = require('../models/accessory');
const { getCube, attachAccessoryToCube } = require('../controllers/cubes');
const { getAllAccessories } = require('../controllers/accessories');
const { authAccess, checkLoggedIn } = require('../controllers/user');
const router = Router();

router.get('/create/accessory', authAccess, checkLoggedIn, (req, res) => {
    const error = req.query.error;
    res.render('createAccessory', {
        title: 'Create Accessory',
        isLoggedIn: req.isLoggedIn,
        error
    });
})

router.post('/create/accessory', authAccess, async (req, res) => {
    const {
        name,
        description,
        imageUrl
    } = req.body;

    try {
        const accessory = new Accessory({ name, description, imageUrl })

        await accessory.save();
        res.redirect('/');
    } catch (err) {
        res.redirect(`/create/accessory?error=${err}`);
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
    await attachAccessoryToCube(req.params.id, accessory);
    res.redirect(`/details/${req.params.id}`);
})

module.exports = router;