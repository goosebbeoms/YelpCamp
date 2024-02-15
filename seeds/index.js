const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '65812c411ea83b39e26ed66f',  // test1 계정의 ObjectId
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque voluptate, aliquam saepe reprehenderit excepturi veniam, labore, ipsa nihil voluptatibus ullam non? Reprehenderit iure ducimus adipisci repudiandae obcaecati, temporibus laboriosam. Non!',
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/drztpbem5/image/upload/v1707852774/YelpCamp/tuarta8fytqw2sa4vicq.jpg',
                    filename: 'YelpCamp/tuarta8fytqw2sa4vicq'
                },
                {
                    url: 'https://res.cloudinary.com/drztpbem5/image/upload/v1707852776/YelpCamp/cjst2dace3ir9ibseyvf.jpg',
                    filename: 'YelpCamp/cjst2dace3ir9ibseyvf'
                },
                {
                    url: 'https://res.cloudinary.com/drztpbem5/image/upload/v1707852776/YelpCamp/vdgkcsxovosckehuyttw.jpg',
                    filename: 'YelpCamp/vdgkcsxovosckehuyttw'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});