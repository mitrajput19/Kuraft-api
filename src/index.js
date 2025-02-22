const express = require("express")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(cors())

app.use(cors({
    origin: 'https://kuraft.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://kuraft.vercel.app");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});


app.get("/",(req,res)=>{
return res.status(200).send({message:"welcome to ecommerce api - node"})
});
const authRouters = require("./routes/auth.route.js")
app.use("/auth",authRouters);

const userRouters = require("./routes/user.route.js")
app.use("/api/users",userRouters);

const productRouter = require("./routes/product.route.js")
app.use('/api/products',productRouter)

const adminProductRouter = require("./routes/adminProduct.route.js")
app.use('/api/admin/products',adminProductRouter)

const cartRouter = require("./routes/cart.route.js")
app.use('/api/cart',cartRouter)

const cartItemRouter = require("./routes/cartItem.route.js")
app.use('/api/cart-items',cartItemRouter)

const orderRouter = require("./routes/order.routes.js")
app.use('/api/orders',orderRouter)

const adminOrderRouter = require("./routes/adminOrder.route.js")
app.use('/api/admin/orders',adminOrderRouter)

const reviewRouter = require("./routes/review.route.js")
app.use('/api/reviews',reviewRouter)

const ratingRouter = require("./routes/rating.route.js")
app.use('/api/ratings',ratingRouter)

const paymentRouter = require('./routes/payment.routes.js')
app.use('/api/payments',paymentRouter);

module.exports = app;