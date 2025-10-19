const cloudinary = require('cloudinary').v2;
const Book = require('../models/Book');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_API_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const pictureDeleter = async (req, res, next) => {
    const { id } = req.params;
    const torolKep = await Book.findById({ _id: id });
    const kep = torolKep.kep.split('/')[6].split('?')[0];
    console.log(kep);

    await cloudinary.uploader.destroy(kep.toString());

    next();
};

module.exports = pictureDeleter;
