const fs = require('fs');
const mongoose = require('mongoose');
const mqtt = require('mqtt');
const path = require('path');
const {name} = path.parse(__filename);

const allData = JSON.parse(fs.readFileSync('../allData.json'));

let host = 'mqtt://demo.isenzr.com:8883';
let topic='SensorData';
let username = '';
let password = '';
for (let i = 0; i < allData.length; i++) {
  let ini=allData[i].devicemacaddress.replace(/[:\-]/g, "_");
  if (ini === name) {
    //MONGO DB CONNECTION
      mongoose.connect("mongodb://127.0.0.1:27017/SI1?directConnection=true&serverSelectionTimeoutMS=2000", { useNewUrlParser: true, useUnifiedTopology: true });
      const db = mongoose.connection;
      db.on('error', console.error.bind(console, 'connection error:'));
      db.once('open', function() {
        console.log("MongoDB connection successful");
      });


    // MQTT code
    //MQTT CONNECTION

    const mqttClient = mqtt.connect(host);
    mqttClient.on('connect',function(){
      mqttClient.subscribe(`${topic}`);
      console.log("MQTT client has been subscribed....");
    });

    //MQTT MESSAGE

      mqttClient.on('message',async function(topic,message){
        console.log("MQTT message received");
      
        var data = message.toString();   
        var users = JSON.parse(data);
        
        var myobj=users;
        console.log(myobj);

        db.collection('/SI1/sensordata/94e686434928').insertOne(myobj, function (err, result) {
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





