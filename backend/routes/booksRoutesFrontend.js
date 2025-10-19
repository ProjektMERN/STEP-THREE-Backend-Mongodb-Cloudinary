const express = require('express');

const {
    getAllBooksFrontend,
} = require('../controllers/booksControllersFrontend');
const router = express.Router();

router.get('/', getAllBooksFrontend);

module.exports = router;
