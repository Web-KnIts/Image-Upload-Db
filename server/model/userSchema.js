const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    imagePath:{
        type:String,
        required:true
    },
    date:{
        type:Date
    }
})

const User = new mongoose.model("User",userSchema)
module.exports = User