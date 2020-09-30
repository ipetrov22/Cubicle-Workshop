module.exports = {
    development: {
        port: process.env.PORT || 3000,
        dbUrl: `mongodb+srv://admin:${process.env.DB_PASSWORD}@cluster0.5uonz.mongodb.net/Cubicle?retryWrites=true&w=majority`
    },
    production: {}
};