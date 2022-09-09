export const AuthProvider = {
  InternetIdentity: "internetIdentity",
  Plug: "plug"
}

export const OneSecInNano = BigInt(1000000000)
export const OneHourInNano = BigInt(3600000000000)
export const OneDayInNano = BigInt(24) * OneHourInNano

export const EscrowPaymentConfig = {
  ICP: {
    // fee in e8s
    fee: 10000n
  },
  PaymentType: {
    LumpSum: "lumpSum",
    Beam: "beam"
  }
}

export const nameOfEscrowPayment = value => {
  const { LumpSum, Beam } = EscrowPaymentConfig.PaymentType
  switch (value) {
    case LumpSum:
      return "Lump Sum"
    case Beam:
      return "Beam"
  }
}

// 7 days session duration and idle timeout
export const AuthConfig = {
  MaxSessionDurationNanoSecs: BigInt(7) * OneDayInNano,
  CheckInterval: 60 * 1000
}

export const SWRKey = {
  Escrow: "escrow/"
}
