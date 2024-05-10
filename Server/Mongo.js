// Replace with your MongoDB connection string

import mongoose from "mongoose";




 // Replace with your connection string


function connectDB(mongoURI){
    mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.error(err));
}

export default connectDB
