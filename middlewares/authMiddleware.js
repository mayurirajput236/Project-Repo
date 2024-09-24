const jwt = require('jsonwebtoken');
const secretKey = 'mayurirajput'; // Use environment variable in production

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log(authHeader);
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>
  console.log(token);
  console.log("token received");
  if (token == null) return res.sendStatus(401); // If no token, return Unauthorized
   
  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403).json({error:"invalid token"}); // If token is invalid, return Forbidden

    req.user = user; // Attach user info to the request
    next(); // Proceed to the next middleware/route handler
  });
};

module.exports = authenticateToken;
