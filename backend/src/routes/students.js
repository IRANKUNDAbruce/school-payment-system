const express = require('express');
const router = express.Router();
const { Student, Account, User } = require('../models/models');
const auth = require('../middleware/auth');
const { permit } = require('../middleware/rbac');
const QRCode = require('qrcode');

// Student profile
router.get('/me', auth, permit('student'), async (req, res) => {
  const student = await Student.findOne({ where: { userId: req.user.id } });
  if (!student) return res.status(404).json({ error: 'student not found' });
  const account = await Account.findOne({ where: { studentId: student.id } });
  res.json({ student, account });
});

// Get QR code svg for logged in student
router.get('/me/qrcode', auth, permit('student'), async (req, res) => {
  const student = await Student.findOne({ where: { userId: req.user.id } });
  if (!student) return res.status(404).json({ error: 'student not found' });
  const payload = { studentId: student.studentId, id: student.id };
  const svg = await QRCode.toString(JSON.stringify(payload), { type: 'svg' });
  res.setHeader('Content-Type', 'image/svg+xml');
  res.send(svg);
});

// Deposit (initiate mock)
router.post('/me/deposit', auth, permit('student'), async (req, res) => {
  const { amount, provider } = req.body; // provider: 'mtn' or 'airtel'
  const student = await Student.findOne({ where: { userId: req.user.id } });
  if (!student) return res.status(404).json({ error: 'student not found' });
  // create momo transaction
  const { MoMoTransaction } = require('../models/models');
  const momo = await MoMoTransaction.create({ studentId: student.id, amount, provider, status: 'pending' });
  // simulate immediate success in mock service
  if (process.env.MOCK_MOMO === 'true' || process.env.MOCK_MOMO === '1') {
    momo.status = 'success';
    await momo.save();
    const account = await Account.findOne({ where: { studentId: student.id } });
    account.balance = parseFloat(account.balance) + parseFloat(amount);
    await account.save();
    return res.json({ status: 'success', momo, balance: account.balance });
  }
  res.json({ status: 'pending', momo });
});

module.exports = router;
