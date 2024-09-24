const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes.js');
const productRoutes=require('./routes/productRoutes.js');
const adminRoutes=require('./routes/adminRoutes.js');
const createUserRoutes=require('./routes/createUserRoutes.js');
const sequelize = require('./config/database');
const dotenv = require('dotenv');

dotenv.config(); 
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json()); 

// Use routes
app.use(bodyParser.json());
app.use('/admin',adminRoutes);
app.use('/user', userRoutes);
app.use('/product',productRoutes)

// app.use('/user',createUserRoutes.js)


// Start server
sequelize.sync({force:false})
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(error => {
    console.error('Unable to connect to the database:', error);
  });
