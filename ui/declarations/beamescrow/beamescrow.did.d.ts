import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type AccountIdentifier = Uint8Array | number[];
export type AccountIdentifier__1 = Uint8Array | number[];
export type Allocation = bigint;
export interface BeamEscrowContract {
  'id' : EscrowId__1,
  'buyerClaimable' : TokenAmount__1,
  'createdAt' : Time,
  'escrowAmount' : TokenAmount__1,
  'initialDeposit' : TokenAmount__1,
  'creatorClaimed' : TokenAmount__1,
  'updatedAt' : Time,
  'creatorPrincipal' : Principal,
  'buyerPrincipal' : Principal,
  'tokenType' : TokenType__1,
  'buyerClaimed' : TokenAmount__1,
  'creatorClaimable' : TokenAmount__1,
}
export type BeamRelationObjId = string;
export type BitcoinAddress = string;
export type BlockIndex = bigint;
export interface CanisterMemoryInfo {
  'rts_max_live_size' : bigint,
  'rts_memory_size' : bigint,
  'rts_total_allocation' : bigint,
  'rts_heap_size' : bigint,
  'rts_reclaimed' : bigint,
  'rts_version' : string,
}
export type ErrorCode = { 'escrow_token_owned_not_matched' : string } |
  { 'escrow_contract_verification_failed' : string } |
  { 'escrow_beam_failed' : string } |
  { 'escrow_contract_not_found' : string } |
  { 'escrow_payment_not_found' : string };
export type ErrorCode__1 = { 'escrow_token_owned_not_matched' : string } |
  { 'escrow_invalid_token_type' : string } |
  { 'escrow_token_transfer_failed' : string } |
  { 'escrow_contract_verification_failed' : string } |
  { 'escrow_contract_not_found' : string } |
  { 'escrow_payment_not_found' : string } |
  { 'escrow_invalid_allocations' : string } |
  { 'escrow_invalid_accountid' : string } |
  { 'escrow_bitcoin_create_transfer_failed' : string } |
  { 'escrow_invalid_access' : string };
export interface EscrowContract {
  'id' : EscrowId__1,
  'buyerAccountIdentifier' : [] | [AccountIdentifier],
  'buyerClaimable' : TokenAmount__1,
  'createdAt' : Time,
  'escrowAmount' : TokenAmount__1,
  'initialDeposit' : TokenAmount__1,
  'creatorClaimed' : TokenAmount__1,
  'updatedAt' : Time,
  'creatorPrincipal' : Principal,
  'buyerPrincipal' : Principal,
  'paymentType' : EscrowPaymentType,
  'tokenType' : TokenType__1,
  'buyerClaimed' : TokenAmount__1,
  'creatorAccountIdentifier' : [] | [AccountIdentifier],
  'creatorClaimable' : TokenAmount__1,
}
export type EscrowId = number;
export type EscrowId__1 = number;
export type EscrowPaymentType = { 'beam' : null } |
  { 'lumpSum' : null };
export type EscrowPaymentType__1 = { 'beam' : null } |
  { 'lumpSum' : null };
export type Result = { 'ok' : string } |
  { 'err' : ErrorCode };
export type Result_1 = { 'ok' : string } |
  { 'err' : ErrorCode__1 };
export type Result_2 = { 'ok' : BeamEscrowContract } |
  { 'err' : ErrorCode__1 };
export type Result_3 = { 'ok' : EscrowId } |
  { 'err' : ErrorCode };
export type Satoshi = bigint;
export type Time = bigint;
export type Time__1 = bigint;
export type TokenAmount = bigint;
export type TokenAmount__1 = bigint;
export type TokenType = { 'btc' : null } |
  { 'icp' : null } |
  { 'xtc' : null };
export type TokenType__1 = { 'btc' : null } |
  { 'icp' : null } |
  { 'xtc' : null };
export interface Tokens { 'e8s' : bigint }
export interface _SERVICE {
  'buyerClaim' : ActorMethod<
    [EscrowId, TokenType, AccountIdentifier__1],
    Result_1
  >,
  'canisterAccount' : ActorMethod<[], AccountIdentifier__1>,
  'canisterBalance' : ActorMethod<[TokenType], Tokens>,
  'canisterVersion' : ActorMethod<[], number>,
  'createBTCEscrow' : ActorMethod<
    [TokenAmount, EscrowPaymentType__1, Time__1, Principal, Principal],
    Result_3
  >,
  'createBeamEscrow' : ActorMethod<
    [TokenAmount, TokenType, BlockIndex, Time__1, Principal, Principal],
    Result_3
  >,
  'createRelationBeamEscrow' : ActorMethod<
    [
      TokenAmount,
      TokenType,
      BlockIndex,
      Time__1,
      Principal,
      Principal,
      BeamRelationObjId,
    ],
    Result_3
  >,
  'creatorClaimBTC' : ActorMethod<[EscrowId, BitcoinAddress], Result_1>,
  'creatorClaimByAccountId' : ActorMethod<
    [EscrowId, TokenType, AccountIdentifier__1],
    Result_1
  >,
  'creatorClaimByPrincipal' : ActorMethod<
    [EscrowId, TokenType, Principal],
    Result_1
  >,
  'getActorBalance' : ActorMethod<[], bigint>,
  'getBitcoinBalance' : ActorMethod<[], Satoshi>,
  'getBitcoinP2pkhAddress' : ActorMethod<[], BitcoinAddress>,
  'getCanisterMemoryInfo' : ActorMethod<[], CanisterMemoryInfo>,
  'getManager' : ActorMethod<[], Principal>,
  'getOtherBitcoinBalance' : ActorMethod<[string], Satoshi>,
  'healthCheck' : ActorMethod<[], boolean>,
  'loadAllEscrow' : ActorMethod<[TokenType], Array<EscrowContract>>,
  'queryMyBeamEscrow' : ActorMethod<[EscrowId], Result_2>,
  'queryMyBeamEscrowBySender' : ActorMethod<[EscrowId, Principal], Result_2>,
  'queryMyBeams' : ActorMethod<[], Array<BeamEscrowContract>>,
  'sumAllEscrowTokens' : ActorMethod<[TokenType], TokenAmount>,
  'updateEscrowAllocation' : ActorMethod<
    [EscrowId, Allocation, Allocation, Allocation],
    Result_1
  >,
  'verifyBTCDeposit' : ActorMethod<[TokenAmount], Result>,
}
