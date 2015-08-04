# bigdata

Run "run-db.bat" to start the server
Run "run-dbshell.bat" to start the shell (connection to the db)

Now the DB is up and you can interact with it via the shell. 
(for example type >show dbs)

Now run the node app that automate the work with the DB
>node app.js

This will open an app window that allow you to interact with the DB.
The layer between the DB and the UI is in "./bigdata/mongo" folder


Current pages: 
localhost:3000/userlist
localhost:3000/newuser
localhost:3000/adduser


** app is build using http://cwbuecheler.com/web/tutorials/2013/node-express-mongo/



