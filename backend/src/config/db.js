const mongoose = require('mongoose');
module.exports = async (uri) => mongoose.connect(uri);
