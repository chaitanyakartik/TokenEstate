import { E } from '@agoric/eventual-send';

// Contract names
const contracts = [
  'TokenFactory',
  'RentalAgreement',
  'Marketplace',
  'EscrowService',
  'Governance',
];

async function deployContracts(homeP) {
  const home = await homeP;
  const { zoe, board } = home;

  for (const contractName of contracts) {
    const contractPath = `./contracts/${contractName}`;
    const bundle = await import(contractPath);

    console.log(`Deploying ${contractName}...`);
    const installation = await E(zoe).install(bundle.start);
    console.log(`${contractName} installed with installationHandle`, installation);

    // Store the installation in the board for frontend access
    const installationId = await E(board).getId(installation);
    console.log(`${contractName} installation stored with ID: ${installationId}`);
  }
}

deployContracts(E(home))
  .then(() => console.log('All contracts deployed successfully'))
  .catch(err => console.error('Error deploying contracts:', err));
