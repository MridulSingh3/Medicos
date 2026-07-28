// middlewares/authUser.js
import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
  try {
    // Read from header 'token' or 'authorization'
    let token = req.headers.token || req.headers.authorization;

    if (!token) {
      return res.status(401).json({ success: false, message: 'Not Authorized, login again' });
    }

    // Strip "Bearer " if it was passed via standard Authorization header
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length).trim();
    }

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = token_decode.id;

    next();
  } catch (error) {
    console.log("Auth Middleware Error:", error.message);
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

export default authUser;