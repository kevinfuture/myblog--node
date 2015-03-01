var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/Album/photo', function(req, res, next) {
    res.render('Blog/Album/photo', { title: '相册' });
});

module.exports = router;
