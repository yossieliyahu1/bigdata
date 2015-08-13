
var express = require('express');
var router = express.Router();

var db = require('../mongo/db');

/* GET home page. */
router.get('/db', function (req, res) {
    console.log("db");
    res.render('../public/home.html');
});

router.get('/', function (req, res) {
    res.render('home', {});
});

/* GET Hello World page. */
router.get('/helloworld', function (req, res) {
    res.render('index', { title: 'Hello, World!' });
});


//////////////////////////////////////////////////////////////////////////////


/* GET Userlist page. */
router.get('/userlist', function (req, res) {
    /*
    db.userlist(req, function (docs) { 
        res.render('userlist', {
            "userlist" : docs
        });
    });
    */
    
   console.log("userlist");
    db.UserDataDB.select(req, function (docs) {
        console.log(docs);
        res.jsonp(docs);
        /*
        res.render('userlist', {
            "userlist" : docs
        });
        */
    });

});


/* GET New User page. */
router.get('/newuser', function (req, res) {
    res.render('newuser', { title: 'Add New User' });
});

/* POST to Add User Service */
router.post('/adduser', function (req, res) {
    db.UserDataDB.insert(req, function (err) {
        console.log(err);
        res.redirect("userlist");
    });
   
});

module.exports = router;