const express = require('express');
const pictureDeleter = require('../middlewares/pictureDeleteFromCloudinary');

const {
    getAllBooksBackend,
    deleteOneBookBackend,
    getOneBookBackend,
    updateOneBookBackend,
} = require('../controllers/booksControllersBackend');
const router = express.Router();

router.get('/', getAllBooksBackend);
router.get('/:id', getOneBookBackend);
router.put('/:id', updateOneBookBackend);
router.delete('/:id', pictureDeleter, deleteOneBookBackend);

module.exports = router;
