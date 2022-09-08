import React from "react"

import NextLink from "next/link"
import { Link } from "@chakra-ui/react"

export const ClientLinkRoute = ({ page, children, ...rest }) => {
  const finalPage = page ?? ""
  const finalAlias = finalPage == "/" ? "" : `${finalPage}.html`

  return (
    <NextLink href={finalPage} as={finalAlias} passHref {...rest}>
      <Link>{children}</Link>
    </NextLink>
  )
}
