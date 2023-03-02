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
  FormLabel
} from "@chakra-ui/react"

import SelectMenu from "./SelectMenu"

export default function FormSelectTags(props) {
  const {
    id,
    field,
    title,
    placeholder,
    selectVariant,
    selectedTags,
    rightIcon,
    errorMesg,
    onChange,
    isRequired,
    isInvalid,
    remove,
    value,
    ...rest
  } = props

  const finalSelectVariant = selectVariant || "flushed"

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
        <SelectMenu
          id={id}
          {...field}
          placeholder={placeholder}
          icon={rightIcon}
          variant={finalSelectVariant}
          size="sm"
          onChange={onChange}
          value={value}
        >
          {props.children}
        </SelectMenu>
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
              <TagLabel>{key}</TagLabel>
              <TagCloseButton onClick={() => remove(index)} />
            </Tag>
          ))}
        </Flex>
      </Stack>
      <FormErrorMessage>{errorMesg}</FormErrorMessage>
    </FormControl>
  )
}
