


var mongo = require('mongodb');
var ObjectId = mongo.ObjectID;
var monk = require('monk');
var db = monk('localhost:27017/bigdata');


var _ = require("underscore");







var DB__ = {

    insert : function (collection, data, callback) {
        var collection = db.get(collection);
        collection.insert(data, function (err, doc) {
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
    
    remove : function (collection, data, callback) {
        var collection = db.get(collection);
        
        collection.remove({ _id : data }, function (err, doc) {
            callback(err || "success");
        });
        
        /*
        collection.remove({ _id : { $in : data} }, function (err, doc) { 
            callback(err || "success");
        });
         */
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
    
    removeUser : function (req, callback) {
        try {
            debugger; debugger;
            console.log("req.body._id = " + req.body.ids);
            var ids = [];
            for (var id in req.body) {
                ids.push(id);   
            }
            
            DB__.remove("userdata", ids[0], callback);
        } catch (e) { callback(e); }
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
    }




};


module.exports = {

    UserDataDB : UserDataDB


};