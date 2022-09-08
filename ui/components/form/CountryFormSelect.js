import React from "react"

import FormSelect from "./FormSelect"
import { CountryIcon } from "../../icon"

export const CountryFormSelect = prop => {
  return (
    <FormSelect
      id="country"
      title="Country"
      placeholder="⬇ Select"
      isRequired
      pb={{ md: "10px", lg: "20px" }}
      w={{ base: "340px", md: "300px", "2xl": "340px" }}
      icon={<CountryIcon color="gray_light2" />}
      {...prop}
    >
      {prop.children}
    </FormSelect>
  )
}
