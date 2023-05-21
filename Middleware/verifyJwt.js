const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = async (req, res, next) => {
  try {
    // Get the token from the request cookies or headers
    const token = req.cookies.token || req.headers.authorization;

    if (!token) {
      return res.status(401).json( {
        error: 'No token provided',
        message: ' user is not logged in ',
        isLoggedIn: false,
      });
    }

    // Verify the token asynchronously
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded token to the request object
    const {email} = decoded;
    req.email = email;
    
    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json( {
      error: 'Invalid token',
      isLoggedIn: false,
      message: 'users token is expired'
    });
  }
};

module.exports = verifyToken;