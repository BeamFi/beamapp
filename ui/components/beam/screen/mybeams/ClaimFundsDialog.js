import React, { useRef } from "react"

import {
  Text,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  Stat,
  StatLabel,
  StatNumber,
  Tag,
  StatHelpText,
  VStack
} from "@chakra-ui/react"

import { ICLogo, PlugConnectIcon } from "../../../../icon"
import { EscrowPaymentConfig } from "../../../../config"
import { e8sToHuman } from "../../../../utils/e8s"
import ExternalLink from "../../../ExternalLink"
import { BeamActionButton } from "../../common/BeamActionButton"

export const ClaimFundsDialog = ({
  isOpen,
  onClose,
  submit,
  numClaimableTokens
}) => {
  const cancelRef = useRef()

  const transferFee = e8sToHuman(EscrowPaymentConfig.ICP.fee)

  const confirm = () => {
    onClose()
    submit()
  }

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      size="lg"
      closeOnEsc={false}
    >
      <AlertDialogOverlay>
        <AlertDialogContent align="center">
          <AlertDialogHeader
            fontSize="lg"
            fontWeight="semibold"
            color="black_2"
            pt="40px"
            pb="10px"
          >
            Claiming Funds
          </AlertDialogHeader>

          <AlertDialogBody>
            <VStack spacing="18px">
              <Text color="black" fontSize="16px">
                You will need &nbsp;
                <ExternalLink
                  href="https://plugwallet.ooo/"
                  textDecoration="none"
                >
                  <PlugConnectIcon h="40px" mr="10px" />
                  Plug Wallet
                </ExternalLink>{" "}
                to claim funds.
              </Text>

              <Stat align="center" pt="6px">
                <StatLabel
                  py="6px"
                  color="black_2"
                  fontSize="18px"
                  fontWeight="medium"
                >
                  Available to Claim
                </StatLabel>
                <StatNumber
                  py="6px"
                  pos="relative"
                  left="20px"
                  fontWeight="semibold"
                  fontSize="24px"
                  color="black_3"
                >
                  {numClaimableTokens}
                  <Tag
                    size="lg"
                    bg="white"
                    borderColor="black_3"
                    borderWidth="1px"
                    borderRadius="full"
                    mx="12px"
                  >
                    <ICLogo h="30x" w="41px" color="black_3" /> ICP
                  </Tag>
                </StatNumber>
                <StatHelpText color="black_gray" fontSize="16px">
                  A standard IC transfer fee {transferFee} ICP is applied.
                </StatHelpText>
              </Stat>
            </VStack>
          </AlertDialogBody>

          <AlertDialogFooter mt="18px">
            <Button
              ref={cancelRef}
              onClick={onClose}
              w="50%"
              h="56px"
              borderRadius="30px"
            >
              Cancel
            </Button>
            <BeamActionButton
              onClick={confirm}
              ml={3}
              w="50%"
              h="56px"
              border="0.951219px solid #393440"
              borderColor="dark_black"
              bgColor="beam_green"
              fontWeight="semibold"
              fontSize="20px"
            >
              Claim
            </BeamActionButton>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
