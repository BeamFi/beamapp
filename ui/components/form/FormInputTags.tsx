/* eslint-disable react/no-children-prop */
import React from "react"

import {
  Flex,
  Stack,
  Tag,
  TagLabel,
  TagCloseButton,
  FormErrorMessage,
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  InputLeftAddon,
  InputRightElement
} from "@chakra-ui/react"

export default function FormInputTags(props) {
  const {
    id,
    type,
    title,
    field,
    selectedTags,
    placeholder,
    leftChar,
    remove,
    rightIcon,
    errorMesg,
    isRequired,
    isInvalid,
    ...rest
  } = props

  return (
    <FormControl
      isRequired={isRequired}
      isInvalid={isInvalid}
      w="340px"
      {...rest}
    >
      <FormLabel
        htmlFor={id}
        fontSize="13px"
        fontWeight="medium"
        color="black_2"
      >
        {title}
      </FormLabel>
      <Stack
        direction="column"
        borderRadius="6px"
        borderColor="gray_light4"
        borderWidth="1px"
        spacing="19px"
        px="19px"
        py="8px"
      >
        <InputGroup>
          {leftChar && (
            <InputLeftAddon
              children="#"
              fontSize="12px"
              height="20px"
              mt="6px"
              px="5px"
              mr="4px"
            />
          )}
          <Input
            id={id}
            placeholder={placeholder}
            variant="flushed"
            {...field}
            focusBorderColor="purple"
            type={type}
            size="sm"
          />
          {rightIcon && <InputRightElement children={rightIcon} />}
        </InputGroup>
        {props.children}
        <Flex wrap="wrap" width="100%">
          {selectedTags.map((key, index) => (
            <Tag
              size="sm"
              px="10px"
              h="25px"
              key={key}
              borderRadius="29px"
              variant="solid"
              background="gradient.purple.4"
              my="4px"
              mr="6px"
            >
              <TagLabel>{leftChar + key}</TagLabel>
              <TagCloseButton onClick={() => remove(index)} />
            </Tag>
          ))}
        </Flex>
      </Stack>
      <FormErrorMessage>{errorMesg}</FormErrorMessage>
    </FormControl>
  )
}
