const { request } = require('express');

const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_API_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const pictureUploader = async (req, res, next) => {
    const { kep } = req.body;
    const results = await cloudinary.uploader.upload(kep);
    const url = cloudinary.url(results.public_id);
    console.log(url);

    req.body.kep = url;

    next();
};

module.exports = pictureUploader;
