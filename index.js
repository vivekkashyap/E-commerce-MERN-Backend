const express = require('express');
require('./database/config');
const User = require('./database/Users');
const app = express();

app.post("/register", (req, res) => {
    res.send("API in progress...");
})

app.get('/', (req, res)=> {
    console.log("App is Working...")
});


app.listen(5000)