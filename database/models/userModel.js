const mongoose = require('./../database');

let User = undefined;
if (mongoose.connection && mongoose.connection.readyState == 1 || mongoose.connection.readyState == 2) {
    let userSchema = mongoose.Schema({
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    });

    User = mongoose.model('User', userSchema);
};

module.exports = User;