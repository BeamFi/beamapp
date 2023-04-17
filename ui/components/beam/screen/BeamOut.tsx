import React, { useEffect, useState } from "react"

import Head from "next/head"

import {
  Box,
  Button,
  HStack,
  ListItem,
  OrderedList,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Spacer,
  Stack,
  Text,
  useDisclosure,
  useToast,
  VStack
} from "@chakra-ui/react"

import moment from "moment"

import { BeamHeading } from "../common/BeamHeading"
import { showMediumToast, showToast, showTopToast } from "../../../utils/toast"
import { BeamActionButton } from "../common/BeamActionButton"

// Icon
import { ConfigureBeamOutIcon, RocketIcon } from "../../../icon"

// Form
import { Field, Form, Formik } from "formik"
import { FormNumberInput } from "../../form/FormNumberInput"
import { FormInput } from "../../form/FormInput"
import { BeamCreateLinkSchema } from "../../../schema/beamschema"

// IDL
import XTC_IDL from "../../../declarations/xtc/xtc.did"

// Config
import {
  BeamCreateConfig,
  BeamCreateLinkConfig,
  BeamSupportedTokenType
} from "../../../config/beamconfig"

import { Principal } from "@dfinity/principal"
import {
  makeBeamActor,
  makeBeamOutActor,
  makeEscrowPaymentActor
} from "../../../service/actor/actor-locator"
import { humanToE12s, humanToE8s } from "../../../utils/e8s"
import {
  convertDateToCandid,
  convertToVariant,
  unwrapVariant,
  unwrapVariantValue
} from "../../../model/TypeConversion"

import { canisterId as escrowPaymentCanisterId } from "../../../declarations/beamescrow"

import log from "../../../utils/log"
import { useNavigate, useParams } from "react-router-dom"
import { StandardSpinner } from "../../StandardSpinner"

import { connectPlugForToken, hasSession } from "../../auth/provider/plug"
import { principalToAccountIdentifier } from "../../../utils/account-identifier"
import { TokenTypeData, XTC } from "../../../config"
import { BeamVStack } from "../common/BeamVStack"
import { ratePerHr, ratePerMin } from "../../../utils/date"
import { BeamSelectWalletModal } from "../auth/BeamSelectWalletModal"
import { BeamOutModelV4 } from "../../../declarations/beamout/beamout.did"
import { TokenRadioGroup } from "../common/TokenRadioGroup"
import { esToHuman } from "../../../utils/token"
import { encrypt, importKey, pack } from "../../../utils/crypto"

const HeadlineStack = () => {
  return (
    <VStack
      pt="60px"
      align={{ base: "center", md: "flex-start" }}
      spacing="20px"
    >
      <ConfigureBeamOutIcon
        w={{ base: "220px", md: "300px", lg: "400px", xl: "562px" }}
        h={{ base: "65px", md: "88px", lg: "118", xl: "166px" }}
      />
      <OrderedList
        spacing={{ base: "10px", md: "16px" }}
        fontSize={{ base: "14px", md: "18px" }}
        px="30px"
        color="dark_black"
      >
        <ListItem>Fill out the payment details</ListItem>
        <ListItem>Double check payment details</ListItem>
        <ListItem>Click &quot;Create Beam&quot; and deposit funds!</ListItem>
      </OrderedList>
    </VStack>
  )
}

const MinDuration = ({
  numMins,
  setNumMins,
  showEndDate,
  endDateDesc,
  isReadOnly
}) => {
  return (
    <VStack align="start" w={{ base: "95%", md: "80%" }} spacing="12px">
      <BeamHeading textAlign="left">Duration:</BeamHeading>

      <HStack w="100%">
        <Text color="black_5" fontSize={{ base: "16px", md: "18px" }}>
          {numMins} Minutes
        </Text>
        <Spacer />
        {showEndDate && (
          <Text
            color="black_5"
            fontSize={{ base: "14px", md: "16px" }}
            fontWeight="light"
          >
            (Ending: {endDateDesc()})
          </Text>
        )}
      </HStack>

      {!isReadOnly && (
        <Slider
          defaultValue={numMins}
          onChange={setNumMins}
          min={1}
          max={90}
          step={1}
          isReadOnly={isReadOnly}
        >
          <SliderTrack bg="black_gray">
            <Box position="relative" right={10} />
            <SliderFilledTrack bg="black_5" />
          </SliderTrack>
          <SliderThumb boxSize={6} />
        </Slider>
      )}
    </VStack>
  )
}

const DayDuration = ({
  numDays,
  setNumDays,
  showEndDate,
  endDateDesc,
  isReadOnly
}) => {
  return (
    <VStack align="start" w={{ base: "95%", md: "80%" }} spacing="12px">
      <BeamHeading textAlign="left">Duration:</BeamHeading>

      <HStack w="100%">
        <Text color="black_5" fontSize={{ base: "16px", md: "18px" }}>
          {numDays} Days
        </Text>
        <Spacer />
        {showEndDate && (
          <Text
            color="black_5"
            fontSize={{ base: "14px", md: "16px" }}
            fontWeight="light"
          >
            (Ending: {endDateDesc()})
          </Text>
        )}
      </HStack>

      {!isReadOnly && (
        <Slider
          defaultValue={numDays}
          onChange={setNumDays}
          min={1}
          max={30}
          step={1}
          isReadOnly={isReadOnly}
        >
          <SliderTrack bg="black_gray">
            <Box position="relative" right={10} />
            <SliderFilledTrack bg="black_5" />
          </SliderTrack>
          <SliderThumb boxSize={6} />
        </Slider>
      )}
    </VStack>
  )
}

type BeamOutInProps = {
  setBgColor?: Function
  setHashtags?: Function
}

export const BeamOut = ({ setBgColor, setHashtags }: BeamOutInProps) => {
  const { beamOutId } = useParams()
  const { icp, xtc } = BeamSupportedTokenType

  const initLoading = 1
  const defaultNumMins = 1440
  const defaultNumMinsForMeeting = 30
  const defaultAmount = 1

  const [meetingModel, setMeetingModel] = useState(null)
  const isMeeting = meetingModel != null

  const [numMins, setNumMins] = useState(
    isMeeting ? defaultNumMinsForMeeting : defaultNumMins
  )
  const [amount, setAmount] = useState(defaultAmount)

  const [recipient, setRecipient] = useState("")
  const [tokenType, setTokenType] = useState<BeamSupportedTokenType>(icp)
  const [isFormReadonly, setFormReadonly] = useState(false)

  const tokenName = tokenType.toUpperCase()

  const numDays = numMins / (24 * 60)

  const setNumDays = numDays => {
    setNumMins(numDays * 24 * 60)
  }

  const {
    isOpen: isSelectAuthOpen,
    onOpen: onSelectAuthOpen,
    onClose: onSelectAuthClose
  } = useDisclosure()

  const [isLoading, setLoading] = useState(false)

  const toast = useToast()

  const navigate = useNavigate()

  useEffect(() => {
    setBgColor("beam_blue")
    setHashtags([])

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initLoading])

  useEffect(() => {
    if (beamOutId != null) loadBeamOut(beamOutId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [beamOutId])

  const loadBeamOut = async id => {
    try {
      setLoading(true)
      const beamOutService = await makeBeamOutActor()
      const result = await beamOutService.loadBeamOutById(Number(id))

      if (result.ok) {
        const {
          durationNumMins,
          recipient,
          tokenType,
          amount,
          beamOutType
        }: BeamOutModelV4 = result.ok
        const myMeetingModel = unwrapVariantValue(beamOutType)
        const myTokenType = unwrapVariant(tokenType)

        setMeetingModel(myMeetingModel)

        const esToHumanFunc = esToHuman(tokenType)
        setAmount(esToHumanFunc(amount))
        setRecipient(recipient.toString())
        setNumMins(Number(durationNumMins))
        setTokenType(myTokenType)

        setFormReadonly(true)
      } else if (result.err) {
        log.error(result.err)
        throw new Error(result.err)
      }
    } catch (error) {
      log.error(error)
    } finally {
      setLoading(false)
    }
  }

  const endDateDesc = () => {
    return moment().add(numMins, "minutes").format("MMM Do YYYY, h:mm:ss a")
  }

  const showEndDate = false

  const validateAndConfirm = async values => {
    const { recipient } = values

    const isValid = validateRecipient(recipient)
    if (!isValid) {
      showTopToast(
        toast,
        "Create Beam",
        "The recipient wallet prinicpal ID is invalid.",
        "warning"
      )
      return false
    }

    return true
  }

  const cancelLogin = () => {
    setLoading(false)
  }

  const gotoMeeting = async () => {
    const meetingHost = process.env.NEXT_PUBLIC_MEETING_HOST as string
    const { meetingId, meetingPassword } = meetingModel

    // encrypt query data
    const queryData = JSON.stringify({ meetingId, meetingPassword })
    const { cipher, iv } = await encryptMeetingData(queryData)

    // redirect to meeting host with encrypted query data
    const encodedCipher = encodeURIComponent(pack(cipher))
    const encodedIV = encodeURIComponent(pack(iv))
    const redirectedURL = `${meetingHost}?cipher=${encodedCipher}&iv=${encodedIV}`

    window.location.assign(redirectedURL)
  }

  const encryptMeetingData = async (
    data: string
  ): Promise<{ cipher: ArrayBuffer; iv: Uint8Array }> => {
    const rawKey = process.env.NEXT_PUBLIC_WEB_CRYPTO_KEY as string
    const cryptoKey = await importKey(rawKey)
    return await encrypt(data, cryptoKey)
  }

  const gotoMyBeam = () => {
    navigate("/mybeams")
  }

  const postBeamCreatedSuccess = async () => {
    if (isMeeting) {
      await gotoMeeting()
    } else {
      gotoMyBeam()
    }
  }

  const requestICPTransfer = async escrowAmount => {
    // Create request transfer params
    const escrowPaymentCanisterAccountId = principalToAccountIdentifier(
      Principal.fromText(escrowPaymentCanisterId)
    )

    const params = {
      to: escrowPaymentCanisterAccountId,
      amount: escrowAmount,
      opts: {
        memo: Number(BeamCreateConfig.JobFlowId)
      }
    }

    // Request transfer from Plug
    return await window.ic.plug.requestTransfer(params)
  }

  const requestXTCTransfer = async escrowAmount => {
    let height: number = 0

    const TRANSFER_XTC_TX = {
      idl: XTC_IDL,
      canisterId: XTC.CanisterId,
      methodName: "transferErc20",
      args: [Principal.fromText(escrowPaymentCanisterId), escrowAmount],
      onSuccess: async res => {
        if (res.Ok) {
          height = res.Ok
        } else {
          throw new Error("Block height not found")
        }
      },
      onFail: res => {
        log.logObject("XTC transfer xtc failed", res)
      }
    }

    const result = await window.ic.plug.batchTransactions([TRANSFER_XTC_TX])

    if (result) {
      return { height }
    }

    throw new Error("XTC transfer failed")
  }

  const submit = async (values, actions) => {
    const { amount, recipient } = values

    try {
      const isValid = await validateAndConfirm(values)
      if (!isValid) {
        return
      }

      actions.setSubmitting(true)

      // Check if Plug is available, else show popup mesg
      let isConnected = await hasSession()
      if (!isConnected || window.ic?.plug?.accountId == null) {
        isConnected = await connectPlugForToken({
          showToast,
          toast,
          title: "Create Beam"
        })

        if (!isConnected) {
          actions.setSubmitting(false)
          return
        }
      }

      // Health check
      const escrowService = await makeEscrowPaymentActor()
      const beamService = await makeBeamActor()

      const promiseAllFunc = []
      promiseAllFunc.push(escrowService.healthCheck())
      promiseAllFunc.push(beamService.healthCheck())

      const [isEscrowRunning, isBeamRunning] = await Promise.all(promiseAllFunc)

      if (!isBeamRunning || !isEscrowRunning) {
        showToast(
          toast,
          "Create Beam",
          "Our backend smart contract is currently down. Please try again later.",
          "warning"
        )
        return
      }

      // Request transfer
      showToast(
        toast,
        "Create Beam",
        `1/3 - Requesting transfer of ${amount} ${tokenName} from Plug Wallet to Beam.`,
        "info"
      )

      // Prepare / validate post requestTransfer canister request parameters
      // to catch any potential error before making token transfer
      const myPrincipalId =
        window?.ic?.plug?.sessionManager?.sessionData?.principalId
      const buyerPrincipal = Principal.fromText(myPrincipalId)
      const creatorPrincipal = Principal.fromText(recipient)
      const dueDate = moment()
      dueDate.add(numMins, "minutes")
      const dueDateUTC = moment(dueDate).utc().toDate()

      let escrowAmount: number = 0
      let requestTransferFunc = requestICPTransfer
      switch (tokenType) {
        case icp: {
          requestTransferFunc = requestICPTransfer
          escrowAmount = Number(humanToE8s(amount))
          break
        }
        case xtc: {
          requestTransferFunc = requestXTCTransfer
          escrowAmount = Number(humanToE12s(amount))
        }
      }

      let result = await requestTransferFunc(escrowAmount)
      const blockIndex = result.height

      showMediumToast(
        toast,
        "Create Beam",
        `2/3 - We are creating your Beam now. This step can take up to 30 secs. 🧑‍💻`,
        "info"
      )

      if (isMeeting) {
        result = await escrowService.createRelationBeamEscrow(
          escrowAmount,
          convertToVariant(tokenType),
          blockIndex,
          convertDateToCandid(dueDateUTC),
          buyerPrincipal,
          creatorPrincipal,
          meetingModel.meetingId
        )
      } else {
        result = await escrowService.createBeamEscrow(
          escrowAmount,
          convertToVariant(tokenType),
          blockIndex,
          convertDateToCandid(dueDateUTC),
          buyerPrincipal,
          creatorPrincipal
        )
      }

      if (result.ok) {
        showMediumToast(
          toast,
          "Create Beam",
          "3/3 - We have successfully created your new beam. The deposited payment is now being streamed to the recipient.",
          "success"
        )

        await postBeamCreatedSuccess()
        return
      }

      throw new Error(result.err)
    } catch (error) {
      log.error(error)
      showToast(
        toast,
        "Create Beam",
        "We have a problem submitting your request. Please try again later. If you believe you have deposited the payment, " +
          "please contact us at support@beamfi.app. We would be able glad to help.",
        "error"
      )
    } finally {
      actions.setSubmitting(false)
    }
  }

  const validateRecipient = recipient => {
    try {
      Principal.fromText(recipient)
      return true
    } catch (error) {
      return false
    }
  }

  const beamRate = (totalTokens, rateFunc) => {
    const startDateInMillSecs = moment().valueOf()
    const dueDate = moment()
    dueDate.add(numMins, "minutes")
    const dueDateInMilliSecs = dueDate.valueOf()

    return rateFunc(startDateInMillSecs, dueDateInMilliSecs, totalTokens)
  }

  const tokenIcon = TokenTypeData[tokenType]?.icon

  const onChangeTokenType = event => {
    const tokenType = event.target.value
    setTokenType(tokenType)
  }

  return (
    <Box h="100vh">
      <Stack
        spacing={{ base: "20px", md: "120px" }}
        w="100%"
        color="dark_black"
        fontSize="16px"
        pt={isFormReadonly ? { base: "90px", md: "140px" } : "80px"}
        direction={{ base: "column", md: "row" }}
        justifyContent="center"
        px={{ base: "14px", md: "38px" }}
      >
        <Head>
          <title>Beam Out - Beam</title>
        </Head>
        <HeadlineStack />
        <BeamVStack>
          {isLoading && <StandardSpinner />}
          <Formik
            initialValues={{
              amount: amount,
              recipient: recipient,
              isConfirmed: false
            }}
            validationSchema={BeamCreateLinkSchema}
            onSubmit={submit}
            enableReinitialize
          >
            {({ values, isSubmitting, handleSubmit, setFieldValue }) => (
              <Form style={{ width: "100%" }}>
                <VStack
                  bgColor="white"
                  borderRadius="14px"
                  maxW="700px"
                  spacing={{ base: "24px", md: "32px" }}
                  py="24px"
                >
                  {!isFormReadonly && (
                    <TokenRadioGroup
                      onChangeTokenType={onChangeTokenType}
                      tokenType={tokenType}
                    />
                  )}

                  <Field name="amount">
                    {({ field, form }) => (
                      <FormNumberInput
                        id="amount"
                        field={field}
                        min={BeamCreateLinkConfig.BudgetMinNumTokens}
                        max={BeamCreateLinkConfig.BudgetMaxNumTokens}
                        inputFontSize={{ base: "sm", md: "md" }}
                        w={{ base: "95%", md: "80%" }}
                        isInvalid={form.errors.amount && form.touched.amount}
                        errorMesg={form.errors.amount}
                        setFieldValue={setFieldValue}
                        token={tokenType}
                        TokenIcon={tokenIcon}
                        themeColor="black_5"
                        trackColor="black_gray"
                        isReadOnly={isFormReadonly}
                      >
                        <BeamHeading>{tokenName} Amount:</BeamHeading>
                      </FormNumberInput>
                    )}
                  </Field>

                  <Field name="recipient">
                    {({ field, form }) => (
                      <FormInput
                        id="recipient"
                        field={field}
                        inputFontSize={{ base: "sm", md: "md" }}
                        themeColor="black_5"
                        placeholder="Wallet Principal ID"
                        w={{ base: "95%", md: "80%" }}
                        isInvalid={
                          form.errors.recipient && form.touched.recipient
                        }
                        errorMesg={form.errors.recipient}
                        isReadOnly={isFormReadonly}
                      >
                        <BeamHeading>Recipient Wallet:</BeamHeading>
                      </FormInput>
                    )}
                  </Field>

                  {isMeeting && (
                    <MinDuration
                      numMins={numMins}
                      setNumMins={setNumMins}
                      showEndDate={showEndDate}
                      endDateDesc={endDateDesc}
                      isReadOnly={isFormReadonly}
                    />
                  )}

                  {!isMeeting && (
                    <DayDuration
                      numDays={numDays}
                      setNumDays={setNumDays}
                      showEndDate={showEndDate}
                      endDateDesc={endDateDesc}
                      isReadOnly={isFormReadonly}
                    />
                  )}

                  <Box w="100%" textAlign="center">
                    <BeamActionButton
                      leftIcon={
                        <RocketIcon w="23px" h="23px" color="black_5" />
                      }
                      isLoading={isSubmitting}
                      w={{ base: "95%", md: "80%" }}
                      h="62px"
                      fontWeight="semibold"
                      fontSize="21px"
                      bg="beam_pink"
                      onClick={onSelectAuthOpen}
                    >
                      Create Beam
                    </BeamActionButton>
                    <BeamSelectWalletModal
                      isOpen={isSelectAuthOpen}
                      onClose={onSelectAuthClose}
                      handleAuthUpdate={handleSubmit}
                    />
                    {isLoading && (
                      <Button
                        w="110px"
                        h="38px"
                        color="blue_1"
                        variant="link"
                        textAlign="center"
                        onClick={cancelLogin}
                      >
                        Cancel
                      </Button>
                    )}

                    {isMeeting && (
                      <Text color="gray_light2" pt="20px">
                        Recipient will receive{" "}
                        {beamRate(values.amount, ratePerMin)} {tokenName}/minute
                        for {numMins} minutes ({values.amount} {tokenName}{" "}
                        total)
                      </Text>
                    )}

                    {!isMeeting && (
                      <Text color="gray_light2" pt="20px">
                        Recipient will receive{" "}
                        {beamRate(values.amount, ratePerHr)} {tokenName}/hour
                        for {numMins / 60} hours ({values.amount} {tokenName}{" "}
                        total)
                      </Text>
                    )}
                  </Box>
                </VStack>
              </Form>
            )}
          </Formik>
        </BeamVStack>
      </Stack>
    </Box>
  )
}
