
DROP TABLE IF EXISTS restaurants;

CREATE TABLE restaurants (
    placeid SERIAL UNIQUE PRIMARY KEY,
    businessname TEXT NOT NULL,
    formattedaddress TEXT NOT NULL,
    internationalphonenumber TEXT NOT NULL,
    website TEXT NOT NULL,
    openinghours JSON NOT NULL,
    latitude FLOAT (10) NOT NULL,
    longitude FLOAT (10) NOT NULL
);

