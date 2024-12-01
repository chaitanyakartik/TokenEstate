import { E } from '@agoric/eventual-send';

const start = async (zcf) => {
  // Storage for escrow agreements
  const escrowAgreements = new Map();

  // Create a new escrow agreement
  const createEscrow = (escrowId, buyerPayout, sellerPayout) => {
    assert(
      !escrowAgreements.has(escrowId),
      details`Escrow with ID ${escrowId} already exists`
    );

    const agreement = {
      buyerPayout,
      sellerPayout,
      isComplete: false,
    };

    escrowAgreements.set(escrowId, agreement);
    return `Escrow agreement ${escrowId} created.`;
  };

  // Release funds or tokens upon agreement
  const releaseEscrow = async (escrowId, conditionMet) => {
    assert(
      escrowAgreements.has(escrowId),
      details`No escrow found with ID ${escrowId}`
    );
    const agreement = escrowAgreements.get(escrowId);

    assert(
      !agreement.isComplete,
      details`Escrow ${escrowId} is already completed`
    );

    if (conditionMet) {
      await E(agreement.sellerPayout).complete();
      agreement.isComplete = true;
      return `Escrow ${escrowId} completed: funds released to seller.`;
    } else {
      await E(agreement.buyerPayout).complete();
      agreement.isComplete = true;
      return `Escrow ${escrowId} completed: funds returned to buyer.`;
    }
  };

  // Cancel an escrow agreement
  const cancelEscrow = async (escrowId) => {
    assert(
      escrowAgreements.has(escrowId),
      details`No escrow found with ID ${escrowId}`
    );
    const agreement = escrowAgreements.get(escrowId);

    assert(
      !agreement.isComplete,
      details`Escrow ${escrowId} is already completed`
    );

    await E(agreement.buyerPayout).complete();
    agreement.isComplete = true;
    return `Escrow ${escrowId} canceled: funds returned to buyer.`;
  };

  return harden({
    createEscrow,
    releaseEscrow,
    cancelEscrow,
    getEscrowAgreements: () => escrowAgreements,
  });
};

export { start };
