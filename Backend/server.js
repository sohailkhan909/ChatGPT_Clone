const express = require("express");
const cors = require('cors');
const colors = require('colors');
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require('dotenv');

const connectDB = require("./config/db");



dotenv.config();
connectDB();
const app = express();
const port = process.env.PORT || 8001

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(express.json())


app.listen(port, () => {
    console.log(`Server is Running on Port : ${port}`.bgBlack.green);
})
