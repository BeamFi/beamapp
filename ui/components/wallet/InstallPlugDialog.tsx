import React from "react"

import {
  Text,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button
} from "@chakra-ui/react"

export const InstallPlugDialog = ({ isOpen, onClose }) => {
  const gotoPlugWebsite = () => {
    onClose()
    window.open("https://plugwallet.ooo/", "_blank")
  }

  const reloadPage = () => {
    onClose()

    setTimeout(() => {
      window.location.reload()
    }, 500)
  }

  return (
    <AlertDialog
      isOpen={isOpen}
      onClose={onClose}
      leastDestructiveRef={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Connect Plug
          </AlertDialogHeader>

          <AlertDialogBody>
            <Text>
              Please install Plug Wallet Chrome Extension first. If you have
              installed it, please reload this page so that we can detect it.
            </Text>
            <Text py="8px">Notes: Chrome Web Browser is needed</Text>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button onClick={reloadPage} ml={3}>
              Reload Page
            </Button>
            <Button onClick={gotoPlugWebsite}>Install Plug</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
