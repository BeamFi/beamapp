import React from "react"

import {
  Box,
  Center,
  Hide,
  HStack,
  IconButton,
  Link,
  Spacer,
  Text,
  VStack
} from "@chakra-ui/react"
import { BeamLogo, PoweredByICSquare } from "../../icon"
import { FaDiscord, FaMediumM, FaTwitter } from "react-icons/fa"
import ExternalLink from "../ExternalLink"
import { useMatch } from "react-router-dom"

export const BeamFooter = ({ hashtags, ...rest }) => {
  const gotoICWebsite = () => {
    window.open("https://internetcomputer.org", "_blank")
  }

  const matchHome = useMatch("/")

  return (
    <Box pos="absolute" bottom="0px" py="20px" w="full" {...rest}>
      <Center>
        <VStack spacing={matchHome ? "16px" : "32px"} w="full">
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

          <HStack spacing={{ base: "12px", md: "18px" }} w="full">
            <Spacer />
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
            <Link href="https://doc.beamfi.app/terms" isExternal>
              Terms
            </Link>
            <Link href="https://doc.beamfi.app/privacy" isExternal>
              Privacy
            </Link>
            <Link href="https://doc.beamfi.app/support" isExternal>
              Support
            </Link>
            <Spacer />
            <Hide below="md">
              <IconButton
                icon={<PoweredByICSquare w="60px" h="45px" />}
                variant="unstyled"
                onClick={gotoICWebsite}
                pb="50px"
                pr="20px"
                aria-label="Powered by IC"
              />
            </Hide>
          </HStack>
        </VStack>
      </Center>
    </Box>
  )
}
