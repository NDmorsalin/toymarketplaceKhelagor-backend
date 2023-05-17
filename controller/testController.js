const { TestDb } = require("../Models/Test");

const testCreate = async (req, res) => {
    const testData = req.body;
    try {
        const result = await TestDb.insertOne(testData);
        res.status(201).json(result);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    testCreate,
}