const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const showdown = require('showdown');

const port = process.env.PORT || 3000;
const converter = new showdown.Converter();

mongoose.connect('mongodb://localhost:27017/node-blog');

let postSchema = new mongoose.Schema({
    body: String,
    parsedHtml: String
});

let Post = mongoose.model('Post', postSchema);

app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', (req, res) => {
    Post.find({}, (err, posts) => {
        res.render('index', {
            posts,
            test: 'h2 Hello World'
        });
    })
});

app.post('/addpost', (req, res) => {
    let postData = new Post(req.body);

    let html = converter.makeHtml(postData.body);
    postData.parsedHtml = html;

    postData.save().then(result => {
        res.redirect('/');
    }).catch(err => {
        res.status(400).send('Unable to save data');
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})

