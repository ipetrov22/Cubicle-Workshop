const { Router } = require("express");
const Accessory = require('../models/accessory');
const { getCube, updateCube } = require('../controllers/cubes');
const { getAllAccessories } = require('../controllers/accessories');
const router = Router();

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

module.exports = router;