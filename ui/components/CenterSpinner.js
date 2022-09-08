import React from "react"

import { Center, Spinner } from "@chakra-ui/react"

export const CenterSpinner = ({ ...others }) => {
  return (
    <Center py="30px">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="purple_light"
        color="purple"
        size="xl"
        {...others}
      />
    </Center>
  )
}
