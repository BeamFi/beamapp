import React from "react"

import {
  FacebookShareButton,
  FacebookIcon,
  EmailShareButton,
  EmailIcon,
  LineShareButton,
  LineIcon,
  RedditShareButton,
  RedditIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
  WeiboShareButton,
  WeiboIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon
} from "next-share"

import { FaRegCopy } from "react-icons/fa"

import {
  Button,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  useClipboard,
  Wrap,
  WrapItem
} from "@chakra-ui/react"

export const ShareURLModal = ({
  headingTitle,
  url,
  title,
  body = "",
  isOpen,
  onClose
}) => {
  const { hasCopied, onCopy } = useClipboard(url)

  const SocialButtonSize = 56

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bgColor="black_3">
        <ModalHeader color="white">
          <Heading size="md">{headingTitle}</Heading>
        </ModalHeader>
        <ModalCloseButton color="white" />
        <ModalBody color="white">
          <HStack align="center">
            <Text fontSize="12px" noOfLines={1}>
              {url}
            </Text>
            <Spacer />
            <Button
              onClick={onCopy}
              leftIcon={<FaRegCopy />}
              variant="outline"
              colorScheme="green_scheme"
              size="sm"
              minW="90px"
            >
              {hasCopied ? "Copied" : "Copy"}
            </Button>
          </HStack>

          <Wrap py="16px" spacing="12px">
            <WrapItem>
              <EmailShareButton url={url} subject={title} body={body}>
                <EmailIcon size={SocialButtonSize} round />
              </EmailShareButton>
            </WrapItem>
            <WrapItem>
              <TwitterShareButton url={url} title={title}>
                <TwitterIcon size={SocialButtonSize} round />
              </TwitterShareButton>
            </WrapItem>
            <WrapItem>
              <TelegramShareButton url={url} title={title}>
                <TelegramIcon size={SocialButtonSize} round />
              </TelegramShareButton>
            </WrapItem>
            <WrapItem>
              <WhatsappShareButton url={url} title={title} separator=":: ">
                <WhatsappIcon size={SocialButtonSize} round />
              </WhatsappShareButton>
            </WrapItem>
            <WrapItem>
              <WeiboShareButton url={url} title={title}>
                <WeiboIcon size={SocialButtonSize} round />
              </WeiboShareButton>
            </WrapItem>
            <WrapItem>
              <FacebookMessengerShareButton url={url}>
                <FacebookMessengerIcon size={SocialButtonSize} round />
              </FacebookMessengerShareButton>
            </WrapItem>
            <WrapItem>
              <FacebookShareButton
                url={url}
                quote={title}
                hashtag={"#contentflyapp"}
              >
                <FacebookIcon size={SocialButtonSize} round />
              </FacebookShareButton>
            </WrapItem>
            <WrapItem>
              <LineShareButton
                url={url}
                title={title}
                summary={body}
                source="Content Fly App"
              >
                <LineIcon size={SocialButtonSize} round />
              </LineShareButton>
            </WrapItem>
            <WrapItem>
              <RedditShareButton url={url} title={title}>
                <RedditIcon size={SocialButtonSize} round />
              </RedditShareButton>
            </WrapItem>
            <WrapItem>
              <LinkedinShareButton url={url}>
                <LinkedinIcon size={SocialButtonSize} round />
              </LinkedinShareButton>
            </WrapItem>
          </Wrap>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
