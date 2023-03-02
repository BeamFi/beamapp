export const showToast = (toast, title, description, status) => {
  toast({
    title: title,
    description: description,
    status: status,
    duration: 9000,
    isClosable: true
  })
}

export const showTopToast = (toast, title, description, status) => {
  toast({
    title: title,
    description: description,
    status: status,
    duration: 9000,
    isClosable: true,
    position: "top"
  })
}

export const showMediumToast = (toast, title, description, status) => {
  toast({
    title: title,
    description: description,
    status: status,
    duration: 20000,
    isClosable: true
  })
}

export const showLongToast = (toast, title, description, status) => {
  toast({
    title: title,
    description: description,
    status: status,
    duration: 40000,
    isClosable: true
  })
}

export const showStandardErrorMesg = toast => {
  showToast(
    toast,
    "🤖 We have a problem.",
    "Something is not working. 😭 Please try again later or contact us support@beamfi.app for help. 👨‍💻",
    "error"
  )
}
