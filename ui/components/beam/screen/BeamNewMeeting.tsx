import React, { useEffect, useState } from "react"

import {
  Box,
  HStack,
  Link,
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

import { CheckIcon, ExternalLinkIcon, LinkIcon } from "@chakra-ui/icons"
import { ICLogo } from "../../../icon"

import { Field, Form, Formik } from "formik"
import { FormNumberInput } from "../../form/FormNumberInput"
import { FormInput } from "../../form/FormInput"

import { BeamGradientActionButton } from "../common/BeamGradientActionButton"

import { BeamMeetingCreateLinkSchema } from "../../../schema/beamschema"
import {
  BeamCreateLinkConfig,
  BeamSupportedTokenType
} from "../../../config/beamconfig"
import log from "../../../utils/log"
import { Principal } from "@dfinity/principal"
import { showTopToast } from "../../../utils/toast"
import { makeBeamOutActor } from "../../../service/actor/actor-locator"
import { humanToE8s } from "../../../utils/e8s"
import { convertToVariant } from "../../../model/TypeConversion"
import { GetPaidAlertDialog } from "./getpaid/GetPaidAlertDialog"
import { BeamHeading } from "../common/BeamHeading"
import Head from "next/head"
import { BeamVStack } from "../common/BeamVStack"

const MyHeading = ({ children, ...rest }) => {
  return (
    <BeamHeading fontSize={{ base: "14px", md: "20px" }} {...rest}>
      {children}
    </BeamHeading>
  )
}

const HeadlineStack = () => {
  return (
    <VStack
      pt="60px"
      align={{ base: "center", md: "flex-start" }}
      spacing="10px"
      maxW={{ base: "100%", md: "40%" }}
    >
      <OrderedList
        spacing={{ base: "10px", md: "16px" }}
        fontSize={{ base: "14px", md: "18px" }}
        px="30px"
        color="dark_black"
      >
        <ListItem>Fill out the payment details</ListItem>
        <ListItem>
          Fill out the Zoom Meeting details: Meeting ID, Meeting Password
        </ListItem>
        <ListItem>Copy your unique Beam Meeting link</ListItem>
        <ListItem>
          Send your unique Beam Meeting link to the meeting participants!
        </ListItem>
      </OrderedList>
    </VStack>
  )
}

export const BeamNewMeeting = ({ setBgColor, setHashtags }) => {
  const initLoading = 1
  const toast = useToast()

  const {
    isOpen: isOpenAlert,
    onOpen: onOpenAlert,
    onClose: onCloseAlert
  } = useDisclosure()

  useEffect(() => {
    setBgColor("beam_green")
    setHashtags(["#MyTimeMyMoney", "#NoMoreEndOfMonth", "#GetBeamedNotLumped"])

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initLoading])

  const defaultNumDays = 7
  const [numDays, setNumDays] = useState(defaultNumDays)

  const [beamOutId, setBeamOutId] = useState(null)

  const endDateDesc = () => {
    return moment().add(numDays, "days").format("MMM Do YYYY, h:mm:ss a")
  }

  const beamOutLink = id => {
    return `${window.location.origin}/beamout/${id}`
  }

  const showEndDate = false

  const validateAndConfirm = async values => {
    const { recipient, isConfirmed } = values

    const isLinkCreated = beamOutId != null
    if (isLinkCreated) {
      const link = beamOutLink(beamOutId)
      await copyLinkToClipboard(link)
      return
    }

    const isValid = validateRecipient(recipient)
    if (!isValid) {
      showTopToast(
        toast,
        "Create Beam Link",
        "The recipient wallet prinicpal ID is invalid.",
        "warning"
      )
      return false
    }

    if (!isConfirmed) {
      onOpenAlert()
      return false
    }

    return true
  }

  const submit = async (values, actions) => {
    const { amount, recipient } = values

    try {
      const isValid = await validateAndConfirm(values)
      if (!isValid) {
        return
      }

      actions.setSubmitting(true)

      const e8sAmount = humanToE8s(amount)
      const tokenType = convertToVariant(BeamSupportedTokenType.icp)
      const recipientPrincipal = Principal.fromText(recipient)

      const beamOutService = await makeBeamOutActor()
      const result = await beamOutService.createBeamOut(
        e8sAmount,
        tokenType,
        recipientPrincipal,
        numDays
      )

      if (result.ok) {
        const id = result.ok
        setBeamOutId(id)
      } else if (result.err) {
        log.error(result.err)
        throw new Error(result.err)
      }
    } catch (error) {
      log.error(error)
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

  const copyLinkToClipboard = async link => {
    if (link != null) {
      try {
        await window.navigator.clipboard.writeText(link)
        showTopToast(
          toast,
          "Creat Beam Link",
          "Your Unique Beam Link is copied to clipboard",
          "success"
        )
      } catch (error) {
        log.error(error)

        showTopToast(
          toast,
          "Create Beam Link",
          "We have a problem copying your Beam Link to clipboard",
          "error"
        )
      }
    }
  }

  const confirm = async (values, handleSubmit) => {
    onCloseAlert()
    values.isConfirmed = true

    await handleSubmit(values)
  }

  return (
    <Box h="100vh">
      <Stack
        spacing={{ base: "20px", md: "40px", lg: "100px" }}
        w="100%"
        color="dark_black"
        fontSize="16px"
        pt={{ base: "80px", md: "100px" }}
        direction={{ base: "column", md: "row" }}
        justifyContent="center"
        px={{ base: "14px", md: "38px" }}
      >
        <Head>
          <title>Get Paid - Beam</title>
        </Head>
        <HeadlineStack />
        <BeamVStack>
          <Formik
            initialValues={{
              amount: 10,
              recipient: "",
              isConfirmed: false
            }}
            validationSchema={BeamMeetingCreateLinkSchema}
            onSubmit={submit}
            enableReinitialize
          >
            {({ values, isSubmitting, setFieldValue, handleSubmit }) => (
              <Form style={{ width: "100%" }}>
                <VStack
                  bgColor="white"
                  borderRadius="14px"
                  maxW="700px"
                  spacing={{ base: "16px", md: "16px" }}
                  py="10px"
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
                        <MyHeading>ICP Amount:</MyHeading>
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
                        <MyHeading>Your Plug Wallet:</MyHeading>
                      </FormInput>
                    )}
                  </Field>

                  <VStack
                    align="start"
                    w={{ base: "95%", md: "80%" }}
                    spacing="12px"
                  >
                    <MyHeading textAlign="left">Duration:</MyHeading>

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
                      defaultValue={defaultNumDays}
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

                  <Field name="meetingNumber">
                    {({ field, form }) => (
                      <FormInput
                        id="meetingNumber"
                        field={field}
                        inputFontSize={{ base: "sm", md: "md" }}
                        themeColor="black_5"
                        placeholder="Zoom Meeting ID"
                        w={{ base: "95%", md: "80%" }}
                        isInvalid={
                          form.errors.meetingNumber &&
                          form.touched.meetingNumber
                        }
                        errorMesg={form.errors.meetingNumber}
                      >
                        <MyHeading>Zoom Meeting ID:</MyHeading>
                      </FormInput>
                    )}
                  </Field>

                  <Field name="meetingPassword">
                    {({ field, form }) => (
                      <FormInput
                        id="meetingPassword"
                        field={field}
                        inputFontSize={{ base: "sm", md: "md" }}
                        themeColor="black_5"
                        placeholder="Zoom Meeting Password"
                        w={{ base: "95%", md: "80%" }}
                        isInvalid={
                          form.errors.meetingPassword &&
                          form.touched.meetingPassword
                        }
                        errorMesg={form.errors.meetingPassword}
                      >
                        <MyHeading>Zoom Meeting Password:</MyHeading>
                      </FormInput>
                    )}
                  </Field>

                  <Box w="100%" textAlign="center" pt="12px">
                    {beamOutId != null && (
                      <Text pt="10px" pb="18px">
                        Link Created:{" "}
                        <Link href={beamOutLink(beamOutId)} isExternal>
                          {beamOutLink(beamOutId)}
                        </Link>
                        <ExternalLinkIcon ml="6px" mb="2px" color="black_5" />
                      </Text>
                    )}
                    <BeamGradientActionButton
                      title={
                        beamOutId != null
                          ? "Copy Link"
                          : "Create Beam Meeting Link"
                      }
                      textSize={{ base: "15px", md: "20px" }}
                      textWeight="semibold"
                      leftIcon={
                        beamOutId != null ? (
                          <CheckIcon w="20px" h="20px" color="purple_3" />
                        ) : (
                          <LinkIcon w="20px" h="20px" color="purple_3" />
                        )
                      }
                      isLoading={isSubmitting}
                      w={{ base: "95%", md: "85%" }}
                      h="62px"
                      border="1px solid #000000"
                      type="submit"
                    />
                  </Box>
                </VStack>
                <GetPaidAlertDialog
                  isOpen={isOpenAlert}
                  onClose={onCloseAlert}
                  recipient={values.recipient}
                  confirm={() => confirm(values, handleSubmit)}
                />
              </Form>
            )}
          </Formik>
        </BeamVStack>
      </Stack>
    </Box>
  )
}