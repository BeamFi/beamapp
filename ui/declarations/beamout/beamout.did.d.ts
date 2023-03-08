import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type BeamOutId = number;
export type BeamOutId__1 = number;
export type BeamOutMeetingId = number;
export type BeamOutMeetingId__1 = number;
export interface BeamOutMeetingModel {
  'meetingPassword' : string,
  'meetingId' : BeamOutMeetingId,
}
export interface BeamOutModelV2 {
  'id' : BeamOutId__1,
  'beamOutType' : BeamOutType,
  'createdAt' : Time,
  'recipient' : Principal,
  'updatedAt' : Time,
  'tokenType' : TokenType,
  'amount' : TokenAmount,
  'durationNumDays' : number,
}
export type BeamOutType = { 'meeting' : BeamOutMeetingModel } |
  { 'payment' : null };
export type ErrorCode = { 'invalid_recipient' : string } |
  { 'invalid_id' : string } |
  { 'duplicated_id' : string };
export type HeaderField = [string, string];
export interface HttpRequest {
  'url' : string,
  'method' : string,
  'body' : Uint8Array | number[],
  'headers' : Array<HeaderField>,
}
export interface HttpResponse {
  'body' : Uint8Array | number[],
  'headers' : Array<HeaderField>,
  'upgrade' : boolean,
  'status_code' : number,
}
export type Result = { 'ok' : BeamOutModelV2 } |
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
    Result_1
  >,
  'createBeamOutMeeting' : ActorMethod<
    [
      TokenAmount__1,
      TokenType__1,
      Principal,
      number,
      BeamOutMeetingId__1,
      string,
    ],
    Result_1
  >,
  'getActorBalance' : ActorMethod<[], bigint>,
  'http_request' : ActorMethod<[HttpRequest], HttpResponse>,
  'loadBeamOutById' : ActorMethod<[BeamOutId], Result>,
}
