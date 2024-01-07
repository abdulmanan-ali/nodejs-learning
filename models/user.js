const mongoose = require('mongoose');

// connection with mongodb
mongoose.connect('mongodb://127.0.0.1:27017/mynewdb')
.then(() => console.log('mongodb is connected'))
.catch((err) => console.log('MongdbError', err))
// Schema

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true // same email not use in database
    },
    jobTitle: {
        type: String,
    },
    gender: {
        type: String
    }
})
// Model 
const userModel = mongoose.model('user', userSchema) // first parameter 'user' is model name 

module.exports = userModel;