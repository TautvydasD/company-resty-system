const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://sample-hostname:27017/?poolSize=20&w=majority";

const client = new MongoClient(uri);

async function run() {
    try {
        // Connect the client to the server
        await client.connect();

        // Establish and verify connection
        await client.db("admin").command({ ping: 1 });
        console.log("Connected successfully to server");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);

//var mongo = require('mongodb'); 
var MongoClient = require('mongodb').MongoClient;
var uri = "mongodb://localhost:27017/";

MongoClient.connect(uri, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  dbo.createCollection("customers", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});