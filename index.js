const cors = require('cors');
const express = require("express");
const router = require("./routes/index");

const corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
};

// Create Express server
const app = express();


// Express configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "5mb" }));


// CORS configuration
app.use(cors(corsOptions));
app.options("*", cors);

app.use(router);


app.listen(3000,()=>{
    console.log("App is running at http://localhost:%d ",3000);
});


module.exports = app;
