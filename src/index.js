const express = require('express');
const bodyParser = require('body-parser');
const responseTime = require('response-time');
const cookieParser = require("cookie-parser");
const cors = require("cors")

const {PORT, DB_ALTER, DB_FORCE} = require('./config/server_config');
const ApiRouter = require('./routes/api_router');

const db = require('./config/db_config');
const Category = require("./models/category")

// const Cart = require("./models/cart")

const app = express();

// app.use(responseTime(function f(req, res, time) {
//     console.log("Time elapsed = ", time);
//     res.setHeader('X-Response-Time', time);
// }));
app.use(responseTime());
app.use(cookieParser())

app.use(cors({
    origin: "http://localhost:5173",
}))

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', ApiRouter); // if any req comes with url starting with /api

app.listen(PORT, async () => {
    console.log(`Server for Shopcart is Up ${PORT}`);
    if(DB_ALTER === true){
        await db.sync({alter: true});
    }
    else if (DB_FORCE === true){
        await db.sync({force: true});
    }
    else{
        await db.sync();
    }
    console.log('DB Connected');
    
    // const c = Category.findByPk(4);
    // console.log(c)
    // const p = await c.getProducts()
    // console.log(p)

    // const c = await Cart.findByPk(3);
    // const p = await c.getProducts()
    // console.log(p.length)
})