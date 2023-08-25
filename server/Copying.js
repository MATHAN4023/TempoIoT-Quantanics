const fs = require('fs');
const mongoose = require('mongoose');
const mqtt = require('mqtt');
const path = require('path');
const { name } = path.parse(__filename);

const allData = JSON.parse(fs.readFileSync('../allData.json'));

let host = '';
let username = '';
let password = '';
for (let i = 0; i < allData.length; i++) {
  let ini = allData[i].devicemacaddress.replace(/[:\-]/g, "_");
  if (ini === name) {
    host = allData[i].host;
    topic = allData[i].topicname;
    username = allData[i].username;
    password = allData[i].password;
    
    mongoose.connect("mongodb://admin:quantanics123@165.22.208.52:27017/?directConnection=true&authMechanism=DEFAULT/SI1", { useNewUrlParser: true, useUnifiedTopology: true, authMechanism: 'SCRAM-SHA-256', dbName: 'SI1' });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
      console.log("MongoDB connection successful");
    });
    
    // MQTT code
    //MQTT CONNECTION

    const mqttClient = mqtt.connect(host);
    mqttClient.on('connect', function () {
      mqttClient.subscribe(`${topic}`);
      console.log("MQTT client has been subscribed ....");
    });

    //MQTT MESSAGE

    mqttClient.on('message', async function (topic, message) {
      console.log("MQTT message received");

      var data = message.toString();
      var users = JSON.parse(data);

      var myobj = users;
      console.log(myobj);
      const collection_name = `/SI1/${topic}/${name}`;
      db.collection(collection_name).insertOne(myobj, function (err, result) {
        if (err) {
          console.error(err);
        } else {
          console.log("1 document inserted");
        }


      });
    });


    break;
  }
}

