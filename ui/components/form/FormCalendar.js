/* eslint-disable react/no-children-prop */
import React from "react"
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Input,
  InputGroup,
  InputRightElement,
  useDisclosure
} from "@chakra-ui/react"

// Calendar
import { DayPicker, useInput } from "react-day-picker"
import "react-day-picker/dist/style.css"

import { format, isDate } from "date-fns"
import { CalendarIcon } from "../../icon/index"

export default function FormCalendar(props) {
  const {
    id,
    field,
    title,
    errorMesg,
    isRequired,
    isInvalid,
    setFieldValue,
    dateValue,
    ...rest
  } = props

  const calendarOptions = {
    defaultSelected: dateValue,
    fromYear: dateValue.getFullYear(),
    toYear: dateValue.getFullYear() + 1,
    format: "PP",
    required: isRequired
  }
  const { inputProps, dayPickerProps } = useInput(calendarOptions)

  const { onOpen, onClose, isOpen } = useDisclosure()

  const setSelectedDay = newDate => {
    onClose()

    if (newDate != null) {
      setFieldValue(id, newDate)
    }
  }

  const placeholder = isDate(field.value)
    ? format(field.value, calendarOptions.format)
    : ""

  return (
    <FormControl isRequired={isRequired} isInvalid={isInvalid} {...rest}>
      <FormLabel
        htmlFor={id}
        fontSize="13px"
        fontWeight="medium"
        color="black_2"
      >
        {title}
      </FormLabel>
      <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
        <PopoverTrigger>
          <InputGroup>
            <Input
              {...inputProps}
              placeholder={placeholder}
              _hover={{
                cursor: "pointer"
              }}
            />
            <InputRightElement
              children={
                <CalendarIcon
                  color="purple"
                  _hover={{
                    cursor: "pointer"
                  }}
                />
              }
            />
          </InputGroup>
        </PopoverTrigger>
        <PopoverContent>
          <DayPicker
            {...dayPickerProps}
            mode="single"
            styles={{
              caption_label: { fontSize: "17px", color: "#a469d5" },
              root: {
                "--rdp-cell-size": "2rem",
                "--rdp-accent-color": "#c28de9",
                "--rdp-background-color": "#c28de9",
                "--rdp-outline": "2px solid #a469d5"
              }
            }}
            onSelect={setSelectedDay}
          />
        </PopoverContent>
      </Popover>
      <FormErrorMessage>{errorMesg}</FormErrorMessage>
    </FormControl>
  )
}
