require('dotenv').config()
const express = require('express')
const cors = require('cors');
const Connect_With_Db = require('./config/database');
const router = require('./routes/router');
const app = express();

const PORT = process.env.PORT || 5000; 


app.use(express.json())
app.use(cors())
app.use(router)
app.use("/uploads",express.static('./uploads'))

app.listen(PORT,()=>{
    console.log("App running at Port : "+ PORT)
    Connect_With_Db();
})