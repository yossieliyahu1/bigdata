
// http://cwbuecheler.com/web/tutorials/2013/node-express-mongo/

// >use bigdata
// >db.users.save({_id : 1});

var mongo = require('mongodb');
var ObjectId = mongo.ObjectID;
var monk = require('monk');
var db = monk('localhost:27017/bigdata');


var _ = require("underscore");


// db - show the current db
// show collections - show all collections in the current db
// ObjectId() - returns new unique object id 
// ..find().pretty() - pring the data "pretty" to the consol

// manipulate the DB
// ------------------------
// db.foo.save
// db.foo.insert
// db.foo.update
// db.foo.findAndModify 

// find/read from DB
// ------------------------
// db.foo.find ( document filter, fields )
// db.domains.find ( { _id : "google.com" } )
// db.person.find ( { address.home : "tel aviv" } )
// db.person.count()

// you can specify/found a document in a collection by its _id
// collection A can have only one { _id : 1, ...}
// and collection B can have also { _id : 1, ...}
// Examples: 
// retreive it by db[collection].findOne({ _id : 1 });
// update by db[collection].update({ _id : 1 }, [new data])
// update only if not exist by db[collection].update({ _id : 1 }, { $addToSet : { x : 1}})


/*
 *  DB 
 * 
 *  collection "users" - ( { _id : hardid , country : "uk", product : "bbyln" , browser : "chr", top_categories : [] } )
 * 
 *  collection "domains" - ( { _id : domain ,  } )
 * 
 *  collection "categories" -  
 */


var u1 = {
    "_id" : ObjectId("5202b481d2184d390cbf6eca"),
    "username" : "testuser1",
    "email" : "testuser1@testdomain.com"
};
var u2 = {
    "_id" : ObjectId("5202b49ad2184d390cbf6ecb"),
        "username" : "testuser2",
        "email" : "testuser2@testdomain.com"
}
var u3 = {
    "_id" : ObjectId("5202b49ad2184d390cbf6ecc"),
        "username" : "testuser3",
        "email" : "testuser3@testdomain.com"
}




var DB__ = {

    insert : function (collection, data, callback) {
        var collection = db.get(collection);
        collection.insert(data, function (err, doc) {
            console.log("------------------ " + err);
            callback(err || "success");
        });  
    },

    update : function (collection, data, callback) {
        var collection = db.get(collection);
        collection.find({ _id : data._id }, function (e, doc) {
            if (e) {
                callback(e);
            }
            else {
                var doc_ = JSON.parse(doc);
                for (var entry in data) {
                    doc_[entry] = data[entry];
                }
                collection.save(doc_);
            }
        });
    },

    select : function (collection, filter, fields, callback) {
        var collection = db.get(collection);
        collection.find(filter || {}, fields || {}, function (e, docs) {
            callback(e || docs);
        });
    }
};





var UserDataDB = {

    /*
    var user = {
        
        _id : "hrdid",
        ct : "country",
        pr : "product",
        data : "collected data"
    }
    */

    format : function (data) {
        var obj = {};
        _.each(data, function (value, key) {
            obj[key] = decodeURIComponent(value);
        });
        
        return obj;
    },
    
    insert : function (req, callback) {
        try {
            debugger; debugger;
            console.log("req.body.hrdid " + req.body.hrdid);
            var obj = {
                _id : req.body.hrdid || ObjectId(),
                ct : req.body.ct,
                pr : req.body.pr,
                data : req.body.data
            }

            DB__.insert("userdata", this.format(obj), callback);
        }
        catch (e) { callback(e); }
    },
    
    update : function (req, callback) {
        try {
            
            var obj = {
                _id : req.body.hrdid,
                data : req.body.data
            }

            DB__.update("userdata", this.format(obj), callback);
        }
        catch (e) { callback(e); }
    },
    
    select : function (req, callback) {
        try {
            debugger; debugger;
            var filter = {};
            var fields = {};
            
            console.log("userlist::select");

            DB__.select("userdata", filter, fields, callback);
        }
        catch (e) { console.log(e); callback(e); }
    },
    

    userlist : function (req, clbk) {
        
        var collection = db.get('users');
        collection.find({}, {}, function (e, docs) {
            clbk(docs);
        });
    },
    
    adduser : function (req, clbk) {
        // Set our internal DB variable
        
        // Get our form values. These rely on the "name" attributes
        var userName = req.body.username;
        var userEmail = req.body.useremail;
        
        // Set our collection
        var collection = db.get('users');
        
        // Submit to the DB
        collection.insert({
            "username" : userName,
            "email" : userEmail
        }, function (err, doc) {
            if (err) {
                // If it failed, return error
                clbk("There was a problem adding the information to the database.");
            }
            else {
                clbk("");
            }
        });    
    },

    init : function () {
        /*
        var collection = db.get('users');

        // db.user.insert({ "username" : "testuser1", "email" : "testuser1@testdomain.com" })
        collection.insert(u1);
        collection.insert(u2);
        collection.insert(u3);
        
        // db.user.find().pretty()
        collection.find({}, {}, function (e, docs) {
            console.log(docs);
        });
        */
    },

    insert2 : function (db, collection, document /* the record to add to the db */, callback) {
        
        /*
         
        users document = {
            
            _id : "[the user hard id]",
            country : "US",
            product : "delta",
            browsers : {
                "ffx" : 1,
                "chr" : 900,
                "ie" : 20,
                "other" : 0
            },
            categories : {
                "mobile" : 450,  // the category calculated "match degree"
                "dating" : 100
            },
            domains : {
                "google.com" : 30,
                "bing.com" : 10
            }
        }
         
        */

        /*
         
        domains document = {
            _id : "yahoo.com",
            
            countries : {
                "uk" :  1000,
                "de" : 200
            }
            
        }
        */

        // > db.foo.save ( { _id : 1, x : 2 } ) 
        // db[collection].save(data);

        var rslt = db[collection].insert(data);
        // rslt is a "WriteResult" object
        /*
        {
            "nInserted" : 1 ,
            "writeConcernError" : {
                "code" : 64,
                "errmsg" : "waiting for replication timed out at shard-a"
            }
        }
        */
        callback( rslt );


        // should now found the data in "foo" collection
        // > db.foo.find()
    },

    update2 : function (db, collection, data) {

        // var document = db[collection].findOne({ _id : data.id }); -- search EVERY document 

        if (!document) {
            this.insert(db, collection, data);
        }
        else {
            document.x = data.x; // update new data 
            db[collection].save(document); // overide the existing document with the specific id
        }

    },

    del2 : function (db, collection, data) {

    },

    ///////////////////////////////////////////////////////////////////////////////////////////

    gt2 : function (db, collection, filter, fields) {
        
        // find can return a cursor wich is convenient and useful to work with 

        var myCursor = db[collection].find(filter, fields);
        
        // myCursor.size()
        // myCursor.hasNext()
        // myCursor.sort({ name : 1});

        myCursor.forEach(function (d) {
            print(d.name); 
        });

        db[collection].findOne({ _id : data.id });
    }


};


module.exports = {

    UserDataDB : UserDataDB


};