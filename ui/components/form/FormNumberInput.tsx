/* eslint-disable react/no-children-prop */
import React, { forwardRef, useState } from "react"

import {
  FormErrorMessage,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack
} from "@chakra-ui/react"

import { FormControl, FormLabel, InputGroup } from "@chakra-ui/react"
import { StandardTooltip } from "../StandardTooltip"

export const FormNumberInput = forwardRef((props: any, ref: any) => {
  const {
    id,
    field,
    errorMesg,
    isRequired,
    isInvalid,
    inputFontWeight,
    inputFontColor,
    inputFontSize,
    themeColor,
    trackColor,
    min,
    max,
    token,
    TokenIcon,
    setFieldValue,
    isReadOnly,
    ...rest
  } = props

  const [showTooltip, setShowTooltip] = useState(false)

  const onChange = value => {
    setFieldValue(id, value)
  }

  return (
    <FormControl
      isRequired={isRequired}
      isInvalid={isInvalid}
      isReadOnly={isReadOnly}
      w={{ base: "300px", md: "324px", lg: "364px", xl: "394px" }}
      {...rest}
    >
      <FormLabel
        htmlFor={id}
        fontSize="13px"
        fontWeight="medium"
        color="black_2"
      >
        {props.children}
      </FormLabel>
      <InputGroup>
        <NumberInput
          id={id}
          ref={ref}
          value={field.value}
          onChange={onChange}
          size="md"
          defaultValue={1}
          min={min}
          max={max}
          precision={3}
          step={1}
          focusBorderColor={themeColor}
          mr="1.5rem"
        >
          <NumberInputField
            inputMode="numeric"
            maxW="150px"
            fontWeight={inputFontWeight}
            fontSize={inputFontSize}
            color={inputFontColor}
          />
          {!isReadOnly && (
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          )}
        </NumberInput>

        {!isReadOnly && (
          <Slider
            min={min}
            max={max}
            focusThumbOnChange={false}
            value={field.value}
            onChange={onChange}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            ml="6px"
            isReadOnly={isReadOnly}
          >
            <SliderTrack bg={trackColor}>
              <SliderFilledTrack bg={themeColor} />
            </SliderTrack>
            <StandardTooltip
              hasArrow
              bg={themeColor}
              color="white"
              placement="top"
              isOpen={showTooltip}
              label={`${field.value} ${token}`}
              p="8px"
            >
              <SliderThumb boxSize={9}>
                <TokenIcon h="30px" w="41px" mr="0px" />
              </SliderThumb>
            </StandardTooltip>
          </Slider>
        )}
      </InputGroup>
      <FormErrorMessage>{errorMesg}</FormErrorMessage>
    </FormControl>
  )
})

FormNumberInput.displayName = "FormNumberInput"
