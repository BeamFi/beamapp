import React from "react"

import { Stack, Text, Icon, VStack } from "@chakra-ui/react"
import { BeamActionButton } from "./common/BeamActionButton"
import { BeamOutIcon, GetPaidIcon } from "../../icon"
import { useNavigate } from "react-router-dom"

import { FcConferenceCall } from "react-icons/fc"

const ActionButton = ({ isShrink, children, ...others }) => {
  return (
    <BeamActionButton
      w={isShrink ? "52px" : { base: "153px", md: "173px" }}
      h="52px"
      transition="all 0.5s"
      _hover={{
        w: { base: "153px", md: "173px" },
        p: {
          visibility: "visible"
        },
        svg: {
          marginLeft: "0px"
        }
      }}
      {...others}
    >
      {children}
    </BeamActionButton>
  )
}

export const BeamMainActionButtons = ({ isShrink = false, ...rest }) => {
  const navigate = useNavigate()
  const enableMeeting = process.env.NEXT_PUBLIC_ENABLE_MEETING === "true"

  return (
    <Stack
      direction={{ base: "column", md: "row" }}
      spacing={{ base: "30px", md: "60px" }}
      justify="center"
      {...rest}
    >
      {enableMeeting && (
        <VStack spacing="12px" px="0" mx="0">
          <ActionButton
            leftIcon={
              <Icon
                as={FcConferenceCall}
                w="23px"
                h="23px"
                ml={isShrink ? "110px" : "0px"}
              />
            }
            onClick={() => navigate("/newmeeting")}
            isShrink={isShrink}
          >
            <Text visibility={isShrink ? "hidden" : "visible"}>
              New Meeting
            </Text>
          </ActionButton>
          {!isShrink && <Text fontStyle="italic">Limited Beta</Text>}
        </VStack>
      )}

      <ActionButton
        leftIcon={
          <GetPaidIcon
            w="23px"
            h="23px"
            color="black_5"
            ml={isShrink ? "94px" : "0px"}
            mb="4px"
          />
        }
        onClick={() => navigate("/getpaid")}
        isShrink={isShrink}
      >
        <Text visibility={isShrink ? "hidden" : "visible"}>New Beam</Text>
      </ActionButton>
      <ActionButton
        leftIcon={
          <BeamOutIcon
            w="19px"
            h="19px"
            color="black_5"
            ml={isShrink ? "88px" : "0px"}
          />
        }
        onClick={() => navigate("/beamout")}
        isShrink={isShrink}
      >
        <Text visibility={isShrink ? "hidden" : "visible"}>Beam Out</Text>
      </ActionButton>
    </Stack>
  )
}
