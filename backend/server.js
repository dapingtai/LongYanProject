const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

/*Mongo DB option */
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/LongYanProj');
const mongodb = mongoose.connection;

/*Send Email Option*/
const nodemailer = require('nodemailer');
const mailTransport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'dddapingtai@gmail.com',
        pass: 'dapingtai88'
    }
})

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
        newOrder.count.longyan = req.body.commodities[0].count;
        newOrder.friendcode = req.body.friendcode;
        newOrder.annotation = req.body.annotation;
        newOrder.status = "Ready";
        newOrder.save(
            (err, order)=>{
                if (err){
                    throw err;
                }else {
                    console.log(`${order} is created`);
                }
            }
        );
        console.log(`${newOrder._id} Buy Success`);

        mailTransport.sendMail(
            {
                from: '"LongYan Team": dapingtai@gmail.com',
                to: req.body.email,
                subject: '訂單確認通知',
                html: `<div>
                           <h1>${newOrder._id}-訂單通知</h1>
                           <p>${newOrder.name}購買商品如下:</p>
                           <p>龍眼乾${newOrder.count.longyan}份</p>
                           <p>推薦好友為 - ${newOrder.friendcode}</p> 
                           <a href="http://127.0.0.1:81/master/orderCheck/${newOrder._id}">
                               確認訂單 
                           </a>
                       </div>
                      `
            },function(err) {
                if (err) {
                    console.error('Unable to send confirmation: ', err.stack);
                }
            }
        )

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
        let searchOrder = await Order.findOne({name: req.body.name});

        if (searchOrder == null){
            res.status(200).send("查無此訂單");
        }else {
            let endId = searchOrder._id.toString().substr(-3,3);
            let endPhone = searchOrder.phone.substr(-3, 3);
            // console.log(endPhone, endId);
            if(endPhone == (req.body.phone) && endId == (req.body.id)){
                res.status(200).send("訂單接受中");
            }else {
                res.status(200).send("清確認名稱，電話及訂單編號");
            }
        }

    }catch (err) {
        console.log("Search error: ", err);
    }

})

app.get('/master/orderCheck/:id', async function (req, res) {
    let orderId = req.params.id.toString();
    let checkId = await Order.findOne({_id: orderId});
    if (checkId){
        if (checkId.status === "Accept"){
            res.status(200).send("該訂單已接受");
        }else {
            checkId.status = "Accept";
            checkId.save(
                (err, order)=>{
                    if (err){
                        throw err;
                    }else {
                        console.log(`${order} accept success`);
                        res.status(200).send("訂單完成接受");
                    }
                }
            )
        }
    }else {
        res.status(500).send("Order Empty")
    }

})

// www
app.listen(81, function () {
    console.log("app listen port is 81");
})