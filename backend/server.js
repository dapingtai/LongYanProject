const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

/*Credential Information*/
const credentials = require('../models/credential');

/*Mongo DB option */
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/LongYanProj');
const mongodb = mongoose.connection;

/*Send Email Option*/
const nodemailer = require('nodemailer');
const mailTransport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: credentials.gmail.user,
        pass: credentials.gmail.pass
    }
});
const {emailMasterTemplate, emailCustomerTemplate} = require('../models/mailTemplate');


const app = express();

const Order = require('../models/order');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'dist')));
app.disable('x-powered-by');

// Cors 預設全開放 // 之後要選定調整
app.use(cors());

// Restful API
app.get('/', function (req, res){
    console.log("Get API GO");
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
})

// Insert Order
app.post('/orderAdd',
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
                from: '"LongYan Team": wangwenshou8@gmail.com',
                to: req.body.email,
                subject: '[客戶]訂單確認通知',
                html: emailCustomerTemplate(newOrder)
            },function(err) {
                if (err) {
                    console.error('Unable to send confirmation: ', err.stack);
                }else {
                    console.log("Send confirm mail Success !");
                }
            }
        )

        mailTransport.sendMail(
            {
                from: '"LongYan Team": wangwenshou8@gmail.com',
                to: "zero102x@gmail.com",
                subject: '[老闆]訂單確認通知',
                html: emailMasterTemplate(newOrder)
            },function(err) {
                if (err) {
                    console.error('Unable to send confirmation: ', err.stack);
                }else {
                    console.log("Send confirm mail Success !");
                }
            }
        )

        res.status(200).send(`${newOrder._id}`);
    }catch (e) {
        console.log(e);
        res.status(500).send(`系統異常下訂失敗，請聯繫客服`);
    }
})

// 訂單查找
app.post('/orderSearch',
    async (req,res)=> {
    console.log("Post API - Search Order");
    console.log(req.body);
    try {
        let searchOrder = await Order.find({name: req.body.name});
        
        if (searchOrder == null){
            res.status(200).send("查無此訂單");
        }else {
            searchOrder.forEach(
                (order, index) => {
                    let endId = order._id.toString().substr(-3,3);
                    let endPhone = order.phone.substr(-3, 3);
                    // console.log(endPhone, endId);
                    if(endPhone == (req.body.phone) && endId == (req.body.id)){
                        switch (order.status){
                            case "Ready":
                                res.status(200).send("訂單已送出-待確認");
                                break;
                            case "Accept":
                                res.status(200).send("訂單已確認-配送中");
                                break;
                            case "Success":
                                res.status(200).send("訂單已配送");
                                break;
                        }
                    }else {
                        if (index+1 === searchOrder.length){
                            res.status(200).send("請重新確認查詢名稱，電話及訂單編號");
                        }
                    }
                }
            )
        }
    }catch (err) {
        console.log("Search error: ", err);
    }

})

// Email確認訂單
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
app.listen(3010, function () {
    console.log("app listen port is 3010");
})
