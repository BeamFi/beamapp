// eslint-disable-next-line no-unused-vars
import React, { useState } from "react"

import useSWR from "swr"

import { SWRKey } from "../../config"

import { makeEscrowPaymentActor } from "../../service/actor/actor-locator"
import log from "../../utils/log"

export const useEscrow = (escrowId, refreshSecs = 5) => {
  const [isFetching, setFetching] = useState(false)

  const fetcher = async ([key, escrowId]) => {
    if (key == null || escrowId == null) {
      return null
    }

    try {
      setFetching(true)

      const escrowService = await makeEscrowPaymentActor()
      const result = await escrowService.queryMyBeamEscrow(escrowId)

      if (result.ok) {
        const escrowContract = result.ok
        return escrowContract
      }

      throw new Error(log.flattenCandidError(result.err))
    } catch (error) {
      log.error(error)
    } finally {
      setFetching(false)
    }

    return null
  }

  const swrOptions = {
    refreshInterval: refreshSecs * 1000,
    errorRetryCount: 3
  }

  const { data, error, mutate } = useSWR(
    [SWRKey.Escrow, escrowId],
    fetcher,
    swrOptions
  )

  return {
    escrowContract: data,
    isLoading: isFetching,
    mutate,
    error
  }
}
