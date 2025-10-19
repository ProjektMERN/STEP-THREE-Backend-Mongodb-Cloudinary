const express = require('express');
const pictureUploader = require('../middlewares/pictureToCloudinary');

const {
    getNewBookBackend,
    postNewBookBackend,
} = require('../controllers/newBookControllersBackend');
const router = express.Router();

router.get('/', getNewBookBackend);
router.post('/', pictureUploader, postNewBookBackend);

module.exports = router;
