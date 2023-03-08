import moment from "moment"
import { EscrowPaymentConfig } from "../../config"
import { ratePerHr } from "../../utils/date"
import { e8sToHuman } from "../../utils/e8s"
import { convertCandidDateToJSDate, unwrapVariant } from "../TypeConversion"

import { type EscrowContract } from "../../declarations/beamescrow/escrowpayment.did"

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

  tokenType = () => {
    return unwrapVariant(this.candidModel.tokenType)
  }

  initialDeposit = () => {
    const allocationE6S = this.candidModel.initialDeposit
    return e8sToHuman(allocationE6S)
  }

  escrowAmount = () => {
    const allocationE6S = this.candidModel.escrowAmount
    return e8sToHuman(allocationE6S)
  }

  creatorClaimable = () => {
    const allocationE6S = this.candidModel.creatorClaimable
    return e8sToHuman(allocationE6S)
  }

  creatorClaimed = () => {
    const allocationE6S = this.candidModel.creatorClaimed
    return e8sToHuman(allocationE6S)
  }

  buyerClaimable = () => {
    const allocationE6S = this.candidModel.buyerClaimable
    return e8sToHuman(allocationE6S)
  }

  buyerClaimed = () => {
    const allocationE6S = this.candidModel.buyerClaimed
    return e8sToHuman(allocationE6S)
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
