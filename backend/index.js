const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
require('dotenv').config();
const connectDB = require('./config/db');
const router = require('./routes');
// const userRoutes = require('../routes/UserRoutes');


const app = express();
app.use(cors(
  {
    origin : process.env.F_URL,
    credentials: true
  }
));
app.use(cookieParser())
app.use(express.json());
app.use('/api', router); // Access signup via /api/signup

const PORT = process.env.PORT;

connectDB().then(() => {
 app.listen(PORT, () => {
    console.log('Database connected successfully');
  console.log(`Server is running on port ${PORT}`);
});
});

