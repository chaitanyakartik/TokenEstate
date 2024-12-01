import { makeIssuerKit } from '@agoric/ertp';

const start = async (zcf) => {
  const { issuer, mint, brand } = makeIssuerKit('RealEstateToken', 'set');

  const mintTokens = (amount, address) => {
    const payment = mint.mintPayment(amount);
    zcf.complete([address, payment]);
  };

  return harden({
    mintTokens,
  });
};

export { start };
