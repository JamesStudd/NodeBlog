const express = require('express');
const router = express.Router();
const showdown = require('showdown');
const converter = new showdown.Converter();

const Post = require('./../database/models/postModel');
const mongoose = require('mongoose');

router.get('/', (req, res) => {
    Post.find({}, (err, posts) => {
        res.render('index', {
            posts,
            test: 'h2 Hello World'
        });
    })
});

router.get('/addpost', (req, res) => {
    res.send('Blog add post');
})

router.post('/addpost', (req, res) => {
    let postData = new Post(req.body);

    let html = converter.makeHtml(postData.body);
    postData.parsedHtml = html;

    postData.save().then(result => {
        res.redirect('/');
    }).catch(err => {
        res.status(400).send('Unable to save data');
    });
});

module.exports = router;