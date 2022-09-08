import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type BeamOutId = number;
export type BeamOutId__1 = number;
export interface BeamOutModel {
  'id' : BeamOutId__1,
  'createdAt' : Time,
  'recipient' : Principal,
  'updatedAt' : Time,
  'tokenType' : TokenType,
  'amount' : TokenAmount,
  'durationNumDays' : number,
}
export type ErrorCode = { 'invalid_recipient' : string } |
  { 'invalid_id' : string } |
  { 'duplicated_id' : string };
export type Result = { 'ok' : BeamOutModel } |
  { 'err' : ErrorCode };
export type Result_1 = { 'ok' : BeamOutId } |
  { 'err' : ErrorCode };
export type Time = bigint;
export type TokenAmount = bigint;
export type TokenAmount__1 = bigint;
export type TokenType = { 'icp' : null };
export type TokenType__1 = { 'icp' : null };
export interface _SERVICE {
  'createBeamOut' : ActorMethod<
    [TokenAmount__1, TokenType__1, Principal, number],
    Result_1,
  >,
  'loadBeamOutById' : ActorMethod<[BeamOutId], Result>,
}
