const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    isAdmin:Boolean
},{versionKey:false})

const User = mongoose.model("users", userSchema)

module.exports = User