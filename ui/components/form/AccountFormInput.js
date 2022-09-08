import React from "react"

import { FormInput } from "./FormInput"

export const AccountFormInput = props => {
  return (
    <FormInput
      pb={{ md: "10px", lg: "20px" }}
      w={{ base: "340px", md: "300px", "2xl": "340px" }}
      {...props}
    >
      {props.children}
    </FormInput>
  )
}
