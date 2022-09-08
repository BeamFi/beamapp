import React from "react"
import Router from "next/router"

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
import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react"

// Theme
import theme from "../ui/styles/theme"

export default function MyApp({ Component, pageProps }) {
  Router.onRouteChangeStart = () => NProgress.start()

  Router.onRouteChangeComplete = () => NProgress.done()

  Router.onRouteChangeError = () => NProgress.done()

  return (
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider>
        <Component {...pageProps} />
      </ColorModeProvider>
    </ChakraProvider>
  )
}
