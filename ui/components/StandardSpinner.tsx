import React from "react"

import { Spinner } from "@chakra-ui/react"

export const StandardSpinner = () => {
  return (
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="beam_green"
      color="beam_pink"
      size="xl"
    />
  )
}
