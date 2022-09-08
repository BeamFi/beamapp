import React from "react"

import { Spinner } from "@chakra-ui/react"

export const StandardSpinner = () => {
  return (
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="purple_light"
      color="purple"
      size="xl"
    />
  )
}
