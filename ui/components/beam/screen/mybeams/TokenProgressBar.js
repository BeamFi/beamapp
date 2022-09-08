import React from "react"

import {
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderTrack
} from "@chakra-ui/react"

import { truncFloatDecimals } from "../../../../utils/number"

export const TokenProgressBar = ({ value, tooltipDesc, ...others }) => {
  const truncValue = truncFloatDecimals(value, 2)

  return (
    <Slider
      size="lg"
      w={{ base: "70px", md: "190px" }}
      min={0}
      max={100}
      value={truncValue}
      {...others}
      isReadOnly={true}
      cursor="auto"
    >
      <SliderMark
        value="50"
        textAlign="center"
        fontSize="12px"
        color="black_3"
        mt="16px"
        ml="-50px"
        w="100px"
      >
        {truncValue}% {tooltipDesc}
      </SliderMark>
      <SliderTrack bg="black_gray" h="15px" borderRadius="15px">
        <SliderFilledTrack bg="gradient.purple.8" borderRadius="15px" />
      </SliderTrack>
    </Slider>
  )
}
