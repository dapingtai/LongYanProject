const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

/*Mongo DB option */
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/LongYanProj');
const mongodb = mongoose.connection;

const app = express();

const Order = require('../models/order');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'dist')));
app.disable('x-powered-by');

// Cors 預設全開放
app.use(cors());

// Restful API
app.get('/', function (req, res){
    console.log("Get API GO");
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
})

app.post('/',
    async (req, res) => {
    console.log("Post API - Insert Order");
    console.log(req.body);
    try {
        let newOrder = new Order();
        newOrder.id = Date.now().toString();
        newOrder.name = req.body.name;
        newOrder.phone = req.body.phone;
        newOrder.email = req.body.email;
        newOrder.town = req.body.town;
        newOrder.area = req.body.area;
        newOrder.areanumber = req.body.areanumber;
        newOrder.address = req.body.address;
        newOrder.count.longyan = req.body.count;
        newOrder.friendcode = req.body.friendcode;
        newOrder.annotation = req.body.annotation;
        newOrder.save(
            (err, order)=>{
                if (err){
                    throw err;
                }else {
                    console.log(`${order} is created`);
                }
            }
        )
        console.log(`${newOrder._id} Buy Success`);
        res.status(200).send(`${newOrder._id}`);
    }catch (e) {
        console.log(e);
        res.status(500).send(`系統異常下訂失敗，請聯繫客服`);
    }
})

app.post('/orderSearch',
    async (req,res)=> {
    console.log("Post API - Search Order");
    console.log(req.body);
    try {
        let searchOrder = await Order.findOne({
            name: req.body.name,
            // phone: req.body.phone,
            // _id: req.body.id
        });
        if (searchOrder == null){
            res.status(200).send("查無此訂單");
        }else {
            res.status(200).send("訂單接受中")
        }

    }catch (err) {
        console.log("Search error: ", err);
    }

})


// www
app.listen(81, function () {
    console.log("app listen port is 81");
})