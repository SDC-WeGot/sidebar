const seedData = require('./seedData');
const db = require('./db/models/restaurant.js');
const faker = require('faker');

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



// MongoClient.connect(url, function(err, db) {
//   // Get the collection
// var col = db.collection('restaurants');
//   //
//   var bulk = col.initializeOrderedBulkOp();
//   var counter = 0;
//   async.whilst(
//     // Iterator condition
//     function() { return counter < total_entries },

//     // Do this in the iterator
//     function(callback) {
//         counter++;
        
//         bulk.insert(entries[counter] );

//         if ( counter % 1000 == 0 ) {
//             bulk.execute(function(err,result) {
//               bulk = col.initializeOrderedBulkOp();
//               callback(err);
//             });
//         } else {
//             callback();
//         }
//     },

//     // When all is done
//     function(err) {
//         if ( counter % 1000 != 0 )
//             bulk.execute(function(err,result) {
//                 console.log( "inserted some more" );
//             });
//         console.log( "I'm finished now" );
//         db.close();
//     }
// );


let count = 20001;

async function seedSidebarDatabase (data) {
  
  
  for(let j = 0; j < 20; j++) {
    let arr = [];
    
    //console.log(count);
    for(let i = 1; i < 1001; i++) {
      count++;
      //data.placeId = count;

      arr.push(dataMaker(count));
    } 
    await db.insert(arr)
    .then((response) => {
      console.log(count);
    })
    .catch((err) => {
      console.error('Failed to seed database');
      console.error('Error Name:', err.name);
      console.error('Error Message:', err.message);
      db.mongoose.disconnect();
    });
    //console.log(arr);
  }
  
  db.mongoose.disconnect();
  
  console.log('all done');
};

seedSidebarDatabase(seedData.fakeResturants);

