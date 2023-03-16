import React from "react"
import {
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderTrack,
  Text,
  useMediaQuery
} from "@chakra-ui/react"

import { truncFloatDecimals } from "../../../../utils/number"
import moment from "moment"
import { convertCandidDateToUnixTimestampMs } from "../../../../model/TypeConversion"

export const TokenProgressBar = ({
  value,
  numTokensOwned,
  startDate,
  endDate,
  tokenTypeName,
  ...others
}) => {
  const truncValue = truncFloatDecimals(value, 2)
  const truncNumTokensOwned = truncFloatDecimals(numTokensOwned, 6)
  const isCompleted = Number(truncValue) >= 100
  const markDesc = isCompleted ? "Completed" : `${truncValue}% Beamed`
  const startTimestamp = startDate
    ? convertCandidDateToUnixTimestampMs(startDate)
    : null
  const dueTimestamp = endDate
    ? convertCandidDateToUnixTimestampMs(endDate)
    : null
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)")

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
      <SliderMark flex={1} value={0} mt="16px">
        <Text flex={1} as="span" fontSize="11px">
          {startTimestamp ? moment(startTimestamp).format("Do MMM YY") : null}
        </Text>
      </SliderMark>
      <SliderMark
        flex={1}
        value={isLargerThan768 ? 30 : 35}
        fontSize="12px"
        color="black_3"
        mt="20px"
        textAlign={"center"}
      >
        {markDesc}&nbsp;
        {!isLargerThan768 ? <br /> : null}({truncNumTokensOwned} {tokenTypeName}
        )
      </SliderMark>
      <SliderMark flex={1} value={100} ml="-65px" mt="16px">
        <Text flex={1} as="span" fontSize="11px">
          {dueTimestamp ? moment(dueTimestamp).format("Do MMM YY") : null}
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
