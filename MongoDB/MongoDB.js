/* 1.	Navigate to IntelliShell and show databases running on your mongo server */
show dbs; 

/* 2.	Navigate to a non-existing database flights and observe that you can switch to this database. Once you start entering data into it, 
mongoDB will create it implicitly */
use flight_data;
show dbs;

/* 3.	Observe how collection will be created implicitly once you start interacting with it (flight_data collection does not exist yet). 
Observe unique id being automatically inserted. Execute show dbs again to see flights database created. */
db.flight_data.insertOne({
"departureAirport": "MUC",
    "arrivalAirport": "SFO",
    "aircraft": "Airbus A380",
    "distance": 12000,
    "intercontinental": true
});

/* 4.	Query flights data – a) select all records (although you only have 1 now) */
db.flight_data.find();

/* 5.	Re-execute the same insert and observe how MongoDB inserts different unique _id with the same document: */
db.flight_data.insertOne({
"departureAirport": "MUC",
    "arrivalAirport": "SFO",
    "aircraft": "Airbus A380",
    "distance": 12000,
    "intercontinental": true
});
db.flight_data.find();

/* 6.	Delete extra document that we just inserted (your object id might be different), observe the deletion: */
db.flight_data.deleteOne({"_id": ObjectId("5be065f19a20a1e96147ba43")});
db.flight_data.find();

/* 7.	Insert a document into the flight_data collection with a different schema, observe the changes 
(two documents in the same collection don’t have to have the same schema!): */
db.flight_data.insertOne({"departureAirport": "TXL", "arrivalAirport": "LHR"});
db.flight_data.find();

/* 8.	Insert a document into the flight_data collection with your own _id (do not have to use auto-generated one) and 
make it a String this time. Observe how this document got inserted: */
db.flight_data.insertOne({
"departureAirport": "STM",
    "arrivalAirport": "CHI",
    "aircraft": "Airbus A382",
    "distance": 16000,
    "intercontinental": false,
    "_id" : "test1"
});
db.flight_data.find();

/* 9.	Try to add the same document to flight_data collection with the same _id and observe MongoDB throwing errors: */
db.flight_data.insertOne({
"departureAirport": "STM",
    "arrivalAirport": "CHI",
    "aircraft": "Airbus A382",
    "distance": 16000,
    "intercontinental": false,
    "_id" : "test1"
});

/* 10.	Delete document with MUC airport, observe changes: */
db.flight_data.deleteOne({"departureAirport": "MUC"});
db.flight_data.find();

/*  11.	Update document with distance filter 16000 and add a new field marker with value “delete”. Use $set operator to make this change. 
If the value for field marker exist, MongoDB would have updated it. Since it does not exist, it will insert it. Observe your update. */
db.flight_data.updateOne({"distance": 16000},{$set: {"marker": "delete"}});
db.flight_data.find();

/* 12.	Add marker field to all of the documents (yes, we only have two right now). Use empty curly braces {} to update all documents, 
so you are not passing any filters. Observe your update */
db.flight_data.updateMany({},{$set: {"marker": "update"}});
db.flight_data.find();

/* 13.	Delete all documents where marker = update. Observe your delete, you should have no documents. */
db.flight_data.deleteMany({"marker": "update"});
db.flight_data.find();

/* 14.	Insert multiple documents into flight_data collection by passing an array ([ ]) observe your insert: */
db.flight_data.insertMany([
{
    "departureAirport": "MUC",
    "arrivalAirport": "SFO",
    "aircraft": "Airbus A380",
    "distance": 12000,
    "intercontinental": true
  },
  {
    "departureAirport": "LHR",
    "arrivalAirport": "TXL",
    "aircraft": "Airbus A320",
    "distance": 950,
    "intercontinental": false
  }
  ]);
db.flight_data.find();

/* 15.	Query flight_data collection by passing document to find() in order to filter the collection. 
We are getting all flights where intercontinential is set to true. */
db.flight_data.find({"intercontinental" : true});

/* 16.	Find all data in flight_data collection with distance of 12000: */
db.flight_data.find({"distance" : 12000});

/* 17.	Find all data in flight_data collection with distance > 10000. You will pass another object to find() as a value for distance by using $gt operator */
db.flight_data.find({"distance" : {$gt: 10000}});

/* 18.	Utilize findOne() function to get first element from your search. Although both documents match distance > 900, only one is returned. */
db.flight_data.findOne({"distance" : {$gt: 900}});
db.flight_data.find();

/* 19.	Update flight_data collection with ObjectId of your choice, add new field delayed and set it to true. Use updateOne() function and observe your update. 
Your ObjectId will be different, so don’t just copy/paste this one, copy/paste YOURS */
db.flight_data.updateOne({"_id" : ObjectId("5be069466e4060616677526a")}, {$set: {delayed: true}});
db.flight_data.find();

/* 20.	Now use update() function to change value of delayed to false */
db.flight_data.update({"_id" : ObjectId("5be069466e4060616677526a")}, {$set: {delayed: false}});
db.flight_data.find();

/* 21.	Now use update() function without $set syntax and see how it will overwrite all of the data in your document: */
/* a)	Observe that you have two documents */
db.flight_data.find();
/* b)	Issue update() without $set for one of them (grab one of the ObjectIds) */
db.flight_data.update({"_id" : ObjectId("5be069466e4060616677526a")}, {delayed: false});  
db.flight_data.find();
/* Notice how your selected document only has _id and delayed fields now. This is the behavior of update() vs updateOne() and updateMany(). 
Update() without $set operator will take existing object and replace it with new object (which in this case only has _id and delayed fields). 
You have to use $set operator with updateOne() and updateMany(). That is the difference between these functions. */

/* 22.	Use replace() function to replace a document in flight_data collection. Observe your operation. 
Take ObjectId of the document from #21, the one that only has delayed=false data */
db.flight_data.replaceOne({"_id" : ObjectId("5be069466e4060616677526a")},
{
    "departureAirport": "LHR",
    "arrivalAirport": "TXL",
    "aircraft": "Airbus A320",
    "distance": 950,
    "intercontinental": false
  } );
db.flight_data.find();
/* With replaceOne() will replace entire document, while updateOne() allows for updating fields like #20.  */

/* 23.	Insert data into a new collection passengers using insertMany() function as follows: */
db.passengers.insertMany(
 [
  {
    "name": "Max Schwarzmueller",
    "age": 29
  },
  {
    "name": "Manu Lorenz",
    "age": 30
  },
  {
    "name": "Chris Hayton",
    "age": 35
  },
  {
    "name": "Sandeep Kumar",
    "age": 28
  },
  {
    "name": "Maria Jones",
    "age": 30
  },
  {
    "name": "Alexandra Maier",
    "age": 27
  },
  {
    "name": "Dr. Phil Evans",
    "age": 47
  },
  {
    "name": "Sandra Brugge",
    "age": 33
  },
  {
    "name": "Elisabeth Mayr",
    "age": 29
  },
  {
    "name": "Frank Cube",
    "age": 41
  },
  {
    "name": "Karandeep Alun",
    "age": 48
  },
  {
    "name": "Michaela Drayer",
    "age": 39
  },
  {
    "name": "Bernd Hoftstadt",
    "age": 22
  },
  {
    "name": "Scott Tolib",
    "age": 44
  },
  {
    "name": "Freddy Melver",
    "age": 41
  },
  {
    "name": "Alexis Bohed",
    "age": 35
  },
  {
    "name": "Melanie Palace",
    "age": 27
  },
  {
    "name": "Armin Glutch",
    "age": 35
  },
  {
    "name": "Klaus Arber",
    "age": 53
  },
  {
    "name": "Albert Twostone",
    "age": 68
  },
  {
    "name": "Gordon Black",
    "age": 38
  }
]
 );
 db.passengers.find();

/* 24.	Use projections to bring back name only from passengers collection by passing a) empty document to find() method by using {} as we want to get 
all documents and b) pass projection that we want to filter by – name. Here value 1 means data – include it in the data you are returning. */
db.passengers.find({}, {name: 1});
/* Notice that ObjectId is also returned with your data, that is default behavior.  To exclude _id use 0 instead of 1 to explicitly exclude ObjectId */
db.passengers.find({}, {name: 1, _id: 0});

/* 25.	Update all documents in flight_data collection (by passing empty array {} ) to set status field to another (embedded) document. Observe the update: */
db.flight_data.updateMany({}, {$set: {status: {description: "on-time", lastUpdated: "2 hours ago" }}});
db.flight_data.find();

/* 26.	Add another nested document to flight_data collection in the same way as in #25 with field details. Observe your update: */
db.flight_data.updateMany({}, {$set: {status: {description: "on-time", lastUpdated: "2 hours ago", details:{responsible: "John Smith"} }}});
db.flight_data.find();

/* 27.	Query for all data inside flight_data collection with description field = on_time (recall that description is a field in a nested (embedded) document): */
db.flight_data.find({"status.description" : "on-time"});

/* 28.	Drill down to the same status.details to get responsible field: */
db.flight_data.find({"status.details.responsible" : "John Smith"}).pretty();

/* 29.	Utilize arrays by updating passengers collection, add hobbies field to specific name in a form of an array. Remember that an array can have any values in it, 
including other documents. Observe your update. */
db.passengers.updateOne({name: "Manu Lorenz"}, {$set: {hobbies: ["sports", "cooking", "movies"]}});
db.passengers.find();

/* 30.	Query for a specific passenger – Albert Twostone utilizing find() method: */
db.passengers.find({"name" : "Albert Twostone"});

/* 31.	Query for a specific passenger’s hobbies (passenger name = Manu Lorenz): */
db.passengers.findOne({"name" : "Manu Lorenz"}).hobbies;

/* 32.	Query for all passengers with a hobby sports: */
db.passengers.find({hobbies : "sports"});
