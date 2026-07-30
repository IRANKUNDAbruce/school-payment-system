const express = require('express');
const router = express.Router();
const { MoMoTransaction } = require('../models/models');

// Initiate mock MTN
router.post('/initiate-mtn', async (req, res) => {
  const { studentId, amount } = req.body;
  const momo = await MoMoTransaction.create({ studentId, amount, provider: 'mtn', status: 'pending' });
  if (process.env.MOCK_MOMO === 'true' || process.env.MOCK_MOMO === '1') {
    momo.status = 'success';
    await momo.save();
  }
  res.json(momo);
});

router.post('/initiate-airtel', async (req, res) => {
  const { studentId, amount } = req.body;
  const momo = await MoMoTransaction.create({ studentId, amount, provider: 'airtel', status: 'pending' });
  if (process.env.MOCK_MOMO === 'true' || process.env.MOCK_MOMO === '1') {
    momo.status = 'success';
    await momo.save();
  }
  res.json(momo);
});

router.get('/status/:id', async (req, res) => {
  const momo = await MoMoTransaction.findByPk(req.params.id);
  if (!momo) return res.status(404).json({ error: 'not found' });
  res.json(momo);
});

module.exports = router;
