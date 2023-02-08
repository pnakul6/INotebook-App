const mongoose = require('mongoose');
const mongouri ='//write your mongoDB url'

const connectToMongo=()=>{
    mongoose.connect(mongouri,()=>{
        console.log("conncted")
    })
}
module.exports = connectToMongo;
