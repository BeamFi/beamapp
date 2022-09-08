import React from "react"

// Icon
import { WalletIcon } from "../../icon/index"
import { BeamActionButton } from "./common/BeamActionButton"
import { useNavigate } from "react-router-dom"

export const BeamLoginButton = ({}) => {
  const navigate = useNavigate()

  const gotToMyBeams = async () => {
    const isConnected = await window.ic?.plug?.isConnected()
    if (isConnected) {
      navigate("/mybeams")
    } else {
      navigate("/connect")
    }
  }

  return (
    <>
      <BeamActionButton
        leftIcon={<WalletIcon w="20px" h="20px" />}
        w={{ base: "120px", md: "152px" }}
        h={{ base: "38px", md: "52px" }}
        mr="38px"
        mt="9px"
        onClick={gotToMyBeams}
      >
        My Beams
      </BeamActionButton>
    </>
  )
}
