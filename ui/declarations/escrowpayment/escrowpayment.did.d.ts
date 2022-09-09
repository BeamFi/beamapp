import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type AccountIdentifier = Array<number>;
export type AccountIdentifier__1 = Array<number>;
export type Allocation = bigint;
export interface BeamEscrowContract {
  'id' : EscrowId__1,
  'buyerClaimable' : TokenAmount,
  'createdAt' : Time,
  'escrowAmount' : TokenAmount,
  'initialDeposit' : TokenAmount,
  'creatorClaimed' : TokenAmount,
  'updatedAt' : Time,
  'creatorPrincipal' : Principal,
  'buyerPrincipal' : Principal,
  'tokenType' : TokenType,
  'buyerClaimed' : TokenAmount,
  'creatorClaimable' : TokenAmount,
}
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
  { 'escrow_invalid_token_type' : string } |
  { 'escrow_token_transfer_failed' : string } |
  { 'escrow_contract_verification_failed' : string } |
  { 'escrow_contract_not_found' : string } |
  { 'escrow_payment_not_found' : string } |
  { 'escrow_invalid_allocations' : string } |
  { 'escrow_invalid_accountid' : string } |
  { 'escrow_invalid_access' : string };
export type ErrorCode__1 = { 'signup_noteligible' : string } |
  { 'portfolio_notfound' : string } |
  { 'wallet_required' : string } |
  { 'escrow_token_owned_not_matched' : string } |
  { 'jobflow_has_completed' : string } |
  { 'user_notfound' : string } |
  { 'usermodel_notfound' : string } |
  { 'file_notfound' : string } |
  { 'duplicated_notifymode' : string } |
  { 'invalid_state_change' : string } |
  { 'escrow_contract_verification_failed' : string } |
  { 'mint_err' : string } |
  { 'nft_token_id_missing' : string } |
  { 'image_notfound' : string } |
  { 'escrow_beam_failed' : string } |
  { 'escrow_contract_not_found' : string } |
  { 'verify_email_failed' : string } |
  { 'escrow_payment_not_found' : string } |
  { 'nft_already_claimed' : string } |
  { 'chat_messages_notfound' : string } |
  { 'jobflow_notfound' : string } |
  { 'duplicated_username' : string } |
  { 'plug_connected_other_user' : string } |
  { 'user_verification_failed' : string } |
  { 'incompleted_job' : string } |
  { 'nft_claim_processing' : string } |
  { 'signup_reservecutoff' : string } |
  { 'permission_denied' : string } |
  { 'signup_maxusers_reached' : string } |
  { 'job_notfound' : string };
export interface EscrowContract {
  'id' : EscrowId__1,
  'buyerAccountIdentifier' : [] | [AccountIdentifier],
  'buyerClaimable' : TokenAmount,
  'createdAt' : Time,
  'escrowAmount' : TokenAmount,
  'initialDeposit' : TokenAmount,
  'creatorClaimed' : TokenAmount,
  'updatedAt' : Time,
  'jobFlowId' : JobFlowId__1,
  'creatorPrincipal' : Principal,
  'buyerPrincipal' : Principal,
  'paymentType' : EscrowPaymentType,
  'tokenType' : TokenType,
  'buyerClaimed' : TokenAmount,
  'creatorAccountIdentifier' : [] | [AccountIdentifier],
  'creatorClaimable' : TokenAmount,
}
export type EscrowId = number;
export type EscrowId__1 = number;
export type EscrowPaymentType = { 'beam' : null } |
  { 'lumpSum' : null };
export type EscrowPaymentType__1 = { 'beam' : null } |
  { 'lumpSum' : null };
export type JobFlowId = number;
export type JobFlowId__1 = number;
export type Result = { 'ok' : string } |
  { 'err' : ErrorCode };
export type Result_1 = { 'ok' : string } |
  { 'err' : ErrorCode__1 };
export type Result_2 = { 'ok' : BeamEscrowContract } |
  { 'err' : ErrorCode };
export type Result_3 = { 'ok' : EscrowContract } |
  { 'err' : ErrorCode };
export type Result_4 = { 'ok' : EscrowId } |
  { 'err' : ErrorCode__1 };
export type Time = bigint;
export type Time__1 = bigint;
export type TokenAmount = bigint;
export type TokenAmount__1 = bigint;
export type TokenType = { 'icp' : null };
export type TokenType__1 = { 'icp' : null };
export interface Tokens { 'e8s' : bigint }
export interface _SERVICE {
  'buyerClaim' : ActorMethod<
    [EscrowId, TokenType__1, AccountIdentifier__1],
    Result,
  >,
  'canisterAccount' : ActorMethod<[], AccountIdentifier__1>,
  'canisterBalance' : ActorMethod<[TokenType__1], Tokens>,
  'canisterVersion' : ActorMethod<[], number>,
  'createBeamEscrow' : ActorMethod<
    [TokenAmount__1, BlockIndex, Time__1, Principal, Principal],
    Result_4,
  >,
  'createEscrow' : ActorMethod<
    [
      JobFlowId,
      TokenAmount__1,
      EscrowPaymentType__1,
      BlockIndex,
      Time__1,
      Principal,
      Principal,
    ],
    Result_4,
  >,
  'creatorClaim' : ActorMethod<
    [EscrowId, TokenType__1, AccountIdentifier__1],
    Result,
  >,
  'getActorBalance' : ActorMethod<[], bigint>,
  'getCanisterMemoryInfo' : ActorMethod<[], CanisterMemoryInfo>,
  'getManager' : ActorMethod<[], Principal>,
  'healthCheck' : ActorMethod<[], boolean>,
  'loadAllEscrow' : ActorMethod<[], Array<EscrowContract>>,
  'loadEscrow' : ActorMethod<[JobFlowId], Result_3>,
  'queryMyBeamEscrow' : ActorMethod<[EscrowId], Result_2>,
  'queryMyBeams' : ActorMethod<[], Array<BeamEscrowContract>>,
  'releasePaymentToCreator' : ActorMethod<[JobFlowId], Result>,
  'returnExtraICP' : ActorMethod<[], Result_1>,
  'updateEscrowAllocation' : ActorMethod<
    [EscrowId, Allocation, Allocation, Allocation],
    Result,
  >,
}
