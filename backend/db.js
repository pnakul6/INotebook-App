const mongoose = require('mongoose');
const mongouri ='mongodb+srv://pnakul6:7vdIHtRPOBhFlzsi@cluster0.eoegbp9.mongodb.net/?retryWrites=true&w=majority'

const connectToMongo=()=>{
    mongoose.connect(mongouri,()=>{
        console.log("conncted")
    })
}
module.exports = connectToMongo;