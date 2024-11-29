require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

// cloudinary config
const connectCloudinary = require('./config/cloudinary');

const app = express();

app.use(cors());
app.use(morgan("common"));
app.use(express.json());
app.use(bodyParser.json());

const { connectDb } = require('./db');
const { products } = require('./data');
const Product = require('./models/Product');

// routes imports
const productRouter = require('./routes/products');
const blogRouter = require('./routes/blogs');
const commentRouter = require('./routes/comments');
const userRouter = require('./routes/users');
const emailRouter = require('./routes/emails');
const categoryRouter = require('./routes/categories');

// using the routes
app.use('/api/products', productRouter);
app.use('/api/blogs', blogRouter);
app.use('/api/comments', commentRouter);
app.use('/api/user', userRouter);
app.use('/api/email', emailRouter);
app.use('/api/categories', categoryRouter);

const port = process.env.PORT || 6000;

const startServer = async () => {
    try {
        await connectDb();

        app.listen(port, () => {
            console.log(`Server started on port: ${port}`)
        });

        // await Product.insertMany(products);
    } catch (error) {
        console.log(error.message);
    }
};

startServer();

// connect cloudinary
connectCloudinary();