/* eslint-disable react/display-name */
// React
import React, { useState, useEffect } from "react"

// Auth
import { checkUserAuth } from "./checkUserAuth"

// Components
import { FullPageSpinner } from "../FullPageSpinner"

import log from "../../utils/log"

export const userProtectWithPublic = Component => props => {
  return authProtect(Component)(props)
}

const authProtect = Component => props => {
  const [identity, setIdentity] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const updateCount = 1

  useEffect(() => {
    async function checkAuth() {
      // Check if user has authenticated
      setLoading(true)

      try {
        const identity = await checkUserAuth()

        if (identity != null) {
          updateIdentity(identity)
        }
      } catch (error) {
        log.error(error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateCount])

  const updateIdentity = async identity => {
    setIdentity(identity)
  }

  return identity != null ? (
    <Component identity={identity} {...props} />
  ) : isLoading ? (
    <FullPageSpinner />
  ) : (
    <Component {...props} />
  )
}
