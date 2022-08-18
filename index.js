const express = require('express');
require('./database/config');
const User = require('./database/Users');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    res.send(result);
})

app.get('/', (req, res)=> {
    console.log("App is Working...")
});


app.listen(5000)