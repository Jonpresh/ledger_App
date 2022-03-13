const path = require('path')
const express = require('express');
const dotenv = require('dotenv')
const colors =require('colors')
const connectDB = require('./config/db');
//load env variables
dotenv.config({path: './config/config.env'});
//connect to database
connectDB();

//routes file
const accounts = require('./routes/account');
const transactions = require('./routes/transactions');

const app = express();

//body parser
app.use(express.json())

//Set static folder
app.use(express.static(path.join(__dirname, 'public')))


//Mount routers
app.use('/accounts', accounts);
app.use('/', transactions);




const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
});

//handle Unhandled promise rejection

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    //close server and exit process
    server.close(() => process.exit(1));
})