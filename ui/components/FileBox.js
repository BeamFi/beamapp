import React from "react"

import { IconButton, Box, Square, Text, HStack, Spacer } from "@chakra-ui/react"
import { StandardTooltip } from "./StandardTooltip"
import { FcDocument } from "react-icons/fc"

import { useStore } from "mobx-store-provider"
import AppStoreModel from "../model/AppStoreModel"

export const FileBox = ({
  fileId,
  fileName,
  mimeType,
  loadFileFunc,
  ...rest
}) => {
  const appStore = useStore(AppStoreModel)
  const appContext = appStore.appContext

  const downloadFile = async () => {
    if (fileId == null) {
      return
    }

    const fileURL = await loadFileFunc(fileId, mimeType, appContext)

    const link = document.createElement("a")
    link.href = fileURL
    link.download = fileName
    link.click()
  }

  return (
    <Box px="15px" py="13px" {...rest}>
      <StandardTooltip label={fileName}>
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
      <StandardTooltip label={fileName}>
        <Text
          fontSize="14px"
          fontWeight="normal"
          color="gray_light2"
          pt="7px"
          px="2px"
          noOfLines={3}
          textAlign="center"
        >
          {fileName}
        </Text>
      </StandardTooltip>
    </Box>
  )
}
