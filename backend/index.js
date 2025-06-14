const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./config/db');
const router = require('./routes');

const app = express();

// ✅ Allow both local + Vercel frontend
const allowedOrigins = [
  process.env.F_URL,
  process.env.F_LIVE_URL
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS Not Allowed: ' + origin));
    }
  },
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());

// ✅ All routes prefixed with /api
app.use('/api', router);

const PORT = process.env.PORT || 8080;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log('✅ Database connected successfully');
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
});
