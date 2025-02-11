// src/middlewares/adminMiddleware.js
const adminMiddleware = (req, res, next) => {
    // Check for the API key in the custom header 'x-api-key'
    const apiKey = req.headers['x-api-key'];
    if (!apiKey) {
      return res.status(401).json({ error: 'API key missing' });
    }
  
    // Compare the provided API key with the one stored in environment variables
    if (apiKey !== process.env.ADMIN_API_KEY) {
      return res.status(403).json({ error: 'Invalid API key' });
    }
  
    next();
  };
  
  module.exports = adminMiddleware;
  