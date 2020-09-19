// TODO: Require Controllers...

module.exports = (app) => {

    app.get('/', (req, res) => {
        res.render('index', {title: 'Cubicle'});
    })

    app.get('/about', (req, res) => {
        res.render('about', {title: 'About Page'});
    })

    app.get('/create', (req, res) => {
        res.render('create', {title: 'Create Cube Page'});
    })

    app.get('/details/:id', (req, res) => {
        res.render('details', {title: 'Cubicle Details'});
    })

    app.get('*', (req, res) => {
        res.render('404', {title: 'Page Not Found'});
    })
};