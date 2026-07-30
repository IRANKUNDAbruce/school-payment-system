require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/students');
const vendorRoutes = require('./routes/vendors');
const transactionRoutes = require('./routes/transactions');
const momoRoutes = require('./routes/momo');
const adminRoutes = require('./routes/admin');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/momo', momoRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => res.json({ status: 'ok' }));

// Sync is handled in server.js or seed script
module.exports = app;
