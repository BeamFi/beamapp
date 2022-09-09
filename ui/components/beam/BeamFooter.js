import React from "react"

import {
  Box,
  Center,
  Hide,
  HStack,
  IconButton,
  Link,
  Text,
  useDisclosure,
  VStack
} from "@chakra-ui/react"
import { BeamLogo, PoweredByICSquare } from "../../icon"
import { LinkIcon } from "@chakra-ui/icons"
import { FaDiscord, FaMediumM, FaTwitter } from "react-icons/fa"
import { ShareURLModal } from "../socialmedia/ShareURLModal"
import { BeamGradientActionButton } from "./common/BeamGradientActionButton"

export const BeamFooter = ({ hashtags, ...rest }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const shareURL = window.location.href
  const shareName = `Beam - Trustless Streaming Payment`
  const shareBody = `Beam is a new Streaming Payment protocol with trustless escrow payment enabling creators to receive a continuous stream of payment each minute in real time.`

  const gotoICSmartContract = () => {
    window.open("https://smartcontracts.org", "_blank")
  }

  return (
    <Box pos="absolute" bottom="0px" py="20px" w="full" {...rest}>
      <Center>
        <VStack spacing="32px">
          <HStack color="black_gray_3" spacing="22px">
            {hashtags?.map((value, index) => (
              <Text fontSize="16px" key={index}>
                {value}
              </Text>
            ))}
          </HStack>

          <HStack spacing={{ base: "12px", md: "18px" }}>
            <BeamGradientActionButton
              title="Share"
              leftIcon={<LinkIcon w="20px" h="20px" color="purple_3" />}
              mb="8px"
              onClick={onOpen}
              w={{ base: "100px", md: "110px" }}
            />
            <BeamLogo w="127px" h="51px" />

            <Link href="https://twitter.com/ContentFlyApp" isExternal>
              <FaTwitter size="28px" color="gray" />
            </Link>
            <Link href="https://medium.com/contentfly-app-blog" isExternal>
              <FaMediumM size="28px" color="gray" />
            </Link>
            <Link href="https://discord.gg/uuDzQxdmmY" isExternal>
              <FaDiscord size="28px" color="gray" />
            </Link>
            <Hide below="md">
              <IconButton
                icon={<PoweredByICSquare w="60px" h="45px" />}
                variant="unstyled"
                onClick={gotoICSmartContract}
                pb="50px"
              />
            </Hide>
          </HStack>
        </VStack>
      </Center>
      <ShareURLModal
        headingTitle="Share Beam App"
        url={shareURL}
        title={shareName}
        body={shareBody}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Box>
  )
}
