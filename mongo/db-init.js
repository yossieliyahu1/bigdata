

// indexes are in 
// >db.system.indexes
// for example: 
// >db.system.indexes.find( { x : "abc", { key : 1 }).explain();


var conn = new Mongo('mongodb:\/\/localhost:27017');
var db = conn.getDB("contacts");

var personCursor = db.person.find();
personCursor.forEach(printjson);

/*
// create db
var db = db.getSiblingDB('bigdata'); 
use db


// create collections 
db.createCollection("users");
db.createCollection("domains");

// make sure the db & collections created 
print(db.adminCommand('listDatabases'));
print(db.getCollectionInfos());



// create indexes 

db.users.ensureIndex(keys, options)
// DONT USE IT WITHOUT 
db.users.ensureIndex(keys, { background : true}) // will build the index in the background

db.users.ensureIndex({ name : 1 }) // index according to "name" ascending 


db.users.ensureIndex({ country : 1 });
db.users.ensureIndex({ product : 1 });
db.users.ensureIndex({ browser : 1 });

*/