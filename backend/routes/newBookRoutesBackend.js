const express = require('express');
const {
    getNewBookBackend,
    postNewBookBackend,
} = require('../controllers/newBookControllersBackend');
const router = express.Router();

router.get('/', getNewBookBackend);
router.post('/', postNewBookBackend);

module.exports = router;
