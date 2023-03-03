import React from "react"

import { Text } from "@chakra-ui/react"

import { truncate } from "../../utils/string"

export const PrincipalInfo = ({ children, ...props }) => {
  return <Text {...props}>{truncate(children?.toString(), 5, 3, 3)}</Text>
}
