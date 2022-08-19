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

app.delete("/product/:id", async (req, res) => {
    try {
        const result = await Product.deleteOne({_id: req.params.id});
        res.send(result);
    } catch (err) {
        console.error(err);
    }
});

app.get("/product/:id", async (req, res) => {
    try {
        const result = await Product.findOne({_id: req.params.id});
        if (result) {
            res.send(result);
        } else {
            res.send({ result: 'No record found' });
        }
    } catch (err) {
        console.error(err);
    }
});

app.put("/product/:id", async (req, res) => {
    try {
        let result = await Product.updateOne(
            {_id: req.params.id},
            {
                $set: req.body
            });
        if (result) {
            res.send(result);
        } else {
            res.send({ result: 'No record found' });
        }
    } catch (err) {
        console.error(err);
    }
});

app.get("/search/:key", async (req, res) => {
    try {
        let result = await Product.find({
            "$or": [
                {name: { $regex: req.params.key }},
                {category: { $regex: req.params.key }},
                {company: { $regex: req.params.key }},
                {price: { $regex: req.params.key }}
            ]
        });
        if (result) {
            res.send(result);
        } else {
            res.send({ result: 'No record found' });
        }
    } catch (err) {
        console.error(err);
    }
});

app.get('/', (req, res) => {
    console.log("App is Working...")
});


app.listen(5000);