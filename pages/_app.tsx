import React, { useEffect } from "react"

import type { AppProps } from "next/app"

import { useRouter } from "next/router"
import Head from "next/head"

// Progress bar
import NProgress from "nprogress"

// Fonts
import "@fontsource/poppins/300.css"
import "@fontsource/poppins/400.css"
import "@fontsource/poppins/500.css"
import "@fontsource/poppins/600.css"
import "@fontsource/poppins/700.css"

import "nprogress/nprogress.css"

// Chakra
import { ChakraProvider } from "@chakra-ui/react"

// Theme
import theme from "../ui/styles/theme"

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  const initLoading = 1

  useEffect(() => {
    async function loadSplitbee() {
      const splitbee = (await import("@splitbee/web")).default
      splitbee.init({})
    }

    loadSplitbee()

    router.events.on("routeChangeStart", () => NProgress.start())
    router.events.on("routeChangeComplete", () => NProgress.done())
    router.events.on("routeChangeError", () => NProgress.done())

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initLoading])

  return (
    <>
      <Head>
        <meta
          key="viewport"
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </Head>

      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  )
}
