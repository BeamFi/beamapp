import React from "react"

import { IconButton, Box, Square, HStack, Spacer } from "@chakra-ui/react"
import { FcDocument } from "react-icons/fc"

import { StandardTooltip } from "./StandardTooltip"

export const WebURIFileBox = ({ webURI, ...rest }) => {
  const downloadFile = async () => {
    window.open(webURI, "_blank")
  }

  return (
    <Box px="15px" py="13px" {...rest}>
      <StandardTooltip label="Click to open in new tab">
        <HStack>
          <Spacer />
          <Square
            size={{ base: "77px", md: "97px" }}
            bgColor="gray_light3"
            borderRadius="4px"
            cursor="pointer"
            onClick={downloadFile}
          >
            <IconButton
              variant="unstyled"
              icon={<FcDocument size="50px" />}
              mb="10px"
            />
          </Square>
          <Spacer />
        </HStack>
      </StandardTooltip>
    </Box>
  )
}
