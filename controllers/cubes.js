const Cube = require('../models/cube');

const getAllCubes = async () => {
    const cubes = await Cube.find().lean();
    return cubes;
};

const getCube = async (id) => {
    const cube = await Cube.findById(id).lean();
    return cube;
};

const updateCube = async (cubeId, acsId) => {
    await Cube.findByIdAndUpdate(cubeId, {
        $addToSet: {
            accessories: [acsId]
        }
    })
};

const getCubeWithAccessories = async (id) => {
    const cube = Cube.findById(id).populate('accessories').lean();
    return cube;
};

module.exports = {
    getAllCubes,
    getCube,
    updateCube,
    getCubeWithAccessories
};