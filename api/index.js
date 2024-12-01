import express from 'express';
import tokenAPI from './tokenAPI.js';
import rentalAPI from './rentalAPI.js';
import marketplaceAPI from './marketplaceAPI.js';

const app = express();
app.use(express.json());

// Routes
app.use('/api/token', tokenAPI);
app.use('/api/rental', rentalAPI);
app.use('/api/marketplace', marketplaceAPI);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});
