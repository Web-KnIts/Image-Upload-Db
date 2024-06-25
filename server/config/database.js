require('dotenv').config()
const mongoose = require('mongoose')
const Db_name = 'ImageUpload'

const URL = process.env.Database_Url + Db_name
const Connect_With_Db = () =>{
    mongoose.connect(URL).then(()=>{
        console.log('Database Connected Successfully with '+ Db_name)
    }).catch((err)=>console.log('Error Caught While connecting to Database : \n',err.message) )
}

module.exports = Connect_With_Db