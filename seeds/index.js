const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground'); 

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console,"connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
await Campground.deleteMany({});
   for(let i = 0; i < 10; i++) {
       const random20 = Math.floor(Math.random() * 20);
       const price = Math.floor(Math.random() * 10) + 5;
          const camp = new Campground({            
           location: `${cities[random20].city}, ${cities[random20].state}`,
           title: `${sample(descriptors)} ${sample(places)}`,
           image: 'https://source.unsplash.com/collection/483251',
           description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
           price
       })
       await camp.save();
   }
}

seedDB().then(() => {
    mongoose.connection.close();
});