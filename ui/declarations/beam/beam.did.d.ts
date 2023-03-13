import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type BeamId = number;
export type BeamId__1 = number;
export interface BeamReadModel {
  'id' : BeamId,
  'status' : BeamStatus__1,
  'beamType' : BeamType,
  'createdAt' : Time,
  'escrowId' : EscrowId__1,
  'scheduledEndDate' : Time,
  'startDate' : Time,
}
export interface BeamRelationModel { 'objId' : BeamRelationObjId }
export type BeamRelationObjId = string;
export type BeamRelationObjId__1 = string;
export type BeamStatus = { 'created' : null } |
  { 'active' : null } |
  { 'completed' : null } |
  { 'paused' : null };
export type BeamStatus__1 = { 'created' : null } |
  { 'active' : null } |
  { 'completed' : null } |
  { 'paused' : null };
export type BeamType = { 'relation' : BeamRelationModel } |
  { 'payment' : null };
export interface CanisterMemoryInfo {
  'rts_max_live_size' : bigint,
  'rts_memory_size' : bigint,
  'rts_total_allocation' : bigint,
  'rts_heap_size' : bigint,
  'rts_reclaimed' : bigint,
  'rts_version' : string,
}
export type ErrorCode = { 'invalid_beam' : string } |
  { 'beam_notfound' : string } |
  { 'permission_denied' : string };
export type EscrowId = number;
export type EscrowId__1 = number;
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
export type Period = number;
export type Result = { 'ok' : BeamStatus } |
  { 'err' : ErrorCode };
export type Result_1 = { 'ok' : BeamId__1 } |
  { 'err' : ErrorCode };
export type Time = bigint;
export type Time__1 = bigint;
export interface _SERVICE {
  'canisterVersion' : ActorMethod<[], number>,
  'createBeam' : ActorMethod<[EscrowId, Time__1, Period], Result_1>,
  'createRelationBeam' : ActorMethod<
    [EscrowId, Time__1, Period, BeamRelationObjId__1],
    Result_1
  >,
  'getActorBalance' : ActorMethod<[], bigint>,
  'getCanisterMemoryInfo' : ActorMethod<[], CanisterMemoryInfo>,
  'getManager' : ActorMethod<[], Principal>,
  'healthCheck' : ActorMethod<[], boolean>,
  'http_request' : ActorMethod<[HttpRequest], HttpResponse>,
  'http_request_update' : ActorMethod<[HttpRequest], HttpResponse>,
  'queryBeamByEscrowIds' : ActorMethod<
    [Uint32Array | number[]],
    Array<BeamReadModel>
  >,
  'restartBeam' : ActorMethod<[EscrowId], Result>,
  'stopBeam' : ActorMethod<[EscrowId], Result>,
}
