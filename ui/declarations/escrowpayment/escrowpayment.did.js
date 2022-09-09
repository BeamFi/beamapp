export const idlFactory = ({ IDL }) => {
  const JobFlowId = IDL.Nat32;
  const TokenType__1 = IDL.Variant({ 'icp' : IDL.Null });
  const AccountIdentifier__1 = IDL.Vec(IDL.Nat8);
  const ErrorCode = IDL.Variant({
    'escrow_token_owned_not_matched' : IDL.Text,
    'escrow_invalid_token_type' : IDL.Text,
    'escrow_token_transfer_failed' : IDL.Text,
    'escrow_contract_verification_failed' : IDL.Text,
    'escrow_contract_not_found' : IDL.Text,
    'escrow_payment_not_found' : IDL.Text,
    'escrow_invalid_allocations' : IDL.Text,
    'escrow_invalid_accountid' : IDL.Text,
    'escrow_invalid_access' : IDL.Text,
  });
  const Result = IDL.Variant({ 'ok' : IDL.Text, 'err' : ErrorCode });
  const Tokens = IDL.Record({ 'e8s' : IDL.Nat64 });
  const TokenAmount__1 = IDL.Nat64;
  const BlockIndex = IDL.Nat64;
  const Time__1 = IDL.Int;
  const EscrowId = IDL.Nat32;
  const ErrorCode__1 = IDL.Variant({
    'signup_noteligible' : IDL.Text,
    'portfolio_notfound' : IDL.Text,
    'wallet_required' : IDL.Text,
    'escrow_token_owned_not_matched' : IDL.Text,
    'jobflow_has_completed' : IDL.Text,
    'user_notfound' : IDL.Text,
    'usermodel_notfound' : IDL.Text,
    'file_notfound' : IDL.Text,
    'duplicated_notifymode' : IDL.Text,
    'invalid_state_change' : IDL.Text,
    'escrow_contract_verification_failed' : IDL.Text,
    'mint_err' : IDL.Text,
    'nft_token_id_missing' : IDL.Text,
    'image_notfound' : IDL.Text,
    'escrow_beam_failed' : IDL.Text,
    'escrow_contract_not_found' : IDL.Text,
    'verify_email_failed' : IDL.Text,
    'escrow_payment_not_found' : IDL.Text,
    'nft_already_claimed' : IDL.Text,
    'chat_messages_notfound' : IDL.Text,
    'jobflow_notfound' : IDL.Text,
    'duplicated_username' : IDL.Text,
    'plug_connected_other_user' : IDL.Text,
    'user_verification_failed' : IDL.Text,
    'incompleted_job' : IDL.Text,
    'nft_claim_processing' : IDL.Text,
    'signup_reservecutoff' : IDL.Text,
    'permission_denied' : IDL.Text,
    'signup_maxusers_reached' : IDL.Text,
    'job_notfound' : IDL.Text,
  });
  const Result_4 = IDL.Variant({ 'ok' : EscrowId, 'err' : ErrorCode__1 });
  const EscrowPaymentType__1 = IDL.Variant({
    'beam' : IDL.Null,
    'lumpSum' : IDL.Null,
  });
  const CanisterMemoryInfo = IDL.Record({
    'rts_max_live_size' : IDL.Nat,
    'rts_memory_size' : IDL.Nat,
    'rts_total_allocation' : IDL.Nat,
    'rts_heap_size' : IDL.Nat,
    'rts_reclaimed' : IDL.Nat,
    'rts_version' : IDL.Text,
  });
  const EscrowId__1 = IDL.Nat32;
  const AccountIdentifier = IDL.Vec(IDL.Nat8);
  const TokenAmount = IDL.Nat64;
  const Time = IDL.Int;
  const JobFlowId__1 = IDL.Nat32;
  const EscrowPaymentType = IDL.Variant({
    'beam' : IDL.Null,
    'lumpSum' : IDL.Null,
  });
  const TokenType = IDL.Variant({ 'icp' : IDL.Null });
  const EscrowContract = IDL.Record({
    'id' : EscrowId__1,
    'buyerAccountIdentifier' : IDL.Opt(AccountIdentifier),
    'buyerClaimable' : TokenAmount,
    'createdAt' : Time,
    'escrowAmount' : TokenAmount,
    'initialDeposit' : TokenAmount,
    'creatorClaimed' : TokenAmount,
    'updatedAt' : Time,
    'jobFlowId' : JobFlowId__1,
    'creatorPrincipal' : IDL.Principal,
    'buyerPrincipal' : IDL.Principal,
    'paymentType' : EscrowPaymentType,
    'tokenType' : TokenType,
    'buyerClaimed' : TokenAmount,
    'creatorAccountIdentifier' : IDL.Opt(AccountIdentifier),
    'creatorClaimable' : TokenAmount,
  });
  const Result_3 = IDL.Variant({ 'ok' : EscrowContract, 'err' : ErrorCode });
  const BeamEscrowContract = IDL.Record({
    'id' : EscrowId__1,
    'buyerClaimable' : TokenAmount,
    'createdAt' : Time,
    'escrowAmount' : TokenAmount,
    'initialDeposit' : TokenAmount,
    'creatorClaimed' : TokenAmount,
    'updatedAt' : Time,
    'creatorPrincipal' : IDL.Principal,
    'buyerPrincipal' : IDL.Principal,
    'tokenType' : TokenType,
    'buyerClaimed' : TokenAmount,
    'creatorClaimable' : TokenAmount,
  });
  const Result_2 = IDL.Variant({
    'ok' : BeamEscrowContract,
    'err' : ErrorCode,
  });
  const Result_1 = IDL.Variant({ 'ok' : IDL.Text, 'err' : ErrorCode__1 });
  const Allocation = IDL.Nat64;
  return IDL.Service({
    'buyerClaim' : IDL.Func(
        [JobFlowId, TokenType__1, AccountIdentifier__1],
        [Result],
        [],
      ),
    'canisterAccount' : IDL.Func([], [AccountIdentifier__1], ['query']),
    'canisterBalance' : IDL.Func([TokenType__1], [Tokens], []),
    'canisterVersion' : IDL.Func([], [IDL.Nat32], ['query']),
    'createBeamEscrow' : IDL.Func(
        [TokenAmount__1, BlockIndex, Time__1, IDL.Principal, IDL.Principal],
        [Result_4],
        [],
      ),
    'createEscrow' : IDL.Func(
        [
          JobFlowId,
          TokenAmount__1,
          EscrowPaymentType__1,
          BlockIndex,
          Time__1,
          IDL.Principal,
          IDL.Principal,
        ],
        [Result_4],
        [],
      ),
    'creatorClaim' : IDL.Func(
        [JobFlowId, TokenType__1, AccountIdentifier__1],
        [Result],
        [],
      ),
    'getActorBalance' : IDL.Func([], [IDL.Nat], ['query']),
    'getCanisterMemoryInfo' : IDL.Func([], [CanisterMemoryInfo], ['query']),
    'getManager' : IDL.Func([], [IDL.Principal], ['query']),
    'healthCheck' : IDL.Func([], [IDL.Bool], ['query']),
    'loadAllEscrow' : IDL.Func([], [IDL.Vec(EscrowContract)], ['query']),
    'loadEscrow' : IDL.Func([JobFlowId], [Result_3], ['query']),
    'queryMyBeamEscrow' : IDL.Func([EscrowId], [Result_2], ['query']),
    'queryMyBeams' : IDL.Func([], [IDL.Vec(BeamEscrowContract)], ['query']),
    'releasePaymentToCreator' : IDL.Func([JobFlowId], [Result], []),
    'returnExtraICP' : IDL.Func([], [Result_1], []),
    'updateEscrowAllocation' : IDL.Func(
        [EscrowId, Allocation, Allocation, Allocation],
        [Result],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
