const express = require("express");
const cors = require('cors');
const authRoute = require("./routes/auth.js");
const uploadphoto = require("./routes/UploadByLink.js");
const newplace = require("./routes/Place.js");
const { default: mongoose } = require("mongoose");
const cookieParser = require("cookie-parser");
require('dotenv').config()
const path = require('path');


const port = 4000;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + '/uploads'))
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));

mongoose.connect(process.env.MONGO_URL);

app.use(authRoute);
app.use(uploadphoto);
app.use(newplace);



app.listen(port, (req, res) => {
    console.log(`server running on port ${port}`)
});