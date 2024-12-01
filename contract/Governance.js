import { makeIssuerKit } from '@agoric/ertp';
import { assert, details } from '@agoric/assert';

const start = async (zcf) => {
  const { issuer, mint, brand } = makeIssuerKit('VoteToken');

  // Proposal storage
  const proposals = new Map();

  // Create a new proposal
  const createProposal = (proposalId, proposalDetails) => {
    assert(
      !proposals.has(proposalId),
      details`Proposal with ID ${proposalId} already exists`
    );
    proposals.set(proposalId, {
      details: proposalDetails,
      votes: { yes: 0, no: 0 },
      isOpen: true,
    });
    return `Proposal ${proposalId} created successfully.`;
  };

  // Cast a vote
  const vote = (proposalId, voteType, amount) => {
    assert(
      proposals.has(proposalId),
      details`No proposal found with ID ${proposalId}`
    );
    const proposal = proposals.get(proposalId);
    assert(proposal.isOpen, details`Voting for this proposal is closed`);

    assert(
      voteType === 'yes' || voteType === 'no',
      details`Invalid vote type: ${voteType}`
    );

    proposal.votes[voteType] += amount;
    return `Vote cast successfully for proposal ${proposalId}.`;
  };

  // Close voting on a proposal
  const closeProposal = (proposalId) => {
    assert(
      proposals.has(proposalId),
      details`No proposal found with ID ${proposalId}`
    );
    const proposal = proposals.get(proposalId);
    assert(proposal.isOpen, details`Voting for this proposal is already closed`);

    proposal.isOpen = false;
    const result =
      proposal.votes.yes > proposal.votes.no ? 'Passed' : 'Rejected';

    return `Proposal ${proposalId} voting closed. Result: ${result}`;
  };

  return harden({
    createProposal,
    vote,
    closeProposal,
    getProposals: () => proposals,
  });
};

export { start };
