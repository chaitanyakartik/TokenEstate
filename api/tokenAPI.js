import express from 'express';
import { E } from '@agoric/eventual-send';
import { getZoe, getBoard } from './zoeHelpers.js';

const router = express.Router();

// Create tokens
router.post('/mint', async (req, res) => {
  const { amount, address } = req.body;

  try {
    const zoe = await getZoe();
    const tokenFactoryInstance = await getInstance('TokenFactory');

    const mintTokens = await E(tokenFactoryInstance).mintTokens(amount, address);
    res.status(200).json({ message: 'Tokens minted successfully', mintTokens });
  } catch (error) {
    res.status(500).json({ error: 'Error minting tokens', details: error });
  }
});

export default router;
