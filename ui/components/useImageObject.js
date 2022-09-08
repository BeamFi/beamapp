// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react"

import {
  composeChatImageURL,
  composeJobImageURL,
  composePortfolioImageURL,
  composeSubmissionImageURL,
  composeUserProfileImageURL
} from "../service/image-service"

import { makePortfolioActor } from "../service/actor/actor-locator"

// Global state
import { useStore } from "mobx-store-provider"
import AppStoreModel from "../model/AppStoreModel"

import log from "../utils/log"

export const useUserProfileImageObject = imageId => {
  const [imgSrc, setImgSrc] = useState("")
  const [imgId, setImgId] = useState("")

  const appStore = useStore(AppStoreModel)
  const appContext = appStore.appContext

  useEffect(() => {
    async function loadImage() {
      if (imageId != null && imageId != "") {
        if (imageId == imgId) {
          // clear current image
          setImgSrc(null)
          return
        }

        // clear current image first before loading
        setImgSrc(null)

        const imageSource = await composeUserProfileImageURL(
          imageId,
          appContext
        )

        setImgSrc(imageSource)
        setImgId(imageId)
      } else {
        setImgSrc(null)
      }
    }

    loadImage()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageId])

  return imgSrc
}

export const usePortfolioImageObject = imageId => {
  const [imgSrc, setImgSrc] = useState(null)
  const [imgId, setImgId] = useState("")

  const appStore = useStore(AppStoreModel)
  const appContext = appStore.appContext

  useEffect(() => {
    async function loadImage() {
      if (imageId != null && imageId != "") {
        if (imageId == imgId) {
          // clear current image
          setImgSrc(null)
          return
        }

        // clear current image first before loading
        setImgSrc(null)

        const imageSource = await composePortfolioImageURL(imageId, appContext)

        setImgSrc(imageSource)
        setImgId(imageId)
      } else {
        setImgSrc(null)
      }
    }

    loadImage()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageId])

  return imgSrc
}

export const useSubmissionImageObject = imageId => {
  const [imgSrc, setImgSrc] = useState(null)
  const [imgId, setImgId] = useState("")

  const appStore = useStore(AppStoreModel)
  const appContext = appStore.appContext

  useEffect(() => {
    async function loadImage() {
      if (imageId != null && imageId != "") {
        if (imageId == imgId) {
          // clear current image
          setImgSrc(null)
          return
        }

        // clear current image first before loading
        setImgSrc(null)

        const imageSource = await composeSubmissionImageURL(imageId, appContext)

        setImgSrc(imageSource)
        setImgId(imageId)
      } else {
        setImgSrc(null)
      }
    }

    loadImage()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageId])

  return imgSrc
}

export const usePortfolioImageObjectByPorfolioId = portfolioId => {
  const [pfId, setPfId] = useState(null)
  const [imgId, setImgId] = useState(null)
  const imgSrc = usePortfolioImageObject(imgId)

  useEffect(() => {
    async function loadPortfolio() {
      if (portfolioId != null) {
        if (pfId == portfolioId) {
          return
        }

        try {
          const portfolioService = await makePortfolioActor()
          const result = await portfolioService.loadPortfolio(portfolioId)

          if (result.length > 0) {
            const portfolio = result[0]
            setImgId(portfolio.thumbImageId)
            setPfId(portfolioId)
          }
        } catch (error) {
          log.error(error)
        }
      }
    }

    loadPortfolio()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [portfolioId])

  return imgSrc
}

export const useJobImageObject = imageId => {
  const [imgSrc, setImgSrc] = useState(null)
  const [imgId, setImgId] = useState("")

  const appStore = useStore(AppStoreModel)
  const appContext = appStore.appContext

  useEffect(() => {
    async function loadImage() {
      if (imageId != null && imageId != "") {
        if (imageId == imgId) {
          // clear current image
          setImgSrc(null)
          return
        }

        // clear current image first before loading
        setImgSrc(null)

        const imageSource = await composeJobImageURL(imageId, appContext)

        setImgSrc(imageSource)
        setImgId(imageId)
      } else {
        setImgSrc(null)
      }
    }

    loadImage()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageId])

  return imgSrc
}

export const useChatImageObject = imageId => {
  const [imgSrc, setImgSrc] = useState(null)
  const [imgId, setImgId] = useState("")

  const appStore = useStore(AppStoreModel)
  const appContext = appStore.appContext

  useEffect(() => {
    const loadImage = async () => {
      if (imageId != null && imageId != "") {
        if (imageId == imgId) {
          // clear current image
          setImgSrc(null)
          return
        }

        // clear current image first before loading
        setImgSrc(null)

        const imageSource = await composeChatImageURL(imageId, appContext)

        setImgSrc(imageSource)
        setImgId(imageId)
      } else {
        setImgSrc(null)
      }
    }

    loadImage()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageId])

  return imgSrc
}
