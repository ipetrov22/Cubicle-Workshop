const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '../config/database.json');
module.exports = function getCubes(id) {
    const cubes = fs.readFileSync(dbPath);
    return JSON.parse(cubes).find(x => x.id === id);
}