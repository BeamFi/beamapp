import React, { useRef } from "react"

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Highlight,
  Text,
  VStack
} from "@chakra-ui/react"
import { BeamGradientActionButton } from "../../common/BeamGradientActionButton"

export const GetPaidAlertDialog = ({ isOpen, onClose, recipient, confirm }) => {
  const cancelRef = useRef()

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      size="2xl"
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Create Beam Link
          </AlertDialogHeader>

          <AlertDialogBody>
            <VStack h="100px">
              <Text>Please confirm your wallet Princial ID is correct: </Text>
              <Text fontSize={{ base: "12px", md: "14px" }}>
                <Highlight
                  query={recipient}
                  styles={{
                    px: "2",
                    py: "1",
                    rounded: "full",
                    bg: "beam_green"
                  }}
                >
                  {recipient}
                </Highlight>
              </Text>
            </VStack>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button
              ref={cancelRef}
              onClick={onClose}
              borderRadius="15px"
              w="160px"
            >
              Cancel
            </Button>
            <BeamGradientActionButton
              title="Confirm"
              textSize="16px"
              textWeight="semibold"
              border="1px solid #000000"
              borderRadius="15px"
              w="180px"
              ml="12px"
              onClick={() => confirm()}
            />
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
