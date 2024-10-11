const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'jexovip' })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.log('Error connecting to MongoDB:', error));

// Session middleware configuration
app.use(session({
    secret: '!@#456@@@', // Set a strong secret key here
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI, // Use MongoDB to store session data
    }),
    cookie: { secure: false } // Set to true if using https
}));

const authRoutes = require('./routes/authRoutes');
const planRoutes = require('./routes/planRoutes');
const recordRoutes = require('./routes/recordRoutes');
const userDetailsRoute = require('./routes/userDetails'); 
const authController = require('./controllers/authController');

app.use('/api/auth', authRoutes);
app.post('/api/auth/send-verification', authController.sendVerificationCode);
app.use('/api/plans', planRoutes);
app.use('/api/records', recordRoutes);
app.use('/api', require('./routes/UpdateRoutes')); 
// app.use('/api', userDetailsRoute);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
