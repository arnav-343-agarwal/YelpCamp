const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const {places,descriptors} = require('./seedHelpers');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random()*array.length)];

const seedDB = async()=>{
    await Campground.deleteMany({});
    for(let i=0;i<50;i++){
        const price = Math.floor(Math.random()*500);
        const random1000 = Math.floor(Math.random()*1000);
        const camp = new Campground({
            author:'662c9a3e6afa252dabdbb79d',
            title:`${sample(descriptors)} ${sample(places)}`,
            location:`${cities[random1000].city} , ${cities[random1000].state}`,
            price:price,
            description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur delectus veniam magnam eius soluta corrupti consequatur vitae quia, esse quisquam facilis inventore voluptate dolore possimus exercitationem tempora neque. Autem sed ipsam, sequi natus impedit qui quod aliquid temporibus perspiciatis ex!",
            images: [
                {
                    url: 'https://res.cloudinary.com/diy2jq8ef/image/upload/v1715244844/YelpCamp/mu28osohyqd6mo1vccvx.jpg',
                    filename: 'YelpCamp/mu28osohyqd6mo1vccvx'
                },
                {
                    url: 'https://res.cloudinary.com/diy2jq8ef/image/upload/v1715244847/YelpCamp/nbsyvhejx2htcs8dxmmr.jpg',
                    filename: 'YelpCamp/nbsyvhejx2htcs8dxmmr'
                }
            ]
        })
        await camp.save();
    }
}
seedDB().then(()=>{
    mongoose.connection.close()
});