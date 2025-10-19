const express = require('express');
const {
    getSzuresBooks,
    getSzuresAllBooks,
} = require('../controllers/szuresBooksControllersBackend');
const router = express.Router();

router.get('/', getSzuresAllBooks);
router.get('/:id', getSzuresBooks);

module.exports = router;
