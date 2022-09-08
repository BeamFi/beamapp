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
  const BeamOutId__1 = IDL.Nat32
  const Time = IDL.Int
  const TokenType = IDL.Variant({ icp: IDL.Null })
  const TokenAmount = IDL.Nat64
  const BeamOutModel = IDL.Record({
    id: BeamOutId__1,
    createdAt: Time,
    recipient: IDL.Principal,
    updatedAt: Time,
    tokenType: TokenType,
    amount: TokenAmount,
    durationNumDays: IDL.Nat32
  })
  const Result = IDL.Variant({ ok: BeamOutModel, err: ErrorCode })
  return IDL.Service({
    createBeamOut: IDL.Func(
      [TokenAmount__1, TokenType__1, IDL.Principal, IDL.Nat32],
      [Result_1],
      []
    ),
    loadBeamOutById: IDL.Func([BeamOutId], [Result], ["query"])
  })
}
export const init = ({ IDL }) => {
  return []
}
