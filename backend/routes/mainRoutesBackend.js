const express = require('express');
const { getMainBackend } = require('../controllers/mainControllersBackend');
const router = express.Router();

router.get('/', getMainBackend);

module.exports = router;
