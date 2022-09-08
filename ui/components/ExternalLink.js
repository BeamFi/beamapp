import React from "react"

import { Link } from "@chakra-ui/react"

export default function ExternalLink(props) {
  return (
    <Link target="_blank" textDecoration="underline" {...props}>
      {props.children}
    </Link>
  )
}
