const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./config/db');
const router = require('./routes');

const app = express();



app.use(cors({
    origin : "https://e-commerce-app-umber-pi.vercel.app",
    credentials : true
}))

app.use(cookieParser());
app.use(express.json());


app.use('/api', router);

const PORT = process.env.PORT || 8080;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log('✅ Database connected successfully');
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
});
