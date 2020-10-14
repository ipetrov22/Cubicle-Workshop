const Cube = require('../models/cube');

const getAllCubes = async () => {
    const cubes = await Cube.find().lean();
    return cubes;
};

const getCube = async (id) => {
    const cube = await Cube.findById(id).lean();
    return cube;
};

const attachAccessoryToCube = async (cubeId, acsId) => {
    await Cube.findByIdAndUpdate(cubeId, {
        $addToSet: {
            accessories: [acsId]
        }
    })
};

const getCubeWithAccessories = async (id) => {
    const cube = await Cube.findById(id).populate('accessories').lean();
    return cube;
};

const editCube = async (cubeId, data) => {
    await Cube.findByIdAndUpdate(cubeId, data);
};

const deleteCube = async (cubeId) => {
    await Cube.findByIdAndDelete(cubeId);
};

module.exports = {
    getAllCubes,
    getCube,
    attachAccessoryToCube,
    getCubeWithAccessories,
    editCube,
    deleteCube
};