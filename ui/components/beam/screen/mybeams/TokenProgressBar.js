import React from "react"

import {
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderTrack,
  Text
} from "@chakra-ui/react"

import { truncFloatDecimals } from "../../../../utils/number"

export const TokenProgressBar = ({ value, numTokensOwned, ...others }) => {
  const truncValue = truncFloatDecimals(value, 2)
  const truncNumTokensOwned = truncFloatDecimals(numTokensOwned, 6)
  const isCompleted = Number(truncValue) >= 100
  const markDesc = isCompleted ? "Completed" : `${truncValue}% Beamed`

  return (
    <Slider
      size="lg"
      min={0}
      max={100}
      value={truncValue}
      {...others}
      isReadOnly={true}
      cursor="auto"
    >
      <SliderMark
        value={0}
        fontSize="16px"
        color="black_3"
        mt="18px"
        textAlign="center"
        w="100%"
      >
        {markDesc}&nbsp;
        <Text as="span" fontSize="14px">
          ({truncNumTokensOwned} ICP)
        </Text>
      </SliderMark>
      <SliderTrack
        bg="black_gray"
        h="15px"
        borderRadius="16px"
        borderWidth="1px"
        borderColor="dark_black"
      >
        <SliderFilledTrack bg="white" borderRadius="16px" />
      </SliderTrack>
    </Slider>
  )
}
