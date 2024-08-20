const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     firstName: {
//         type: String,
//         required: true
//     },
//     lastName: {
//         type: String
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true // same email not use in database
//     },
//     jobTitle: {
//         type: String,
//     },
//     gender: {
//         type: String
//     }
// })

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true
    },
    redrectURL: {
        type: String,
        required: true
    },
})
// Model 
// const userModel = mongoose.model('user', userSchema) // first parameter 'user' is model name 
const URL = mongoose.model('url', urlSchema)


module.exports = {URL};