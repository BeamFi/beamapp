import React, { useEffect } from "react"

import Router from "next/router"
import Head from "next/head"

// Progress bar
import NProgress from "nprogress"

// Fonts
import { Poppins } from "next/font/google"

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"]
})

import "nprogress/nprogress.css"

// Chakra
import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react"

// Theme
import theme from "../ui/styles/theme"

export default function MyApp({ Component, pageProps }) {
  Router.onRouteChangeStart = () => NProgress.start()

  Router.onRouteChangeComplete = () => NProgress.done()

  Router.onRouteChangeError = () => NProgress.done()

  const initLoading = 1

  useEffect(() => {
    async function loadSplitbee() {
      const splitbee = (await import("@splitbee/web")).default
      splitbee.init({})
    }

    loadSplitbee()
  }, [initLoading])

  return (
    <>
      <style jsx global>
        {`
          html {
            font-family: ${poppins.style.fontFamily};
          }
        `}
      </style>
      <Head>
        <meta
          key="viewport"
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </Head>

      <ChakraProvider resetCSS theme={theme}>
        <ColorModeProvider>
          <Component {...pageProps} />
        </ColorModeProvider>
      </ChakraProvider>
    </>
  )
}
