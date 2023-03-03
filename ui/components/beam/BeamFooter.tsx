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
import ExternalLink from "../ExternalLink"
import { useMatch } from "react-router-dom"

export const BeamFooter = ({ hashtags, ...rest }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const shareURL = window.location.origin
  const shareName = `Beam - Trustless Streaming Payment`
  const shareBody = `Beam is a new Streaming Payment protocol with trustless escrow payment enabling creators to receive a continuous stream of payment each minute in real time.`

  const gotoICSmartContract = () => {
    window.open("https://internetcomputer.org", "_blank")
  }

  const matchHome = useMatch("/")

  return (
    <Box pos="absolute" bottom="0px" py="20px" w="full" {...rest}>
      <Center>
        <VStack spacing={matchHome ? "16px" : "32px"}>
          {matchHome && (
            <ExternalLink
              href="https://main.contentfly.app"
              textDecoration="none"
            >
              Need content created? Try our Content Fly
            </ExternalLink>
          )}

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

            <Link href="https://twitter.com/BeamFiApp" isExternal>
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
                aria-label="Powered by IC"
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
