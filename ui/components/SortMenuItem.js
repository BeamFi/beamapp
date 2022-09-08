import React from "react"
import { MenuItem } from "@chakra-ui/react"

export const SortMenuItem = ({ onClick, children }) => {
  return (
    <MenuItem
      color="black"
      fontSize="13px"
      fontWeight="medium"
      onClick={onClick}
    >
      {children}
    </MenuItem>
  )
}
