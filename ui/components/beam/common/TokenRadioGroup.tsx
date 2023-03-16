import { HStack, useRadioGroup, VStack, Text } from "@chakra-ui/react"

import { TokenTypeData } from "../../../config"
import {
  BeamSupportedTokenType,
  nameOfTokenType
} from "../../../config/beamconfig"

import { RadioCard } from "../../form/RadioCard"

export const TokenRadioGroup = ({ tokenType, onChangeTokenType }) => {
  const tokenTypeKeys = Object.keys(BeamSupportedTokenType)
  const TokenTypeFieldId = "tokenType"
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: TokenTypeFieldId,
    defaultValue: tokenType
  })
  const tokenGroup = getRootProps()

  return (
    <HStack
      spacing="12px"
      w={{ base: "95%", md: "80%" }}
      {...tokenGroup}
      onChange={event => onChangeTokenType(event)}
    >
      {tokenTypeKeys.map(value => {
        const radio = getRadioProps({ value })
        const uiData = TokenTypeData[value]
        const title = nameOfTokenType(value)
        const TokenIcon = uiData.icon

        return (
          <RadioCard
            key={value}
            {...radio}
            bgColor="purple_3"
            h="110px"
            minW="110px"
          >
            <VStack spacing="12px" justify="center">
              <Text fontWeight="semibold" fontSize="14px">
                {title}
              </Text>
              <TokenIcon fontSize="48px" color="black_3" />
            </VStack>
          </RadioCard>
        )
      })}
    </HStack>
  )
}
