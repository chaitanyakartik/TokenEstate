import express from 'express';
import { E } from '@agoric/eventual-send';
import { getZoe, getBoard } from './zoeHelpers.js';

const router = express.Router();

// Create rental agreement
router.post('/create', async (req, res) => {
  const { tenant, landlord, rentalAmount, duration } = req.body;

  try {
    const zoe = await getZoe();
    const rentalAgreementInstance = await getInstance('RentalAgreement');

    const agreement = await E(rentalAgreementInstance).makeRentalContract(
      tenant,
      landlord,
      rentalAmount,
      duration
    );
    res.status(200).json({ message: 'Rental agreement created', agreement });
  } catch (error) {
    res.status(500).json({ error: 'Error creating rental agreement', details: error });
  }
});

export default router;
