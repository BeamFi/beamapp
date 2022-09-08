/* eslint-disable react/no-children-prop */
import React from "react"

import { FormErrorMessage } from "@chakra-ui/react"

import {
  FormControl,
  FormLabel,
  InputGroup,
  Textarea,
  InputRightElement
} from "@chakra-ui/react"

export default function FormTextarea(props) {
  const {
    id,
    field,
    textSize,
    numRows,
    textAreaHeight,
    placeholder,
    rightIcon,
    errorMesg,
    isRequired,
    isInvalid,
    variant,
    inputFontColor,
    ...rest
  } = props

  const finalTextSize = textSize || "sm"
  const finalNumRows = numRows || 12

  return (
    <FormControl
      isRequired={isRequired}
      isInvalid={isInvalid}
      w={{ base: "340px", md: "300px", "2xl": "380px" }}
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
        <Textarea
          id={id}
          placeholder={placeholder}
          focusBorderColor="purple"
          color={inputFontColor}
          resize="vertical"
          rows={finalNumRows}
          h={textAreaHeight}
          variant={variant}
          size={finalTextSize}
          {...field}
        />
        {rightIcon && <InputRightElement children={rightIcon} />}
      </InputGroup>
      <FormErrorMessage>{errorMesg}</FormErrorMessage>
    </FormControl>
  )
}
