import React, { useEffect, useState } from "react"

import { Button, Heading, VStack } from "@chakra-ui/react"
import { Container } from "./Container"
import { StandardSpinner } from "./StandardSpinner"

export const FullPageSpinner = () => {
  const [showReload, setShowReload] = useState(false)
  const initLoading = 1
  const waitTimeToShowReload = 7000

  const reload = () => {
    window.location.reload()
  }

  useEffect(() => {
    setTimeout(() => {
      setShowReload(true)
    }, waitTimeToShowReload)
  }, [initLoading])

  return (
    <Container h="120vh">
      <VStack spacing="20px" mt="120px" mb="30px">
        {!showReload && <StandardSpinner />}
        {showReload && (
          <>
            <Heading color="black_2">A new version is found!</Heading>
            <Button
              variant="link"
              fontSize="26px"
              color="purple"
              onClick={reload}
              textDecoration="underline"
            >
              Click here to refresh the app
            </Button>
          </>
        )}
      </VStack>
    </Container>
  )
}
