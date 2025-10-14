const mongoose = require('mongoose');

const dbConnect = async () => {
    const connect = await mongoose.connect(process.env.DBSTRING);
    return connect;
};

module.exports = dbConnect;
