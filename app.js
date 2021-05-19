const express = require('express');
const app =  express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//Import routes

const authRoute = require('./routes/auth');

require('dotenv/config');

//middlwares
app.use(bodyParser.json());


app.use('/api/user', authRoute);

app.use(express.json());



const mongoUri="mongodb+srv://sulthana:sulthana@crud.xngbi.mongodb.net/sulthana?retryWrites=true&w=majority"
//cnnct to db
mongoose.connect(
 mongoUri,
{useNewUrlParser: true },
() => console.log('connect to DB!')
);



//hw to strt listening to server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("listening to 5000 ");
});