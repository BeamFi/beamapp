/* eslint-disable react/no-children-prop */
import React from "react"
import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react"

// UI Components
import SelectMenu from "./SelectMenu"

export default function FormSelect(props) {
  const {
    id,
    field,
    title,
    placeholder,
    icon,
    errorMesg,
    isRequired,
    isInvalid,
    ...rest
  } = props

  return (
    <FormControl isRequired={isRequired} isInvalid={isInvalid} {...rest}>
      <FormLabel
        htmlFor={id}
        fontSize="13px"
        fontWeight="medium"
        color="black_2"
      >
        {title}
      </FormLabel>
      <SelectMenu id={id} {...field} placeholder={placeholder} icon={icon}>
        {props.children}
      </SelectMenu>
      <FormErrorMessage>{errorMesg}</FormErrorMessage>
    </FormControl>
  )
}
