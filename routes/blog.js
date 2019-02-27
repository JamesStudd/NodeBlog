const express = require('express');
const router = express.Router();
const showdown = require('showdown');
const converter = new showdown.Converter();

const Post = require('./../database/models/postModel');

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash('danger', 'Unauthorized');
        res.redirect('/');
    }
}

router.get('/', (req, res) => {
    Post.find({}, (err, posts) => {
        res.render('blog/listBlogPosts', {
            posts
        });
    })
});

router.get('/addpost', ensureAuthenticated, (req, res) => {
    res.render('blog/addNewPost');
})

router.post('/addpost', (req, res) => {   
    req.checkBody('body', 'Body is required').notEmpty();
    req.checkBody('title', 'Title is required').notEmpty();

    let errors = req.validationErrors();

    if (errors) {
        for (let i = 0; i < errors.length; i++) {
            req.flash('danger', errors[i].msg);
        }
        res.render('blog/addNewPost');
    } else {
        if (req.body.categories) {
            req.body.categories = req.body.categories.split(',');
        }

        if (req.body.keywords) {
            req.body.keywords = req.body.keywords.split(',');
        }

        let postData = new Post(req.body);

        let html = converter.makeHtml(postData.body);
        postData.parsedHtml = html;
    
        postData.save().then(result => {
            req.flash('success', 'Post added');
            res.redirect('/');
        }).catch(err => {
            res.status(400).send('Unable to save data');
        });
    }
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