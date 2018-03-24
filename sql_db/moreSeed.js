const faker = require('faker');
const pgp = require('pg-promise')({
    capSQL: true // generate capitalized SQL 
});

const db = pgp('postgres://localhost:5432/wegot_sidebar'); // your database object

// Creating a reusable/static ColumnSet for generating INSERT queries:    
const cs = new pgp.helpers.ColumnSet([
    'businessname',
    'formattedaddress',
    'internationalphonenumber',
    'website',
    'openinghours',
    'latitude',
    'longitude',
], {table: 'restaurants'});


function dataMaker (count) { 
    let businessname = faker.company.companyName();
    let formattedaddress = faker.address.streetAddress();
    let internationalphonenumber = faker.phone.phoneNumber();
    let website = faker.internet.url();
    let open = faker.random.boolean();
    let latitude = faker.address.latitude();
    let longitude = faker.address.longitude();
  
    let newRest = {
        businessname: businessname,
        formattedaddress: formattedaddress,
        internationalphonenumber: internationalphonenumber,
        website: website,
        latitude: latitude,
        longitude: longitude,
        openinghours: {
            opennow: open,
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
            weekdaytext: [
                'Monday: 8:00 AM – 6:00 PM',
                'Tuesday: 8:00 AM – 6:00 PM',
                'Wednesday: 8:00 AM – 6:00 PM',
                'Thursday: 8:00 AM – 6:00 PM',
                'Friday: 8:00 AM – 6:00 PM',
                'Saturday: 8:00 AM – 6:00 PM',
                'Sunday: 8:00 AM – 6:00 PM'
                ]
            }
        }
    return newRest;
}


// Generating 10,000 records 1000 times, for the total of 10 million records:
function getNextData(t, pageIndex) {
    let data = null;
    if (pageIndex < 10000) {
        data = [];
        for (let i = 0; i < 1000; i++) {
            //const idx = pageIndex * 10000 + i; // to insert unique product names
            data.push(
               dataMaker()
            );
        }
    }
    return Promise.resolve(data);
}


db.tx('massive-insert', t => {
    return t.sequence(index => {
        return getNextData(t, index)
            .then(data => {
                if (data) {
                    const insert = pgp.helpers.insert(data, cs);
                    return t.none(insert);
                }
            });
    });
})
.then(data => {
    // COMMIT has been executed
    console.log('Total batches:', data.total, ', Duration:', data.duration);
})
.catch(error => {
    // ROLLBACK has been executed
    console.log(error);
});


