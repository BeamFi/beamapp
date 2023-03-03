import React, { ReactElement } from "react"

import { Button } from "@chakra-ui/react"

import { PropUnionType } from "../../../../types"

type Props = {
  leftIcon?: ReactElement
  w?: any
  h?: any
  children: any
  onClick?: any
  border?: string
  borderRadius?: string
  fontSize?: string | object
  fontWeight?: string
  color?: string
  ml?: PropUnionType
  mr?: PropUnionType
  mt?: PropUnionType
  px?: PropUnionType
  bg?: string
  bgColor?: string
  borderColor?: string
  transition?: string
  _hover?: any
  isLoading?: boolean
  isDisabled?: boolean
}

export const BeamActionButton = ({ leftIcon, children, ...rest }: Props) => {
  return (
    <Button
      leftIcon={leftIcon}
      variant="solid"
      color="black_5"
      fontWeight="medium"
      fontSize={{ base: "14px", md: "16px" }}
      boxShadow="-3px 5px 2px rgba(0, 0, 0, 0.75)"
      borderRadius="30px"
      bg="white"
      w="110px"
      h="45px"
      _hover={{
        boxShadow: "xl"
      }}
      loadingText="Submitting"
      {...rest}
    >
      {children}
    </Button>
  )
}
