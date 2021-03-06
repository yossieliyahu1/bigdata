﻿
// http://cwbuecheler.com/web/tutorials/2013/node-express-mongo/

// >use bigdata
// >db.users.save({_id : 1});


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
        callback(rslt);


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