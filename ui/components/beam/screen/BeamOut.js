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
import { ConfigureBeamOutIcon, ICLogo, RocketIcon } from "../../../icon"

// Form
import { Field, Form, Formik } from "formik"
import { FormNumberInput } from "../../form/FormNumberInput"
import { FormInput } from "../../form/FormInput"
import { BeamCreateLinkSchema } from "../../../schema/beamschema"

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
import { e8sToHuman, humanToE8s } from "../../../utils/e8s"
import {
  convertDateToCandid,
  unwrapVariant
} from "../../../model/TypeConversion"
import { canisterId as escrowPaymentCanisterId } from "../../../declarations/escrowpayment"

import log from "../../../utils/log"
import { useParams } from "react-router-dom"
import { StandardSpinner } from "../../StandardSpinner"

import { connectPlugForToken, isPlugConnected } from "../../auth/provider/plug"
import { principalToAccountIdentifier } from "../../../utils/account-identifier"
import { AuthProvider } from "../../../config"
import { BeamVStack } from "../common/BeamVStack"
import { ratePerHr } from "../../../utils/date"
import { BeamSelectWalletModal } from "../auth/BeamSelectWalletModal"

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

export const BeamOut = ({ setBgColor, setHashtags }) => {
  const { beamOutId } = useParams()

  const initLoading = 1
  const defaultNumDays = 7
  const defaultAmount = 10

  const [numDays, setNumDays] = useState(defaultNumDays)
  const [amount, setAmount] = useState(defaultAmount)
  const [recipient, setRecipient] = useState("")

  const {
    isOpen: isSelectAuthOpen,
    onOpen: onSelectAuthOpen,
    onClose: onSelectAuthClose
  } = useDisclosure()

  const myPrincipalId =
    window?.ic?.plug?.sessionManager?.sessionData?.principalId

  const [isLoading, setLoading] = useState(false)

  const toast = useToast()

  useEffect(() => {
    setBgColor("beam_blue")
    setHashtags([])

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initLoading])

  useEffect(() => {
    if (beamOutId != null) loadBeamOut(beamOutId)
  }, [beamOutId])

  const loadBeamOut = async id => {
    try {
      setLoading(true)
      const beamOutService = await makeBeamOutActor()
      const result = await beamOutService.loadBeamOutById(Number(id))

      if (result.ok) {
        const { durationNumDays, recipient, tokenType, amount } = result.ok
        const tokenTypeString = unwrapVariant(tokenType)

        if (tokenTypeString != BeamSupportedTokenType.icp) {
          throw new Error(`Unsupported token type: ${tokenTypeString}`)
        }

        setAmount(e8sToHuman(amount))
        setRecipient(recipient.toString())
        setNumDays(Number(durationNumDays))
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
    return moment().add(numDays, "days").format("MMM Do YYYY, h:mm:ss a")
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

  const submit = async (values, actions) => {
    const { amount, recipient } = values

    try {
      const isValid = await validateAndConfirm(values)
      if (!isValid) {
        return
      }

      actions.setSubmitting(true)

      // Check if Plug is available, else show popup mesg
      let isConnected = await isPlugConnected()
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
      const escrowService = await makeEscrowPaymentActor(
        null,
        AuthProvider.Plug
      )
      const beamService = await makeBeamActor(null, AuthProvider.Plug)

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
        `1/3 - Requesting transfer of ${amount} ICP from Plug Wallet to Beam.`,
        "info"
      )

      const escrowPaymentCanisterAccountId = principalToAccountIdentifier(
        Principal.fromText(escrowPaymentCanisterId)
      )

      const escrowAmount = Number(humanToE8s(amount))
      const params = {
        to: escrowPaymentCanisterAccountId,
        amount: escrowAmount,
        opts: {
          memo: Number(BeamCreateConfig.JobFlowId)
        }
      }

      result = await window.ic.plug.requestTransfer(params)
      const blockIndex = result.height

      showMediumToast(
        toast,
        "Create Beam",
        `2/3 - We are creating your Beam now. This step can take up to 30 secs. 🧑‍💻`,
        "info"
      )

      const buyerPrincipal = Principal.fromText(myPrincipalId)
      const creatorPrincipal = Principal.fromText(recipient)
      const dueDate = moment()
      dueDate.add(numDays, "days")
      const dueDateUTC = moment(dueDate).utc().toDate()

      const result = await escrowService.createBeamEscrow(
        escrowAmount,
        blockIndex,
        convertDateToCandid(dueDateUTC),
        buyerPrincipal,
        creatorPrincipal
      )

      if (result.ok) {
        showMediumToast(
          toast,
          "Create Beam",
          "3/3 - We have successfully created your new beam. The deposited payment is now being streamed to the recipient. Visit My Beams to see in action!",
          "success"
        )

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

  const beamRate = totalTokens => {
    const startDateInMillSecs = moment().valueOf()
    const dueDate = moment()
    dueDate.add(numDays, "days")
    const dueDateInMilliSecs = dueDate.valueOf()

    return ratePerHr(startDateInMillSecs, dueDateInMilliSecs, totalTokens)
  }

  return (
    <Box h="100vh">
      <Stack
        spacing={{ base: "20px", md: "120px" }}
        w="100%"
        color="dark_black"
        fontSize="16px"
        pt={{ base: "90px", md: "140px" }}
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
                        token="ICP"
                        TokenIcon={ICLogo}
                        themeColor="black_5"
                        trackColor="black_gray"
                      >
                        <BeamHeading>ICP Amount:</BeamHeading>
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
                      >
                        <BeamHeading>Recipient Plug Wallet:</BeamHeading>
                      </FormInput>
                    )}
                  </Field>

                  <VStack
                    align="start"
                    w={{ base: "95%", md: "80%" }}
                    spacing="12px"
                  >
                    <BeamHeading textAlign="left">Duration:</BeamHeading>

                    <HStack w="100%">
                      <Text
                        color="black_5"
                        fontSize={{ base: "16px", md: "18px" }}
                      >
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

                    <Slider
                      defaultValue={numDays}
                      onChange={setNumDays}
                      min={1}
                      max={90}
                      step={1}
                    >
                      <SliderTrack bg="black_gray">
                        <Box position="relative" right={10} />
                        <SliderFilledTrack bg="black_5" />
                      </SliderTrack>
                      <SliderThumb boxSize={6} />
                    </Slider>
                  </VStack>

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
                      // type="submit"
                      bg="beam_pink"
                      onClick={onSelectAuthOpen}
                    >
                      Create Beam
                    </BeamActionButton>
                    <BeamSelectWalletModal
                      isOpen={isSelectAuthOpen}
                      onClose={onSelectAuthClose}
                      selectAuth={() => {
                        onSelectAuthClose()
                        handleSubmit()
                      }}
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
                    <Text color="gray_light2" pt="20px">
                      Recipient will receive {beamRate(values.amount)} ICP/hour
                      for {numDays} days ({values.amount} ICP total)
                    </Text>
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
