//const seedData = require('./seedData');
//const db = require('./db/models/restaurant.js');
const faker = require('faker');
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'wegot-sidebar';

let name = faker.company.companyName();
let formattedAddress = faker.address.streetAddress();
let internationalPhoneNumber = faker.phone.phoneNumber();
let website = faker.internet.url();
let open = faker.random.boolean();
let lat = faker.address.latitude();
let lng = faker.address.longitude();

function dataMaker (count) { 
  
  let newRest = {
    placeId: count,
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
    return newRest;
  }




// var count = 0;

// async function seedTheDb() {
//   MongoClient.connect('mongodb://localhost/').then((client) => {


//     const db = client.db(dbName);
//     const col = db.collection('restaurants');

//     //await col.deleteMany({});

//     for (let j = 0; j < 100000; j += 1) {
//       const restaurantArr = [];
//       for (let i = 0; i < 100; i += 1) {
//         count++;
//         const restaurantObj = dataMaker(count);
//         //restaurantObj.placeId = count;
//         restaurantArr.push(restaurantObj);
//       }

//       await db.collection('restaurants').insertMany(restaurantArr);
//     }
//     console.log(`Finished`);
//   } catch (err) {
//     console.log(err.stack);
//   }
//   // Close connection
//   client.close();
// });

// seedTheDb();


(async function seedDB() {
  let client;

  try {
    client = await MongoClient.connect(url);
    console.log('Connected correctly to server');

    const db = client.db(dbName);
    const col = db.collection('restaurants');
    await col.deleteMany({});
    console.log(`Starting: ${(new Date()).toString()}`);
    count  = 0;
    for (let j = 0; j < 100000; j += 1) {
      // console.log(j);
      const objects = [];
      for (let i = 0; i < 100; i += 1) {
        count++;
        const restaurantObj = dataMaker(count);
        //restaurantObj.placeId = count;
        objects.push(restaurantObj);
      }
      await db.collection('restaurants').insertMany(objects);
    }
    console.log(`Finished: ${(new Date()).toString()}`);
  } catch (err) {
    console.log(err.stack);
  }
  // Close connection
  client.close();
}());
// let count = 0;

// async function seedDatabase () {
  
//   for(let j = 0; j < 20; j++) {
//     let arr = [];
    
//     //console.log(count);
//     for(let i = 1; i < 1001; i++) {
//       count++;
//       //data.placeId = count;

//       arr.push(dataMaker(count));
//     } 
//     await db.insert(arr)
//     .then((response) => {
//       console.log(count);
//     })
//     .catch((err) => {
//       console.error('Failed to seed database');
//       console.error('Error Name:', err.name);
//       console.error('Error Message:', err.message);
//       db.mongoose.disconnect();
//     });
//     //console.log(arr);
//   }
  
//   db.mongoose.disconnect();
  
//   console.log('all done');
// };


// async function seedSidebarDatabase (data) {
  
//   for(let j = 0; j < 1000; j++) {
//     let arr = [];
//     console.log(count);
//     for(let i = 1; i < 10001; i++) {
//       count++;
//       //data.placeId = count;
//       arr.push(dataMaker(count));
//     } 
//     await db.insert(arr)
//     //await db.insert(arr)
//     .then((response) => {
//       //db.mongoose.disconnect();
//     })
//     .catch((err) => {
//       console.error('Failed to seed database');
//       console.error('Error Name:', err.name);
//       console.error('Error Message:', err.message);
//       db.mongoose.disconnect();
//     });
//   }

//   db.mongoose.disconnect();
  
//   console.log('all done');
// };

//seedSidebarDatabase(seedData.fakeResturants);

