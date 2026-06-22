const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError.js");
const crypto=require('crypto');

const tokenCache=new Map()

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AppError("Token missing", 401);
  }

  const token = authHeader.split(" ")[1];

  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

  if (tokenCache.has(tokenHash)) {
    req.user = tokenCache.get(tokenHash);
    return next();
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  tokenCache.set(tokenHash, decoded)
  setTimeout(()=>tokenCache.delete(tokenHash),10000);
  req.user = decoded;
  next();
};

module.exports = authMiddleware;
