const express = require('express');
const router = express.Router();
const showdown = require('showdown');
const converter = new showdown.Converter();

const Post = require('./../database/models/postModel');
const mongoose = require('mongoose');

router.get('/', (req, res) => {
    Post.find({}, (err, posts) => {
        res.render('blog/listBlogPosts', {
            posts
        });
    })
});

router.get('/addpost', (req, res) => {
    res.render('blog/addNewPost');
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

router.get('/:title', (req, res) => {
    Post.findOne({title: req.params.title}, (err, post) => {
        if (err) {
            return res.status(500).send();
        }

        if (post) {
            res.render('blog/singlePost', {
                post
            });
        } else {
            res.status(404).send();
        }
    })
})

module.exports = router;