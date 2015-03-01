var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/File/uploadfile', function(req, res, next) {
    res.render('Blog/File/uploadfile', { title: '文件上传' });
});

module.exports = router;
