import express from 'express';
import { E } from '@agoric/eventual-send';
import { getZoe, getBoard } from './zoeHelpers.js';

const router = express.Router();

// List tokens for sale
router.post('/list', async (req, res) => {
  const { tokenId, price } = req.body;

  try {
    const zoe = await getZoe();
    const marketplaceInstance = await getInstance('Marketplace');

    const listing = await E(marketplaceInstance).listTokenForSale(tokenId, price);
    res.status(200).json({ message: 'Token listed for sale', listing });
  } catch (error) {
    res.status(500).json({ error: 'Error listing token for sale', details: error });
  }
});

// Buy tokens
router.post('/buy', async (req, res) => {
  const { tokenId } = req.body;

  try {
    const zoe = await getZoe();
    const marketplaceInstance = await getInstance('Marketplace');

    const purchase = await E(marketplaceInstance).buyToken(tokenId);
    res.status(200).json({ message: 'Token purchased successfully', purchase });
  } catch (error) {
    res.status(500).json({ error: 'Error purchasing token', details: error });
  }
});

export default router;
