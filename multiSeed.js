const MongoClient = require('mongodb').MongoClient;
const _ = require('ramda');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length; // 8
const faker = require('faker');

var time = new Date().getTime();


let name = faker.company.companyName();
let formattedAddress = faker.address.streetAddress();
let internationalPhoneNumber = faker.phone.phoneNumber();
let website = faker.internet.url();
let open = faker.random.boolean();
let lat = faker.address.latitude();
let lng = faker.address.longitude();
let index = 0;

let newRest = {
  placeId: 1,
  name: name,
  formattedAddress: formattedAddress,
  internationalPhoneNumber: internationalPhoneNumber,
  website: website,
  url: website,
  openingHours: {
    openNow: open,
    periods: [
    {
        close: {
        day: 0,
        time: '9:00pm'
        },
        open: {
        day: 0,
        time: '8:00am'
        }
    },
    {
        close: {
        day: 1,
        time: '9:00pm'
        },
        open: {
        day: 1,
        time: '8:00am'
        }
    },
    {
        close: {
        day: 2,
        time: '9:00pm'
        },
        open: {
        day: 2,
        time: '8:00am'
        }
    },
    {
        close: {
        day: 3,
        time: '9:00pm'
        },
        open: {
        day: 3,
        time: '8:00am'
        }
    },
    {
        close: {
        day: 4,
        time: '9:00pm'
        },
        open: {
        day: 4,
        time: '8:00am'
        }
    },
    {
        close: {
        day: 5,
        time: '9:00pm'
        },
        open: {
        day: 5,
        time: '8:00am'
        }
    },
    {
        close: {
        day: 6,
        time: '9:00pm'
        },
        open: {
        day: 6,
        time: '8:00am'
        }
    }
    ],
    weekdayText: [
        'Monday: 8:00 AM – 6:00 PM',
        'Tuesday: 8:00 AM – 6:00 PM',
        'Wednesday: 8:00 AM – 6:00 PM',
        'Thursday: 8:00 AM – 6:00 PM',
        'Friday: 8:00 AM – 6:00 PM',
        'Saturday: 8:00 AM – 6:00 PM',
        'Sunday: 8:00 AM – 6:00 PM'
    ]
  },
  geometry: {
      location: {
      lat: lat,
      lng: lng
      }
  }
}


if (cluster.isMaster){
    console.log(`Master ${process.pid} is running`);
  
    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork({'worker': i});
    }
  
    cluster.on('exit', (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} finished`);
    });
} else {
    seedDB();
    console.log(`Worker ${process.pid} started`);
}

let counterVar = 0
function seedDB(){

    MongoClient.connect('mongodb://localhost/').then((client) => {
      const db = client.db('recs');
      const collection = db.collection('testing');
  
      var count = parseInt(10000000 / numCPUs);
      const size = 10000; 

      async function insertBulk(){
        if(process.env.worker === 0) {
          var ops = _.range(0, size).map((id) => {
            console.log('zero')
          return { insertOne: { "document": {...newRest, placeId: id } }};
          });
        }
        if(process.env.worker === 1) {
          var ops = _.range(0, size).map((item) => {
          return { insertOne: { "document": {...newRest, rid: index } }};
          });
        }
        if(process.env.worker === 2) {
          console.log('2222')
          var ops = _.range(0, size).map((item) => {
          return { insertOne: { "document": {...newRest, rid: index } }};
          });
        }
        if(process.env.worker === 3) {
          var ops = _.range(0, size).map((item) => {
          return { insertOne: { "document": {...newRest, rid: index } }};
          });
        }

        console.log(index);
        await collection.bulkWrite(ops, { ordered: false }); 
        count -= size;

        if (count > 0){
          insertBulk();
        } else {
          console.log('done in ', (new Date().getTime() - time) / 1000, 's :3 ^_^ <3 <(^_^<)');
          client.close();
          process.exit();        
        }
      }
  
      insertBulk();
    });
  }
  