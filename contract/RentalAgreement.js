import { E } from '@agoric/eventual-send';

const start = async (zcf) => {
  const makeRentalContract = async (tenant, landlord, rentalAmount, duration) => {
    const timer = zcf.getTimerService();
    const deadline = timer.add(duration);

    // Logic to handle payment and release tokens
    await E(timer).setWakeup(deadline, landlord);

    return harden({
      tenant,
      landlord,
      rentalAmount,
    });
  };

  return harden({ makeRentalContract });
};

export { start };
