const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const databaseSeeder = require('./databaseSender');
const productRoute=require('./routes/Product')
const  orderRoute=require('./routes/Order')
const userRoute=require('./routes/Users')

const mongoose = require('mongoose');

const PORT = process.env.PORT;
const cors = require("cors")
// Import the datebaseSender before using it

async function connectDb() {
    try {
        await mongoose.connect(process.env.MONGOOSEDB_URL);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
        process.exit(1);
    }
}
connectDb();




app.use(express.json())

app.use(cors())
//database seeder routes
app.use("/api/seed",databaseSeeder);

//routes for products
app.use("/api/products", productRoute);

//routes for users
app.use("/api/users", userRoute);



//routes for orders
app.use("/api/orders", orderRoute);


// paypal payment api for client key;
app.use("/api/config/paypal", (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID);
  });



app.get('/', (req, res) => {
    res.send('Hello from Express Server!');
});

app.listen(PORT || 3000, () => {
    console.log(`Server is running on port ${PORT}`);
});
