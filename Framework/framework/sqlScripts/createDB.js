/*
 * Execute this script from MongoDB Shell
 * load(scriptpath/scriptname.js)
 */


db = connect("localhost:27017");

db = db.getSiblingDB('framework')

db.createCollection("temp");

db.createUser(
   {
     user: "frame",
     pwd: "Intel009*",
     roles: [ "readWrite", "dbAdmin" ]
   
	   /*roles: [ {role: "readWrite", db: "framework"}, 
			{role: "dbAdmin", db: "framework"}, 
			"userAdminAnyDatabase"]*/
   }
);

db.createCollection("login", {autoIndexId: true});

//NOTE: This line is not a part of this script and just for testing
db.getCollection("login").insert({username: "jane", password: "jane", last_login: new Date(), created_on: new Date(), last_updated: new Date()});

