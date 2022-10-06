import React from "react"

// Icon
import { WalletIcon } from "../../icon/index"
import { BeamActionButton } from "./common/BeamActionButton"
import { useNavigate } from "react-router-dom"
import { hasSession } from "../auth/provider/plug"

export const BeamLoginButton = ({}) => {
  const navigate = useNavigate()

  const gotToMyBeams = async () => {
    const sessionExisted = await hasSession()
    if (sessionExisted) {
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
