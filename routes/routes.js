const express = require('express');
const { testCreate } = require('../controller/testController');
const router = express.Router();

// ! Delete it later
router.get('/', (req, res) => {
    res.send('Hello World!');
}
);

// ! Delete it later Test db create
router.route('/test').post(testCreate)



module.exports = router;