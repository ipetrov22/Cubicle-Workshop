const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '../config/database.json');
module.exports = function getCubes() {
    const cubes = fs.readFileSync(dbPath);
    return JSON.parse(cubes);
}