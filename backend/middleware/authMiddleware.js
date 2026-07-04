const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
  let token;

  // 1. Check if the request has an 'Authorization' header that starts with 'Bearer'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 2. Extract the token from the header (It looks like "Bearer eyJhbGci...")
      token = req.headers.authorization.split(' ')[1];

      // 3. Verify the token using the exact secret key stored in your .env file
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4. Attach the decoded user data (id and role) to the request object
      // This makes req.user available to any route that comes after this middleware!
      req.user = { 
        id: decoded.id, 
        role: decoded.role 
      };

      // 5. The token is valid! Pass control to the actual route controller
      next();
      
    } catch (error) {
      console.error("Token verification failed:", error.message);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  // 6. If no token was found at all, reject the request
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

module.exports = { protect };