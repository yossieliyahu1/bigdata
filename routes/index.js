var express = require('express');
var router = express.Router();

var db = require('../mongo/db');

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});

/* GET Hello World page. */
router.get('/helloworld', function (req, res) {
    res.render('index', { title: 'Hello, World!' });
});


//////////////////////////////////////////////////////////////////////////////


/* GET Userlist page. */
router.get('/userlist', function (req, res) {
    db.userlist(req, function (docs) { 
        res.render('userlist', {
            "userlist" : docs
        });
    });
    
});


/* GET New User page. */
router.get('/newuser', function (req, res) {
    res.render('newuser', { title: 'Add New User' });
});

/* POST to Add User Service */
router.post('/adduser', function (req, res) {
    
    db.adduser(req, function (err) {
        if (err) {
            res.render('error', {
                "message" : err
            });
        }
        else {
            res.redirect("userlist");
        }
    });
    
   
});

module.exports = router;