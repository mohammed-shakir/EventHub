const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).send('Access denied. No token provided.');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    res.status(400).send('Invalid token.');
  }
};

const admin = (req, res, next) => {
  if (req.user.role !== 'Admin') {
    return res.status(403).send('Access denied. Not an admin.');
  }
  next();
};

module.exports = { auth, admin };
