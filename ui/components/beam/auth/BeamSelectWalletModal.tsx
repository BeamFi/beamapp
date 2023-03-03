import React from "react"

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Link,
  Text,
  VStack,
  useDisclosure
} from "@chakra-ui/react"

import { ExternalLinkIcon } from "@chakra-ui/icons"
import { AuthProvider } from "../../../config"
import { BlackOutlineButton } from "../../button/BlackOutlineButton"
import { PlugConnectIcon } from "../../../icon"

export const BeamSelectWalletModal = ({ isOpen, onClose, selectAuth }) => {
  const {
    isOpen: isPlugModalOpen,
    onOpen: onPlugModalOpen,
    onClose: onPlugModalClose
  } = useDisclosure()

  const { Plug } = AuthProvider

  const onClickSelectAuth = authProvider => {
    switch (authProvider) {
      case Plug: {
        // check if Plug Extension is installed
        if (!window.ic?.plug) {
          onPlugModalOpen()
          return
        }
      }
      default:
        break
    }

    selectAuth(authProvider)
  }

  const closeAll = () => {
    onPlugModalClose()
    onClose()
  }

  return (
    <>
      <Modal onClose={onClose} size="lg" isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Choose</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <BlackOutlineButton onClick={() => onClickSelectAuth(Plug)}>
              <PlugConnectIcon h="40px" mr="18px" />
              Plug Wallet
            </BlackOutlineButton>

            <VStack py="12px">
              <Text align="center" fontWeight="medium">
                Don&apos;t have Plug Wallet?
              </Text>
              <Link
                isExternal
                href="https://plugwallet.ooo"
                color="blue_2"
                fontSize="16px"
                fontWeight="light"
              >
                Learn more about Plug Wallet
                <ExternalLinkIcon ml="6px" mb="2px" />
              </Link>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal onClose={onPlugModalClose} size="lg" isOpen={isPlugModalOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Plug Wallet is not found</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Link
              isExternal
              href="https://plugwallet.ooo"
              color="blue_2"
              fontSize="16px"
              fontWeight="light"
            >
              Learn more about installing Plug Wallet
              <ExternalLinkIcon ml="6px" mb="2px" />
            </Link>
          </ModalBody>
          <ModalFooter>
            <Button onClick={closeAll} color="black_2" mx="12px">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
