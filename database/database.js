const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true}, (err) => {
    if (err) {
        console.error('Database error, check credentials and restart server');
    }
});

module.exports = mongoose;