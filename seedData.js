const faker = require('faker');



module.exports.fakeResturants = {
    placeId: 1,
    name: faker.company.companyName(),
    formattedAddress: faker.address.streetAddress(),
    internationalPhoneNumber: faker.phone.phoneNumber(),
    website: faker.internet.url(),
    url: faker.internet.url(),
    openingHours: {
        openNow: faker.random.boolean(),
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
        lat: faker.address.latitude(),
        lng: faker.address.longitude()
        }
    }
}
