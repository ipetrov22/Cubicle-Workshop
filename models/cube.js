const { v4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '../config/database.json');
module.exports = class Cube {
    constructor(name, description, imageUrl, difficulty) {
        this.id = v4();
        this.name = name || 'Unknown Name';
        this.description = description || '';
        this.imageUrl = imageUrl || 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png';
        this.difficulty = difficulty || 'Unknown Difficulty';
    }

    save(cb) {
        // const data = {
        //     id: this.id,
        //     name: this.name,
        //     description: this.description,
        //     imageUrl: this.imageUrl,
        //     difficulty: this.difficulty
        // }

        fs.readFile(dbPath, (err, data) => {
            if (err) {
                console.log(err);
                return;
            }

            const db = JSON.parse(data);
            db.push(this);

            cb();
            fs.writeFileSync(dbPath, JSON.stringify(db));
            console.log('Cube saved successfully.');
        });

    }
}