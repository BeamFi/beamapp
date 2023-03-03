/* eslint-disable react/display-name */
// React
import React, { useState, useEffect } from "react"

// Components
import { FullPageSpinner } from "../FullPageSpinner"

export const clientProxy = Component => props => {
  const [isLoading, setLoading] = useState(true)
  const updateCount = 1

  useEffect(() => {
    async function proxy() {
      setLoading(false)
    }

    proxy()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateCount])

  return isLoading ? <FullPageSpinner /> : <Component {...props} />
}
