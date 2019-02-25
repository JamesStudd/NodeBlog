const mongoose = require('./../database');

let Post = undefined;
if (mongoose.connection && mongoose.connection.readyState == 1 || mongoose.connection.readyState == 2) {
    let postSchema = mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        body: {
            type: String,
            required: true
        },
        parsedHtml: {
            type: String,
            required: false
        },
        date: {
            type: Date,
            default: Date.now
        },
        categories: {
            type: [String],
            default: []
        },
        keywords: {
            type: [String],
            default: []
        }
    });

    Post = mongoose.model('Post', postSchema);
};

module.exports = Post;