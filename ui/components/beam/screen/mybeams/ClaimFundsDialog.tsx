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
  VStack,
  HStack
} from "@chakra-ui/react"

import { PlugConnectIcon } from "../../../../icon"
import { TokenTypeData } from "../../../../config"
import ExternalLink from "../../../ExternalLink"
import { BeamActionButton } from "../../common/BeamActionButton"
import { EscrowContractClass } from "../../../../model/class/EscrowContractClass"
import { esToHuman, tokenIcon } from "../../../../utils/token"
import Image from "next/image"

type Props = {
  isOpen: boolean
  onClose: any
  submit: any
  numClaimableTokens: number
  escrowObject: EscrowContractClass
}

export const ClaimFundsDialog = ({
  isOpen,
  onClose,
  submit,
  numClaimableTokens,
  escrowObject
}: Props) => {
  const cancelRef = useRef()

  const tokenType = escrowObject.tokenType()

  const confirm = () => {
    onClose()
    submit()
  }

  const transferFee = () => {
    const tokenData = TokenTypeData[tokenType]
    const esToHumanFunc = esToHuman(tokenType)
    return esToHumanFunc(tokenData.fee)
  }

  const TokenIcon = tokenIcon(tokenType)

  return (
    <AlertDialog
      isOpen={isOpen}
      onClose={onClose}
      leastDestructiveRef={cancelRef}
      size="lg"
      closeOnEsc={false}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
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
              <HStack>
                <Text color="black" fontSize="16px">
                  You will need &nbsp;
                </Text>

                <ExternalLink
                  href="https://plugwallet.ooo/"
                  textDecoration="none"
                >
                  <PlugConnectIcon h="40px" mr="10px" />
                  Plug Wallet
                </ExternalLink>
                <Text>{" or "}</Text>
                <ExternalLink href="https://nfid.one" textDecoration="none">
                  <Image
                    src="/nfid-logo-dark.png"
                    width="63"
                    height="30"
                    alt="Connect NFID"
                  />
                </ExternalLink>
              </HStack>
              <Text>to claim funds.</Text>

              <Stat pt="6px" textAlign="center">
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
                    <TokenIcon
                      h="30x"
                      w="41px"
                      color="black_3"
                      px="5px"
                      py="2px"
                    />
                    {escrowObject.tokenTypeName()}
                  </Tag>
                </StatNumber>
                {transferFee() > 0 && (
                  <StatHelpText color="black_gray" fontSize="16px">
                    A standard transfer fee {transferFee()}{" "}
                    {escrowObject.tokenTypeName()} is applied.
                  </StatHelpText>
                )}
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
