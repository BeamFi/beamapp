export const idlFactory = ({ IDL }) => {
  const EscrowId = IDL.Nat32
  const TokenType = IDL.Variant({
    btc: IDL.Null,
    icp: IDL.Null,
    xtc: IDL.Null
  })
  const AccountIdentifier__1 = IDL.Vec(IDL.Nat8)
  const ErrorCode__1 = IDL.Variant({
    escrow_token_owned_not_matched: IDL.Text,
    escrow_invalid_token_type: IDL.Text,
    escrow_token_transfer_failed: IDL.Text,
    escrow_contract_verification_failed: IDL.Text,
    escrow_contract_not_found: IDL.Text,
    escrow_payment_not_found: IDL.Text,
    escrow_invalid_allocations: IDL.Text,
    escrow_invalid_accountid: IDL.Text,
    escrow_bitcoin_create_transfer_failed: IDL.Text,
    escrow_invalid_access: IDL.Text
  })
  const Result_1 = IDL.Variant({ ok: IDL.Text, err: ErrorCode__1 })
  const Tokens = IDL.Record({ e8s: IDL.Nat64 })
  const TokenAmount = IDL.Nat64
  const EscrowPaymentType__1 = IDL.Variant({
    beam: IDL.Null,
    lumpSum: IDL.Null
  })
  const Time__1 = IDL.Int
  const ErrorCode = IDL.Variant({
    escrow_token_owned_not_matched: IDL.Text,
    escrow_contract_verification_failed: IDL.Text,
    escrow_beam_failed: IDL.Text,
    escrow_contract_not_found: IDL.Text,
    escrow_payment_not_found: IDL.Text
  })
  const Result_3 = IDL.Variant({ ok: EscrowId, err: ErrorCode })
  const BlockIndex = IDL.Nat64
  const BeamRelationObjId = IDL.Text
  const BitcoinAddress = IDL.Text
  const Satoshi = IDL.Nat64
  const CanisterMemoryInfo = IDL.Record({
    rts_max_live_size: IDL.Nat,
    rts_memory_size: IDL.Nat,
    rts_total_allocation: IDL.Nat,
    rts_heap_size: IDL.Nat,
    rts_reclaimed: IDL.Nat,
    rts_version: IDL.Text
  })
  const EscrowId__1 = IDL.Nat32
  const AccountIdentifier = IDL.Vec(IDL.Nat8)
  const TokenAmount__1 = IDL.Nat64
  const Time = IDL.Int
  const EscrowPaymentType = IDL.Variant({
    beam: IDL.Null,
    lumpSum: IDL.Null
  })
  const TokenType__1 = IDL.Variant({
    btc: IDL.Null,
    icp: IDL.Null,
    xtc: IDL.Null
  })
  const EscrowContract = IDL.Record({
    id: EscrowId__1,
    buyerAccountIdentifier: IDL.Opt(AccountIdentifier),
    buyerClaimable: TokenAmount__1,
    createdAt: Time,
    escrowAmount: TokenAmount__1,
    initialDeposit: TokenAmount__1,
    creatorClaimed: TokenAmount__1,
    updatedAt: Time,
    creatorPrincipal: IDL.Principal,
    buyerPrincipal: IDL.Principal,
    paymentType: EscrowPaymentType,
    tokenType: TokenType__1,
    buyerClaimed: TokenAmount__1,
    creatorAccountIdentifier: IDL.Opt(AccountIdentifier),
    creatorClaimable: TokenAmount__1
  })
  const BeamEscrowContract = IDL.Record({
    id: EscrowId__1,
    buyerClaimable: TokenAmount__1,
    createdAt: Time,
    escrowAmount: TokenAmount__1,
    initialDeposit: TokenAmount__1,
    creatorClaimed: TokenAmount__1,
    updatedAt: Time,
    creatorPrincipal: IDL.Principal,
    buyerPrincipal: IDL.Principal,
    tokenType: TokenType__1,
    buyerClaimed: TokenAmount__1,
    creatorClaimable: TokenAmount__1
  })
  const Result_2 = IDL.Variant({
    ok: BeamEscrowContract,
    err: ErrorCode__1
  })
  const Allocation = IDL.Nat64
  const Result = IDL.Variant({ ok: IDL.Text, err: ErrorCode })
  return IDL.Service({
    buyerClaim: IDL.Func(
      [EscrowId, TokenType, AccountIdentifier__1],
      [Result_1],
      []
    ),
    canisterAccount: IDL.Func([], [AccountIdentifier__1], ["query"]),
    canisterBalance: IDL.Func([TokenType], [Tokens], []),
    canisterVersion: IDL.Func([], [IDL.Nat32], ["query"]),
    createBTCEscrow: IDL.Func(
      [
        TokenAmount,
        EscrowPaymentType__1,
        Time__1,
        IDL.Principal,
        IDL.Principal
      ],
      [Result_3],
      []
    ),
    createBeamEscrow: IDL.Func(
      [TokenAmount, BlockIndex, Time__1, IDL.Principal, IDL.Principal],
      [Result_3],
      []
    ),
    createRelationBeamEscrow: IDL.Func(
      [
        TokenAmount,
        BlockIndex,
        Time__1,
        IDL.Principal,
        IDL.Principal,
        BeamRelationObjId
      ],
      [Result_3],
      []
    ),
    creatorClaim: IDL.Func(
      [EscrowId, TokenType, AccountIdentifier__1],
      [Result_1],
      []
    ),
    creatorClaimBTC: IDL.Func(
      [EscrowId, TokenType, BitcoinAddress],
      [Result_1],
      []
    ),
    creatorClaimByPrincipal: IDL.Func(
      [EscrowId, TokenType, IDL.Principal],
      [Result_1],
      []
    ),
    getActorBalance: IDL.Func([], [IDL.Nat], ["query"]),
    getBitcoinBalance: IDL.Func([], [Satoshi], []),
    getBitcoinP2pkhAddress: IDL.Func([], [BitcoinAddress], []),
    getCanisterMemoryInfo: IDL.Func([], [CanisterMemoryInfo], ["query"]),
    getManager: IDL.Func([], [IDL.Principal], ["query"]),
    getOtherBitcoinBalance: IDL.Func([IDL.Text], [Satoshi], []),
    healthCheck: IDL.Func([], [IDL.Bool], ["query"]),
    loadAllEscrow: IDL.Func([TokenType], [IDL.Vec(EscrowContract)], ["query"]),
    queryMyBeamEscrow: IDL.Func([EscrowId], [Result_2], ["query"]),
    queryMyBeamEscrowBySender: IDL.Func(
      [EscrowId, IDL.Principal],
      [Result_2],
      ["query"]
    ),
    queryMyBeams: IDL.Func([], [IDL.Vec(BeamEscrowContract)], ["query"]),
    sumAllEscrowTokens: IDL.Func([TokenType], [TokenAmount], ["query"]),
    updateEscrowAllocation: IDL.Func(
      [EscrowId, Allocation, Allocation, Allocation],
      [Result_1],
      []
    ),
    verifyBTCDeposit: IDL.Func([TokenAmount], [Result], [])
  })
}
export const init = ({ IDL }) => {
  return []
}
