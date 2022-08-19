const express = require('express');
require('./database/config');
const User = require('./database/Users');
const Product = require('./database/Product');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
    try {
        let user = new User(req.body);
        let result = await user.save();
        result = result.toObject();
        delete result.password;
        delete result.__v;
        res.send(result);
    } catch (err) {
        console.error(err);
    }
})

app.post("/login", async (req, res) => {
    try {
        let user = await User.findOne(req.body).select("-password").select("-__v");
        if (req.body.password && req.body.email && user) {
            res.send(user);
        } else {
            res.send({ result: 'No user Found' });
        }
    } catch (err) {
        console.error(err);
    }
});

app.post("/add-product", async (req, res) => {
    try {
        let product = new Product(req.body);
        let result = await product.save();
        result = result.toObject();
        delete result.__v;
        res.send(result);
    } catch (err) {
        console.error(err);
    }
});

app.get("/products", async (req, res) => {
    try {
        let products = await Product.find();
        if (products.length > 0) {
            res.send(products);
        } else {
            res.send({ result: 'No products found' });
        }
    } catch (err) {
        console.error(err);
    }
});

app.get('/', (req, res) => {
    console.log("App is Working...")
});


app.listen(5000);