import React from "react"

import { Image, Skeleton } from "@chakra-ui/react"

export const NativeImage = props => {
  const { height, borderRadius } = props
  const { fallbackElement, ...rest } = props

  const defaultFallback = (
    <Skeleton height={height} borderRadius={borderRadius} />
  )
  const myFallback = fallbackElement || defaultFallback

  return (
    <Image
      objectFit="cover"
      alt="Content Fly"
      fallback={myFallback}
      {...rest}
    />
  )
}
