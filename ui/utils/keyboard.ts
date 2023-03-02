const EnterKeyCode = 13
const SpaceKeyCode = 32

export const isEnterKey = event => {
  return isKeyCode(EnterKeyCode)(event)
}

export const isSpaceKey = event => {
  return isKeyCode(SpaceKeyCode)(event)
}

const isKeyCode = keyCode => event => {
  return event.charCode === keyCode || event.keyCode === keyCode
}
