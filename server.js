// server.js
require('dotenv').config();  // Load environment variables from .env file

const app = require('./src/app');
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
