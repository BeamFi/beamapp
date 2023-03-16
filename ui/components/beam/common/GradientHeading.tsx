import { Heading } from "@chakra-ui/react"
import Balancer from "react-wrap-balancer"

export const GradientHeading = ({ size = "xl", children, ...rest }) => {
  return (
    <Heading
      bg="gradient.purple.2"
      bgClip="text"
      textAlign="center"
      size={size}
      {...rest}
    >
      <Balancer>{children}</Balancer>
    </Heading>
  )
}
