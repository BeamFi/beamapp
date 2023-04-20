import React from "react"

import Image from "next/image"

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
  useDisclosure,
  useToast
} from "@chakra-ui/react"

import { ExternalLinkIcon } from "@chakra-ui/icons"
import { AuthProvider } from "../../../config"
import { BlackOutlineButton } from "../../button/BlackOutlineButton"
import { PlugConnectIcon } from "../../../icon"
import { PlugConfig } from "../../../config/beamconfig"
import { makeLogout } from "../../../service/actor/actor-locator"
import { showToast } from "../../../utils/toast"
import { createIILogin } from "../../auth/provider/internet-identity"
import { createPlugLogin } from "../../auth/provider/plug"

const { Plug, InternetIdentity } = AuthProvider

export const BeamSelectWalletModal = ({
  isOpen,
  onClose,
  handleAuthUpdate,
  defaultAuthProviders = [Plug, InternetIdentity]
}) => {
  const {
    isOpen: isPlugModalOpen,
    onOpen: onPlugModalOpen,
    onClose: onPlugModalClose
  } = useDisclosure()

  const toast = useToast()

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

  const showPlugLoginMesg = () => {
    showToast(
      toast,
      "Login with Plug",
      "Please make sure your have unlocked your Plug Wallet.",
      "info"
    )
  }

  const selectAuth = async authProvider => {
    onClose()

    switch (authProvider) {
      case Plug: {
        const authLogin = createPlugLogin(
          handleAuthUpdate,
          authProvider,
          PlugConfig.whitelist,
          showPlugLoginMesg
        )

        // Logout the other provider
        const logoutFunc = makeLogout(InternetIdentity)
        await logoutFunc()

        await authLogin()
        break
      }
      case InternetIdentity: {
        const authLogin = createIILogin(handleAuthUpdate, authProvider)

        // Logout the other provider
        await makeLogout(Plug)

        await authLogin()
        break
      }
    }
  }

  const authProviderButtons = {}
  authProviderButtons[InternetIdentity] = (
    <BlackOutlineButton onClick={() => onClickSelectAuth(InternetIdentity)}>
      <Image
        src="/nfid-logo-dark.png"
        width="85"
        height="40"
        alt="Connect NFID"
      />
    </BlackOutlineButton>
  )
  authProviderButtons[Plug] = (
    <BlackOutlineButton onClick={() => onClickSelectAuth(Plug)}>
      <PlugConnectIcon h="40px" mr="18px" />
      Plug Wallet
    </BlackOutlineButton>
  )

  return (
    <>
      <Modal onClose={onClose} size="lg" isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Choose</ModalHeader>
          <ModalCloseButton />
          <ModalBody py="18px">
            <VStack>
              {defaultAuthProviders.map(
                authProvider => authProviderButtons[authProvider]
              )}
              <Text align="center" fontWeight="medium" pt="12px">
                Don&apos;t have NFID or Plug Wallet?
              </Text>

              <Link
                isExternal
                href="https://nfid.one"
                color="blue_2"
                fontSize="16px"
                fontWeight="light"
              >
                Learn more about NFID
                <ExternalLinkIcon ml="6px" mb="2px" />
              </Link>
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
