import moment from "moment"
import { EscrowPaymentConfig } from "../../config"
import { ratePerHr } from "../../utils/date"
import { convertCandidDateToJSDate, unwrapVariant } from "../TypeConversion"

import {
  TokenType,
  type EscrowContract
} from "../../declarations/beamescrow/beamescrow.did"
import { esToHuman } from "../../utils/token"
import { BeamSupportedTokenType } from "../../config/beamconfig"

export class EscrowContractClass {
  candidModel: EscrowContract

  constructor(candidModel) {
    this.candidModel = candidModel
  }

  id = () => {
    return this.candidModel.id
  }

  createdAtHuman = () => {
    const createdAt = convertCandidDateToJSDate(this.candidModel.createdAt)
    return moment.utc(createdAt).local().format("Do MMM YYYY HH:mm:ss")
  }

  paymentType = () => {
    const paymentTypeVariant = this.candidModel.paymentType
    return unwrapVariant(paymentTypeVariant)
  }

  colorOfPaymentType = () => {
    const paymentType = this.paymentType()
    const { LumpSum, Beam } = EscrowPaymentConfig.PaymentType

    switch (paymentType) {
      case LumpSum:
        return "yellow"
      case Beam:
        return "green"
    }
  }

  isBeamPayment = () => {
    return this.paymentType() == EscrowPaymentConfig.PaymentType.Beam
  }

  isLumpSumPayment = () => {
    return this.paymentType() == EscrowPaymentConfig.PaymentType.LumpSum
  }

  tokenTypeRaw = (): TokenType => {
    return this.candidModel.tokenType
  }

  tokenType = (): BeamSupportedTokenType => {
    return unwrapVariant(this.candidModel.tokenType)
  }

  tokenTypeName = () => {
    return this.tokenType()?.toUpperCase()
  }

  initialDeposit = () => {
    const allocationE6S = this.candidModel.initialDeposit
    const convFunc = this.tokenConversionFunc()
    return convFunc(allocationE6S)
  }

  tokenConversionFunc = () => {
    return esToHuman(this.tokenType())
  }

  escrowAmount = () => {
    const allocationE6S = this.candidModel.escrowAmount
    const convFunc = this.tokenConversionFunc()
    return convFunc(allocationE6S)
  }

  creatorClaimable = () => {
    const allocationE6S = this.candidModel.creatorClaimable
    const convFunc = this.tokenConversionFunc()
    return convFunc(allocationE6S)
  }

  creatorClaimed = () => {
    const allocationE6S = this.candidModel.creatorClaimed
    const convFunc = this.tokenConversionFunc()
    return convFunc(allocationE6S)
  }

  buyerClaimable = () => {
    const allocationE6S = this.candidModel.buyerClaimable
    const convFunc = this.tokenConversionFunc()
    return convFunc(allocationE6S)
  }

  buyerClaimed = () => {
    const allocationE6S = this.candidModel.buyerClaimed
    const convFunc = this.tokenConversionFunc()
    return convFunc(allocationE6S)
  }

  totalOwnedByCanister = () => {
    return this.escrowAmount() + this.creatorClaimable() + this.buyerClaimable()
  }

  buyerPrincipalId = () => {
    return this.candidModel.buyerPrincipal.toString()
  }

  creatorPrincipalId = () => {
    return this.candidModel.creatorPrincipal.toString()
  }

  creatorTotalOwned = () => {
    return this.creatorClaimed() + this.creatorClaimable()
  }

  creatorOwnedPercentage = () => {
    const totalTokens = this.initialDeposit()
    const creatorOwnedPercent =
      totalTokens === 0 ? 0 : this.creatorTotalOwned() / totalTokens

    return creatorOwnedPercent
  }

  otherPartyPrincipalId = myPrincipalId => {
    const buyerPrincipalId = this.buyerPrincipalId()
    const creatorPrincipalId = this.creatorPrincipalId()

    if (myPrincipalId == buyerPrincipalId) {
      return creatorPrincipalId
    }

    return buyerPrincipalId
  }

  isBeamRecipient = myPrincipalId => {
    const creatorPrincipalId = this.creatorPrincipalId()
    return myPrincipalId == creatorPrincipalId
  }

  beamRatePerHr = (startDateInMillSecs, dueDateInMilliSecs) => {
    const totalTokens = this.initialDeposit()
    return ratePerHr(startDateInMillSecs, dueDateInMilliSecs, totalTokens)
  }
}
