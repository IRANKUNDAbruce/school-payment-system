const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { permit } = require('../middleware/rbac');
const { Vendor, User, Transaction } = require('../models/models');

// Vendor endpoints
router.get('/transactions', auth, permit('vendor'), async (req, res) => {
  const vendor = await Vendor.findOne({ where: { userId: req.user.id } });
  if (!vendor) return res.status(404).json({ error: 'vendor not found' });
  const txs = await Transaction.findAll({ where: { vendorId: vendor.id } });
  res.json(txs);
});

module.exports = router;
