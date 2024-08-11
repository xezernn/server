const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
require('dotenv').config();
const productsRouter = require('./src/routes/products');
const sliderRouter = require('./src/routes/slider');
const categoriesRouter = require('./src/routes/categories');
const loginRouter = require('./src/routes/login');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/products', productsRouter);
app.use('/slider', sliderRouter);
app.use('/categories', categoriesRouter);
app.use('/auth', loginRouter);

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjEsImlhdCI6MTcyMzM3NjYyNiwiZXhwIjozNjAwMDE3MjMzNzMwMjZ9.mNukM0RVn9rYUHZOanOzoovoT7oABMpg_7iAK3R_NFw

const PORT = process.env.PORT || 3768;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
