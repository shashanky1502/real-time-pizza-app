const mongoose = require('mongoose');           //import mongoose module to connect to mongoDB database and create a schema

const Schema = mongoose.Schema;                //Schema is a class that defines the structure of the data in the database (the structure of the collection)

const menuSchema = new Schema({                //create a new schema for the menu collection in the database
    name: {type: String, required: true},    //name is a field in the collection and it is a string
    image: {type: String, required: true},
    price: {type: Number, required: true},
    size : {type: String, required: true},
})

module.exports = mongoose.model('Menu',menuSchema)   //export the schema so that it can be used in other files