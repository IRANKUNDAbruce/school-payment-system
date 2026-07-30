const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { permit } = require('../middleware/rbac');
const { Student, Account, Vendor, Transaction, Item } = require('../models/models');

// Create transaction by vendor scanning student's QR: body { qrPayload, itemId }
router.post('/', auth, permit('vendor'), async (req, res) => {
  try {
    const { qrPayload, itemId } = req.body;
    const payload = JSON.parse(qrPayload);
    const student = await Student.findByPk(payload.id);
    if (!student) return res.status(404).json({ error: 'student not found' });
    const vendor = await Vendor.findOne({ where: { userId: req.user.id } });
    const item = await Item.findByPk(itemId);
    const amount = parseFloat(item.price);
    const account = await Account.findOne({ where: { studentId: student.id } });
    if (parseFloat(account.balance) < amount) return res.status(400).json({ error: 'insufficient funds' });
    // debit
    account.balance = parseFloat(account.balance) - amount;
    await account.save();
    const tx = await Transaction.create({ studentId: student.id, vendorId: vendor.id, itemId: item.id, amount, status: 'success' });
    res.json(tx);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

router.get('/', auth, permit('vendor'), async (req, res) => {
  const vendor = await Vendor.findOne({ where: { userId: req.user.id } });
  const txs = await Transaction.findAll({ where: { vendorId: vendor.id } });
  res.json(txs);
});

module.exports = router;
