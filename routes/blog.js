const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const showdown = require('showdown');
const converter = new showdown.Converter();
const ensureAuthenticated = require('./../auth/verify');
const convert = require('./../utils/convert');

const Post = require('./../database/models/postModel');

router.get('/', (req, res) => {
    Post.find({}, {}, {sort: {'date': -1} }, (err, posts) => {
        res.render('blog/listBlogPosts', {
            posts
        });
    })
});

router.get('/addpost', ensureAuthenticated, (req, res) => {
    res.render('blog/addNewPost');
})

router.post('/addpost', [

    // Middleware
    ensureAuthenticated,
    check('body').not().isEmpty().withMessage('Body is required'),
    check('title').not().isEmpty().withMessage('Title is required'),
    check('title').custom((title) => {
        return Post.findOne({title: title}).then((post) => {
            if (post) {
                return Promise.reject('Title is already in use');
            }
        })
    })

    ], (req, res) => {   

    let errors = validationResult(req);

    if (errors.array().length > 0) {
        for (let i = 0; i < errors.array().length; i++) {
            req.flash('danger', errors.array()[i].msg);
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
        postData.link = convert.toLink(postData.title);

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
    Post.findOne({link: convert.toLink(req.params.title)}, (err, post) => {
        if (err) {
            return res.status(500).send();
        }

        if (post) {
            res.render('singleDocView', {
                document: post,
                type: 'blog'
            });
        } else {
            res.status(404).send();
        }
    })
})

router.post('/:title', ensureAuthenticated, (req, res) => {
    Post.deleteOne({link: convert.toLink(req.params.title)}, (err) => {
        if (err) {
            req.flash('danger', 'Failed to delete post');
        } else {
            req.flash('success', 'Post deleted');
        }
        res.redirect('/');
    })
})

module.exports = router;