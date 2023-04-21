import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  useDisclosure,
  useToast
} from "@chakra-ui/react"
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AuthProviderContext } from "../../context/AuthProviderContext"
import { PlugConnectIcon, WalletIcon } from "../../icon"
import { showToast } from "../../utils/toast"
import { BeamSelectWalletModal } from "./auth/BeamSelectWalletModal"

import { AuthProvider } from "../../config"
import Image from "next/image"
import { checkUserAuthProviderNullable } from "../auth/checkUserAuth"

export const MyWalletMenu = ({ setAuthProvider }) => {
  const navigate = useNavigate()
  const authProvider = useContext(AuthProviderContext)

  const { Plug, InternetIdentity } = AuthProvider
  const initUpdate = 1

  useEffect(() => {
    const loadInitAuthProvider = async () => {
      const authProvider = await checkUserAuthProviderNullable()
      setAuthProvider(authProvider)
    }

    loadInitAuthProvider()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initUpdate])

  const gotToMyBeams = async () => {
    if (authProvider != null) {
      navigate("/mybeams")
    } else {
      navigate("/connect")
    }
  }

  const {
    isOpen: isSelectAuthOpen,
    onOpen: onSelectAuthOpen,
    onClose: onSelectAuthClose
  } = useDisclosure()

  const toast = useToast()

  const handleAuthUpdate = (identity, authProvider) => {
    if (identity == null) {
      showToast(
        toast,
        "Connect Wallet",
        "We have a problem connecting your Wallet. Please try again later.",
        "error"
      )
      return
    }

    showToast(
      toast,
      "Connect Wallet",
      "Your Wallet is connected successfully.",
      "success"
    )

    setAuthProvider(authProvider)
  }

  let MenuWalletIcon = <WalletIcon w="20px" h="20px" />
  switch (authProvider) {
    case Plug: {
      MenuWalletIcon = <PlugConnectIcon h="40px" />
      break
    }
    case InternetIdentity: {
      MenuWalletIcon = (
        <Image
          src="/nfid-logo-dark.png"
          width="42"
          height="20"
          alt="Connect NFID"
        />
      )
    }
  }

  return (
    <Menu>
      <MenuButton
        as={Button}
        w={{ base: "120px", md: "162px" }}
        h={{ base: "38px", md: "52px" }}
        mr="22px"
        mt="9px"
        variant="solid"
        color="black_5"
        fontWeight="medium"
        fontSize={{ base: "14px", md: "16px" }}
        boxShadow="-3px 5px 2px rgba(0, 0, 0, 0.75)"
        borderRadius="30px"
        bg="white"
        _hover={{
          boxShadow: "xl"
        }}
        loadingText="Submitting"
        leftIcon={MenuWalletIcon}
      >
        My Wallet
      </MenuButton>
      <MenuList>
        <MenuItem minH="50px" onClick={gotToMyBeams}>
          My Beams
        </MenuItem>
        <MenuItem minH="50px" onClick={onSelectAuthOpen}>
          Switch Wallet
        </MenuItem>
      </MenuList>
      <BeamSelectWalletModal
        isOpen={isSelectAuthOpen}
        onClose={onSelectAuthClose}
        handleAuthUpdate={handleAuthUpdate}
      />
    </Menu>
  )
}
