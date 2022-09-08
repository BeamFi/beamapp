import React from "react"
import { Select } from "@chakra-ui/react"

export default function SelectMenu(props) {
  const { icon, ...rest } = props

  return (
    <Select
      rootProps={{
        style: {
          marginTop: "8px"
        }
      }}
      size="md"
      h={{ base: "40px", md: "40px", lg: "50px" }}
      iconColor="gray_light2"
      iconSize="14px"
      icon={icon}
      _active={{
        color: "purple",
        borderColor: "purple"
      }}
      _focus={{
        color: "purple",
        borderColor: "purple"
      }}
      {...rest}
    >
      {props.children}
    </Select>
  )
}
