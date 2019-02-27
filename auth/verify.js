const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash('danger', 'Unauthorized');
        res.redirect('/');
    }
}

module.exports = ensureAuthenticated;