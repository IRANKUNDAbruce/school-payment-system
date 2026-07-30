const jwt = require('jsonwebtoken');
const { User } = require('../models/models');

async function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: 'missing auth' });
  const token = header.replace('Bearer ', '');
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'change_me');
    const user = await User.findByPk(payload.id);
    if (!user) return res.status(401).json({ error: 'invalid token' });
    req.user = { id: user.id, role: user.role };
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: 'invalid token' });
  }
}

module.exports = authMiddleware;
