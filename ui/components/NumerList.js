import React from "react"

import { OrderedList } from "@chakra-ui/react"

export const NumberList = ({ children }) => {
  return <OrderedList spacing="10px">{children}</OrderedList>
}
