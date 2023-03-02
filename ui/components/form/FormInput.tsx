/* eslint-disable react/no-children-prop */
import React, { forwardRef } from "react"

import { FormErrorMessage } from "@chakra-ui/react"

import {
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  InputRightElement
} from "@chakra-ui/react"

import { isEnterKey } from "../../utils/keyboard"

export const FormInput = forwardRef((props: any, ref: any) => {
  const {
    id,
    type,
    field,
    rightIcon,
    placeholder,
    errorMesg,
    isRequired,
    isInvalid,
    variant,
    inputFontWeight,
    inputFontColor,
    inputFontSize,
    themeColor,
    ...rest
  } = props

  const finalThemeColor = themeColor != null ? themeColor : "purple"

  return (
    <FormControl
      isRequired={isRequired}
      isInvalid={isInvalid}
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
        <Input
          id={id}
          placeholder={placeholder}
          variant={variant}
          fontWeight={inputFontWeight}
          fontSize={inputFontSize}
          color={inputFontColor}
          ref={ref}
          {...field}
          focusBorderColor={finalThemeColor}
          h={{ base: "40px", md: "40px", lg: "50px" }}
          type={type}
          onKeyPress={e => {
            isEnterKey(e) && e.preventDefault()
          }}
        />
        {rightIcon && <InputRightElement children={rightIcon} />}
      </InputGroup>
      <FormErrorMessage>{errorMesg}</FormErrorMessage>
    </FormControl>
  )
})

FormInput.displayName = "FormInput"
