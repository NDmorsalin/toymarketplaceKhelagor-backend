const express = require('express');
const { testCreate } = require('../controller/testController');
const { getAllDolls } = require('../controller/dollStoreController');
const router = express.Router();

// ! Delete it later
router.get('/', (req, res) => {
    res.send('Hello World!');
}
);

// ! Delete it later Test db create
router.route('/test').post(testCreate)

// Doll routes 
router.route('/dolls').get(getAllDolls)



module.exports = router;