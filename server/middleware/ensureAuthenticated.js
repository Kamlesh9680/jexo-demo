// const jwt = require('jsonwebtoken');

// const ensureAuthenticated = (req, res, next) => {
//   const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

//   if (!token) {
//     return res.status(401).json({ message: 'Authorization token is required' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     if (error.name === 'TokenExpiredError') {
//       // Token is expired
//       return res.status(401).json({ message: 'Session expired. Please log in again.' });
//     } else {
//       // Handle other errors (invalid token, etc.)
//       return res.status(403).json({ message: 'Invalid token' });
//     }
//   }
// };

// module.exports = ensureAuthenticated;
