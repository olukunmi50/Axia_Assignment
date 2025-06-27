const jwt = require('jsonwebtoken');

const authorize = (req, res, next) => {
  const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: "Access Denied. No token provided." });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // user.id, user.isAdmin, etc.
    next();
  } catch (err) {
    return res.status(400).json({ error: "Invalid token." });
  }
};

module.exports = authorize;
