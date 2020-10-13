const { Router } = require("express");
const router = Router();

router.get('/login', (req, res) => {
    res.render('loginPage', { title: 'Login Page' });
})

router.get('/register', (req, res) => {
    res.render('registerPage', { title: 'Register Page' });
})

module.exports = router;