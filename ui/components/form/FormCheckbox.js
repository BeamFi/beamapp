/* eslint-disable react/no-children-prop */
import React from "react"
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Checkbox
} from "@chakra-ui/react"

export default function FormCheckbox(props) {
  const {
    id,
    field,
    errorMesg,
    isChecked,
    isRequired,
    isInvalid,
    w,
    children,
    ...rest
  } = props

  return (
    <FormControl isRequired={isRequired} isInvalid={isInvalid} w={w}>
      <FormLabel
        htmlFor={id}
        fontSize="13px"
        fontWeight="medium"
        color="black_2"
        px="22px"
        {...rest}
      >
        <Checkbox
          id={id}
          {...field}
          defaultChecked={isChecked}
          isRequired={isRequired}
          isInvalid={isInvalid}
          size="lg"
          spacing="1rem"
          iconColor="purple"
          colorScheme="white"
        >
          {children}
        </Checkbox>
      </FormLabel>
      <FormErrorMessage>{errorMesg}</FormErrorMessage>
    </FormControl>
  )
}
