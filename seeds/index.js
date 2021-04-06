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
   for(let i = 0; i < 50; i++) {
       const random200 = Math.floor(Math.random() * 200);
       const price = Math.floor(Math.random() * 10) + 5;
          const camp = new Campground({ 
           author: '6053770fd5f4d2461cb66353',    //user Id        
           location: `${cities[random200].city}, ${cities[random200].state}`,
           title: `${sample(descriptors)} ${sample(places)}`,
           description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
           price,
           geometry: {
              type: "Point",
              coordinates: [
                cities[random200].longitude,
                cities[random200].latitude,
              ]
           },
           images : [
            {
              url: 'https://res.cloudinary.com/yelpcamp-images/image/upload/v1616549051/YelpCamp/y4dg96vqce0nqsjttfjo.jpg',
              filename: 'YelpCamp/y4dg96vqce0nqsjttfjo'
            },
            {
              url: 'https://res.cloudinary.com/yelpcamp-images/image/upload/v1616549051/YelpCamp/elx2dhyxmdyzen3wu1ru.jpg',
              filename: 'YelpCamp/elx2dhyxmdyzen3wu1ru'
            }
          ],
       })
       await camp.save();
   }
}

seedDB().then(() => {
    mongoose.connection.close();
});