import React from "react"

import { IconButton } from "@chakra-ui/react"
import { RefreshIcon } from "../../icon"

export const RefreshButton = props => {
  return (
    <IconButton
      aria-label="Refresh"
      icon={<RefreshIcon />}
      color="black_2"
      bgColor="gray_light6"
      {...props}
    />
  )
}
