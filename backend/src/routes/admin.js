const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { permit } = require('../middleware/rbac');
const { User, Student, Vendor, Account, Item, Transaction } = require('../models/models');

// Admin: list users
router.get('/users', auth, permit('admin'), async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

// Admin: add item
router.post('/items', auth, permit('admin'), async (req, res) => {
  const { name, price } = req.body;
  const item = await Item.create({ name, price });
  res.json(item);
});

// Admin: list transactions
router.get('/transactions', auth, permit('admin'), async (req, res) => {
  const txs = await Transaction.findAll();
  res.json(txs);
});

module.exports = router;
