export const idlFactory = ({ IDL }) => {
  const TokenAmount__1 = IDL.Nat64
  const TokenType__1 = IDL.Variant({ icp: IDL.Null })
  const BeamOutId = IDL.Nat32
  const ErrorCode = IDL.Variant({
    invalid_recipient: IDL.Text,
    invalid_id: IDL.Text,
    duplicated_id: IDL.Text
  })
  const Result_1 = IDL.Variant({ ok: BeamOutId, err: ErrorCode })
  const BeamOutMeetingId__1 = IDL.Nat32
  const HeaderField = IDL.Tuple(IDL.Text, IDL.Text)
  const HttpRequest = IDL.Record({
    url: IDL.Text,
    method: IDL.Text,
    body: IDL.Vec(IDL.Nat8),
    headers: IDL.Vec(HeaderField)
  })
  const HttpResponse = IDL.Record({
    body: IDL.Vec(IDL.Nat8),
    headers: IDL.Vec(HeaderField),
    upgrade: IDL.Bool,
    status_code: IDL.Nat16
  })
  const BeamOutId__1 = IDL.Nat32
  const BeamOutMeetingId = IDL.Nat32
  const BeamOutMeetingModel = IDL.Record({
    meetingPassword: IDL.Text,
    meetingId: BeamOutMeetingId
  })
  const BeamOutType = IDL.Variant({
    meeting: BeamOutMeetingModel,
    payment: IDL.Null
  })
  const Time = IDL.Int
  const TokenType = IDL.Variant({ icp: IDL.Null })
  const TokenAmount = IDL.Nat64
  const BeamOutModelV2 = IDL.Record({
    id: BeamOutId__1,
    beamOutType: BeamOutType,
    createdAt: Time,
    recipient: IDL.Principal,
    updatedAt: Time,
    tokenType: TokenType,
    amount: TokenAmount,
    durationNumDays: IDL.Nat32
  })
  const Result = IDL.Variant({ ok: BeamOutModelV2, err: ErrorCode })
  return IDL.Service({
    createBeamOut: IDL.Func(
      [TokenAmount__1, TokenType__1, IDL.Principal, IDL.Nat32],
      [Result_1],
      []
    ),
    createBeamOutMeeting: IDL.Func(
      [
        TokenAmount__1,
        TokenType__1,
        IDL.Principal,
        IDL.Nat32,
        BeamOutMeetingId__1,
        IDL.Text
      ],
      [Result_1],
      []
    ),
    getActorBalance: IDL.Func([], [IDL.Nat], ["query"]),
    http_request: IDL.Func([HttpRequest], [HttpResponse], ["query"]),
    loadBeamOutById: IDL.Func([BeamOutId], [Result], ["query"])
  })
}
export const init = ({ IDL }) => {
  return []
}
