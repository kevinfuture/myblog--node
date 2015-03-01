var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/Essay/newessay', function(req, res, next) {
    res.render('Blog/Essay/newessay', { title: '随笔' });
});

module.exports = router;
