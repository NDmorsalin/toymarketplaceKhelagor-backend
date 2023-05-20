const express = require('express');
const { testCreate } = require('../controller/testController');
const { getAllDolls, getDollById, addDoll, getMyDoll, deleteDoll, updateDoll } = require('../controller/dollStoreController');
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
router.route('/doll/:id').get(getDollById)
router.route('/mydolls').get(getMyDoll).post(addDoll)
router.route('/mydolls/:id').delete(deleteDoll).put(updateDoll)



module.exports = router;