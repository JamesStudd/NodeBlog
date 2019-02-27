const express = require('express');
const { check, validationResult } = require('express-validator/check');
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
            res.render('singleDocView', {
                document: post
            });
        } else {
            res.status(404).send();
        }
    })
})

module.exports = router;