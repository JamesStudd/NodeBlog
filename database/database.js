const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/node-blog', (err) => {
    if (err) {
        console.error('Database error, check credentials and restart server');
    }
});

module.exports = mongoose;