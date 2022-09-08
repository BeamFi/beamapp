import React from "react"

import { Tab } from "@chakra-ui/react"

const DefaultSelectedStyle = {
  fontWeight: "semibold",
  borderBottom: "3px solid currentColor",
  borderBottomColor: "purple_2"
}

export const TabName = ({
  selected,
  hover,
  active,
  display,
  children,
  ...others
}) => {
  const mySelected = selected || DefaultSelectedStyle

  return (
    <Tab
      color="black"
      display={display}
      fontSize={{ md: "16px", lg: "20px" }}
      fontWeight="medium"
      _selected={mySelected}
      _hover={hover}
      _active={active}
      {...others}
    >
      {children}
    </Tab>
  )
}
