import React, { useEffect, useState } from "react"

import {
  Box,
  Button,
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
  Tooltip,
  useDisclosure,
  useToast,
  VStack,
  Wrap,
  WrapItem
} from "@chakra-ui/react"
import moment from "moment"

import { sanitizeJSURL } from "../../../utils/security"

import { CheckIcon, ExternalLinkIcon, LinkIcon } from "@chakra-ui/icons"

import { Field, Form, Formik } from "formik"
import { FormNumberInput } from "../../form/FormNumberInput"
import { FormInput } from "../../form/FormInput"

import { BeamGradientActionButton } from "../common/BeamGradientActionButton"

import { BeamMeetingCreateLinkSchema } from "../../../schema/beamschema"
import {
  BeamCreateLinkConfig,
  BeamSupportedTokenType,
  nameOfTokenType
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
import { TokenRadioGroup } from "../common/TokenRadioGroup"
import { TokenTypeData } from "../../../config"
import { GradientHeading } from "../common/GradientHeading"
import Image from "next/image"
import { BeamSelectWalletModal } from "../auth/BeamSelectWalletModal"
import { Identity } from "@dfinity/agent"

const FormTitle = ({ children, ...rest }) => {
  return (
    <BeamHeading fontSize={{ base: "14px", md: "20px" }} {...rest}>
      {children}
    </BeamHeading>
  )
}

type Props = {
  hashtags: string[]
}

const HeadlineStack = ({ hashtags }: Props) => {
  return (
    <VStack
      pt={{ base: "10px", md: "50px" }}
      align={{ base: "center", md: "flex-start" }}
      spacing="20px"
      maxW={{ base: "100%", md: "40%" }}
    >
      <GradientHeading
        px={{ base: "0px", md: "30px" }}
        py="0px"
        w={{ base: "unset", md: "100%" }}
      >
        Power Zoom Meeting with streaming payment
      </GradientHeading>
      <Text fontStyle="italic" textAlign="center" w="full">
        Limited Beta
      </Text>
      <OrderedList
        spacing={{ base: "10px", md: "16px" }}
        fontSize={{ base: "14px", md: "18px" }}
        px="30px"
        color="dark_black"
      >
        <ListItem>
          Fill out the payment details and the Zoom Meeting ID and password.
          <Text fontStyle="italic">
            (Do not enter the Zoom meeting ID previously used with BeamFi)
          </Text>
        </ListItem>
        <ListItem>
          Submit the form and get your unique Beam Meeting link
        </ListItem>
        <ListItem>
          Send your unique Beam Meeting link to the meeting participants
        </ListItem>
        <ListItem>
          <Link
            href="https://marketplace.zoom.us/apps/sjH1I9WvT4O7Si2R61bbSg"
            isExternal
          >
            Add BeamFi Meeting app
          </Link>{" "}
          to your Zoom account or click on ADD TO ZOOM button below so that we
          can pay you in real time when the meeting starts.{" "}
          <Link
            href="https://marketplace.zoom.us/apps/sjH1I9WvT4O7Si2R61bbSg"
            isExternal
          >
            Visit app in Zoom Marketplace
          </Link>
        </ListItem>
        <ListItem>
          After your participants have joined the meeting, you will get
          notification from Zoom to start the meeting. Start your meeting as
          host and get paid in real time as you speak!
        </ListItem>
      </OrderedList>

      <HStack spacing="24px">
        <Link
          href="https://zoom.us/oauth/authorize?response_type=code&client_id=Vy82pQwsRVCMXQEz6BaWDQ&redirect_uri=https://beamfi.app"
          isExternal
        >
          <Image
            src="https://marketplacecontent.zoom.us/zoom_marketplace/img/add_to_zoom.png"
            width="169"
            height="40"
            alt="Add to ZOOM"
          />
        </Link>
        <Link
          href="https://beamfi.freshdesk.com/support/solutions/folders/51000336019"
          isExternal
        >
          Learn More
        </Link>
      </HStack>

      <Wrap color="black_gray_3" spacing="22px">
        {hashtags.map((value, index) => (
          <WrapItem key={index}>
            <Text fontSize="16px">{value}</Text>
          </WrapItem>
        ))}
      </Wrap>
    </VStack>
  )
}

export const BeamNewMeeting = ({
  setAuthProvider,
  setBgColor,
  setHashtags
}) => {
  const initLoading = 1
  const toast = useToast()

  const {
    isOpen: isOpenAlert,
    onOpen: onOpenAlert,
    onClose: onCloseAlert
  } = useDisclosure()

  const hashtags = [
    "#MyTimeMyMoney",
    "#NoMoreEndOfMonth",
    "#GetBeamedNotLumped"
  ]

  useEffect(() => {
    setBgColor("beam_green")
    setHashtags([])

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initLoading])

  const defaultNumMins = 30
  const [numMins, setNumMins] = useState(defaultNumMins)
  const [tokenType, setTokenType] = useState<BeamSupportedTokenType>(
    BeamSupportedTokenType.icp
  )
  const [beamOutId, setBeamOutId] = useState(null)

  const endDateDesc = () => {
    return moment().add(numMins, "minutes").format("MMM Do YYYY, h:mm:ss a")
  }

  const beamOutLink = id => {
    return `${window.location.origin}/meeting/${id}`
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
    const { amount, recipient, meetingId, meetingPassword } = values

    try {
      const isValid = await validateAndConfirm(values)
      if (!isValid) {
        return
      }

      actions.setSubmitting(true)

      const e8sAmount = humanToE8s(amount)
      const tokenTypeVariant = convertToVariant(tokenType)

      const recipientPrincipal: Principal = Principal.fromText(recipient)

      const beamOutService = await makeBeamOutActor()
      const result = await beamOutService.createBeamOutMeeting(
        e8sAmount,
        tokenTypeVariant,
        recipientPrincipal,
        numMins,
        meetingId,
        meetingPassword
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

  const tokenIcon = TokenTypeData[tokenType]?.icon
  const tokenName = nameOfTokenType(tokenType)

  const onChangeTokenType = event => {
    const tokenType = event.target.value
    setTokenType(tokenType)
  }

  const {
    isOpen: isSelectAuthOpen,
    onOpen: onSelectAuthOpen,
    onClose: onSelectAuthClose
  } = useDisclosure()

  const handleAuthUpdate = async (
    identity: Identity,
    authProvider,
    setFieldValue
  ) => {
    const principal = await identity.getPrincipal()
    const principalString = principal.toString()
    setFieldValue("recipient", principalString)
    setAuthProvider(authProvider)
  }

  return (
    <Box h="100vh">
      <Stack
        spacing={{ base: "20px", md: "40px", lg: "100px" }}
        w="100%"
        color="dark_black"
        fontSize="16px"
        pt="60px"
        direction={{ base: "column", md: "row" }}
        justifyContent="center"
        px={{ base: "14px", md: "38px" }}
      >
        <Head>
          <title>New Meeting - BeamFi</title>
        </Head>
        <HeadlineStack hashtags={hashtags} />
        <BeamVStack>
          <Formik
            initialValues={{
              amount: 1,
              recipient: "",
              meetingId: "",
              meetingPassword: "",
              isConfirmed: false,
              tokenType: BeamSupportedTokenType.icp
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
                  <TokenRadioGroup
                    onChangeTokenType={onChangeTokenType}
                    tokenType={tokenType}
                  />

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
                        token={tokenName}
                        TokenIcon={tokenIcon}
                        themeColor="black_5"
                        trackColor="black_gray"
                      >
                        <FormTitle>{tokenName} Amount</FormTitle>
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
                        <FormTitle>
                          <HStack>
                            <Box>Your Wallet</Box>
                            <Spacer />
                            <Button
                              variant="solid"
                              colorScheme="purple_scheme"
                              onClick={onSelectAuthOpen}
                            >
                              Connect
                            </Button>
                          </HStack>
                        </FormTitle>

                        <BeamSelectWalletModal
                          isOpen={isSelectAuthOpen}
                          onClose={onSelectAuthClose}
                          handleAuthUpdate={(identity, authProvider) =>
                            handleAuthUpdate(
                              identity,
                              authProvider,
                              setFieldValue
                            )
                          }
                        />
                      </FormInput>
                    )}
                  </Field>

                  <VStack
                    align="start"
                    w={{ base: "95%", md: "80%" }}
                    spacing="12px"
                  >
                    <FormTitle textAlign="left">Duration</FormTitle>

                    <HStack w="100%">
                      <Text
                        color="black_5"
                        fontSize={{ base: "16px", md: "18px" }}
                      >
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

                    <Slider
                      defaultValue={defaultNumMins}
                      onChange={setNumMins}
                      min={1}
                      max={180}
                      step={1}
                    >
                      <SliderTrack bg="black_gray">
                        <Box position="relative" right={10} />
                        <SliderFilledTrack bg="black_5" />
                      </SliderTrack>
                      <SliderThumb boxSize={6} />
                    </Slider>
                  </VStack>

                  <Field name="meetingId">
                    {({ field, form }) => (
                      <FormInput
                        id="meetingId"
                        field={field}
                        inputFontSize={{ base: "sm", md: "md" }}
                        themeColor="black_5"
                        placeholder="Zoom Meeting ID"
                        w={{ base: "95%", md: "80%" }}
                        isInvalid={
                          form.errors.meetingId && form.touched.meetingId
                        }
                        errorMesg={form.errors.meetingId}
                      >
                        <FormTitle>
                          <Tooltip
                            label="Generate a new Meeting ID. Do not enter the Zoom meeting ID previously used with BeamFi."
                            placement="right-end"
                            bg="gray.100"
                            color="black"
                          >
                            Zoom Meeting ID
                          </Tooltip>
                        </FormTitle>
                      </FormInput>
                    )}
                  </Field>

                  <Field name="meetingPassword">
                    {({ field, form }) => (
                      <FormInput
                        id="meetingPassword"
                        field={field}
                        type="password"
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
                        <FormTitle>Zoom Meeting Password</FormTitle>
                      </FormInput>
                    )}
                  </Field>

                  <Box w="100%" textAlign="center" pt="12px">
                    {beamOutId != null && (
                      <Text pt="10px" pb="18px">
                        Link Created:{" "}
                        <Link
                          href={beamOutLink(sanitizeJSURL(beamOutId))}
                          isExternal
                        >
                          {beamOutLink(sanitizeJSURL(beamOutId))}
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
